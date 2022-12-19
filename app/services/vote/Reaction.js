const LensPostModal = require('../../../app/models/mysql/entity/LensPost'),
  ServiceBase = require('../../../app/services/Base'),
  VoteModel = require('../../../app/models/mysql/entity/Vote'),
  responseHelper = require('../../../lib/formatter/response');

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
   * @param {string} param.lens_publication_id
   *
   * @constructor
   */
  constructor(params) {
    super(params);
    const oThis = this;

    oThis.currentUserId = params.current_user_id;
    oThis.reaction = params.reaction;
    oThis.lensPublicationId = params.lens_publication_id;
  }

  /**
   * Async perform.
   *
   * @returns {Promise<*>}
   * @private
   */
  async _asyncPerform() {
    const oThis = this;

    await oThis._fetchLensPost();

    await oThis._addVote();

    return oThis._prepareResponse();
  }

  /**
   * Fetch lens post.
   *
   * @private
   */
  async _fetchLensPost() {
    const oThis = this;
    if (!oThis.lensPublicationId) {
      return responseHelper.error({
        internal_error_identifier: 'a_s_v_r_flp_1',
        api_error_identifier: 'something_went_wrong',
        debug_options: {}
      });
    }
    const lensPost = await new LensPostModal().fetchLensPostByLensPublicationId(oThis.lensPublicationId);

    oThis.lensPostId = lensPost.id;
  }

  /**
   * Add reaction to votes table.
   *
   * @private
   */
  async _addVote() {
    const oThis = this;
    if (!oThis.lensPostId) {
      return responseHelper.error({
        internal_error_identifier: 'a_s_v_r_av_1',
        api_error_identifier: 'something_went_wrong',
        debug_options: { lensPublicationId: oThis.lensPublicationId }
      });
    }
    const insertData = {
      lensPostId: oThis.lensPostId,
      status: oThis.reaction,
      voterUserId: oThis.currentUserId
    };

    return new VoteModel().insertVote(insertData);
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
