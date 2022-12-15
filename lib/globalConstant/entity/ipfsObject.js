const rootPrefix = '../../..',
  util = require(rootPrefix + '/lib/util');

let invertedKinds;

/**
 * Class for vote constants
 *
 * @class VoteConstants
 */
class IpfsObjectConstants {
  get nftMetadataKind() {
    return 'NFT_METADATA';
  }

  get lensPublicationMetadataKind() {
    return 'LENS_PUBLICATION_METADATA';
  }

  get imageKind() {
    return 'IMAGE';
  }

  get kinds() {
    const oThis = this;

    return {
      '1': oThis.imageKind,
      '2': oThis.lensPublicationMetadataKind,
      '3': oThis.nftMetadataKind
    };
  }

  get invertedKinds() {
    const oThis = this;

    invertedKinds = invertedKinds || util.invert(oThis.kinds);

    return invertedKinds;
  }
}

module.exports = new IpfsObjectConstants();
