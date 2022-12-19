const rootPrefix = '../../../..',
  BaseFormatter = require(rootPrefix + '/lib/formatter/Base'),
  responseHelper = require(rootPrefix + '/lib/formatter/response');

/**
 * Class for lens post formatter.
 *
 * @class LensPostSingleFormatter
 */
class LensPostSingleFormatter extends BaseFormatter {
  /**
   * Constructor for lens post formatter.
   *
   * @param {object} params
   * @param {object} params.lensPost
   * @param {number} params.lensPost.id
   * @param {number} params.lensPost.themeId
   * @param {number} params.lensPost.ownerUserId
   * @param {string} params.lensPost.lensPublicationId
   * @param {string} params.lensPost.title
   * @param {number} params.lensPost.descriptionTextId
   * @param {number} params.lensPost.imageId
   * @param {number} params.lensPost.ipfsObjectId
   * @param {number} params.lensPost.totalVotes
   * @param {number} params.lensPost.updatedAt
   *
   * @augments BaseFormatter
   *
   * @constructor
   */
  constructor(params) {
    super();

    const oThis = this;

    oThis.lensPost = params.lensPost;
  }

  /**
   * Format the input object.
   *
   * @returns {object}
   * @private
   */
  _format() {
    const oThis = this;

    return responseHelper.successWithData({
      id: oThis.lensPost.id,
      theme_id: oThis.lensPost.themeId,
      owner_user_id: oThis.lensPost.ownerUserId,
      lens_publication_id: oThis.lensPost.lensPublicationId,
      description_text_id: oThis.lensPost.descriptionTextId,
      image_id: oThis.lensPost.imageId,
      ipfs_object_id: oThis.lensPost.ipfsObjectId,
      total_votes: oThis.lensPost.totalVotes,
      uts: oThis.lensPost.updatedAt
    });
  }

  /**
   * Validate
   *
   * @param formattedEntity
   * @returns {*|result}
   * @private
   */
  _validate(formattedEntity) {
    const oThis = this;

    return oThis._validateSingle(formattedEntity);
  }

  /**
   * Schema
   *
   * @returns {{type: string, properties: {lens_publication_id: {type: string, example: string}, total_votes: {type: string, example: number}, owner_user_id: {type: string, example: number}, uts: {type: string, example: number}, description_text_id: {type: string, example: number}, ipfs_object_id: {type: string, example: number}, theme_id: {type: string, example: number}, id: {description: string, type: string, example: number}, image_id: {type: string, example: number}}, required: string[]}}
   */
  static schema() {
    return {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 100002,
          description: 'BE notes: this is the id of lens posts table'
        },
        theme_id: {
          type: 'integer',
          example: 100005
        },
        lens_publication_id: {
          type: 'string',
          example: '0x56667-ab67'
        },
        owner_user_id: {
          type: 'integer',
          example: 100005
        },
        description_text_id: {
          type: 'integer',
          example: 100005
        },
        image_id: {
          type: 'integer',
          example: 100005
        },
        ipfs_object_id: {
          type: 'integer',
          example: 100005
        },
        total_votes: {
          type: 'integer',
          example: 10
        },
        uts: {
          type: 'integer',
          example: 1651666861
        }
      },
      required: [
        'id',
        'theme_id',
        'lens_publication_id',
        'owner_user_id',
        'description_text_id',
        'image_id',
        'ipfs_object_id',
        'total_votes',
        'uts'
      ]
    };
  }
}

module.exports = LensPostSingleFormatter;
