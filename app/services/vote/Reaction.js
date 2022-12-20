const CommonValidator = require('../../../lib/validators/Common'),
  ServiceBase = require('../../../app/services/Base'),
  VoteModel = require('../../../app/models/mysql/main/Vote'),
  responseHelper = require('../../../lib/formatter/response'),
  voteConstants = require('../../../lib/globalConstant/entity/vote');

/**
 * Class to add reaction to a post.
 *
 * @class Reaction
 */
class Reaction extends ServiceBase {
  /**
   * Constructor of Reaction.
   *
   * @param {object} params
   * @param {string} params.reaction
   * @param {string} params.current_user_id
   * @param {string} param.lens_post_id
   *
   * @constructor
   */
  constructor(params) {
    super(params);
    const oThis = this;

    oThis.currentUserId = params.current_user_id;
    oThis.reaction = params.reaction;
    oThis.lensPostId = params.lens_post_id;
  }

  /**
   * Async perform.
   *
   * @returns {Promise<*>}
   * @private
   */
  async _asyncPerform() {
    const oThis = this;

    await oThis._validateParams();

    await oThis._addVote();

    return oThis._prepareResponse();
  }

  /**
   * Validate params.
   *
   * @private
   */
  async _validateParams() {
    const oThis = this;
    const allowedReactionValuesMap = voteConstants.invertedStatuses;
    if (CommonValidator.isVarNullOrUndefined(allowedReactionValuesMap[oThis.reaction])) {
      return Promise.reject(
        responseHelper.paramValidationError({
          internal_error_identifier: 'a_s_v_r_vp_1',
          api_error_identifier: 'invalid_api_params',
          params_error_identifiers: ['invalid_reaction_type'],
          debug_options: { reaction: oThis.reaction }
        })
      );
    }
  }

  /**
   * Add reaction to votes table.
   *
   * @private
   */
  async _addVote() {
    const oThis = this;

    const insertData = {
      lensPostId: oThis.lensPostId,
      status: oThis.reaction,
      voterUserId: oThis.currentUserId
    };
    try {
      await new VoteModel().insertVote(insertData);
    } catch (error) {
      console.error('Error occured while recording reaction -- ', error);

      return Promise.reject(
        responseHelper.error({
          internal_error_identifier: 'a_s_v_r_av_1',
          api_error_identifier: 'already_reacted_to_post',
          debug_options: { insertData: insertData, error: error }
        })
      );
    }
  }

  /**
   * Prepare response
   *
   * @private
   */
  _prepareResponse() {
    return responseHelper.successWithData({});
  }
}
module.exports = Reaction;
