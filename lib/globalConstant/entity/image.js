const rootPrefix = '../../..',
  util = require(rootPrefix + '/lib/util');

let invertedKinds;

/**
 * Class for image constants
 *
 * @class ImageConstants
 */
class ImageConstants {
  get NftImageKind() {
    return 'NFT';
  }

  get profileImageKind() {
    return 'PROFILE';
  }

  get kinds() {
    const oThis = this;

    return {
      '1': oThis.imageKind,
      '2': oThis.lensPublicationMetadataKind
    };
  }

  get invertedKinds() {
    const oThis = this;

    invertedKinds = invertedKinds || util.invert(oThis.kinds);

    return invertedKinds;
  }
}

module.exports = new ImageConstants();
