const rootPrefix = '../../../..',
  BaseFormatter = require(rootPrefix + '/lib/formatter/Base'),
  responseHelper = require(rootPrefix + '/lib/formatter/response');

/**
 * Class for get Image Details formatter.
 *
 * @class ImageSingleFormatter
 */
class ImageSingleFormatter extends BaseFormatter {
  /**
   * Constructor for get Image Details formatter.
   *
   * @param {object} params
   * @param {object} params.image
   *
   * @param {number} params.image.id
   * @param {object} params.image.url
   * @param {number} params.image.updatedAt
   *
   * @augments BaseFormatter
   *
   * @constructor
   */
  constructor(params) {
    super();

    const oThis = this;

    oThis.image = params.image;
  }

  /**
   * Validate the input objects.
   *
   * @returns {result}
   * @private
   */
  _validate() {
    const oThis = this;

    const imageKeyConfig = {
      id: { isNullAllowed: false },
      url: { isNullAllowed: false },
      updatedAt: { isNullAllowed: false }
    };

    return oThis._validateSingle(oThis.image, imageKeyConfig);
  }

  /**
   * Format the input object.
   *
   * @returns {*|result|*}
   * @private
   */
  _format() {
    const oThis = this;

    return responseHelper.successWithData({
      id: Number(oThis.image.id),
      url: oThis.image.url,
      uts: Number(oThis.image.updatedAt)
    });
  }
}

module.exports = ImageSingleFormatter;
