const rootPrefix = '../../../..',
  ModelBase = require(rootPrefix + '/app/models/mysql/Base'),
  databaseConstants = require(rootPrefix + '/lib/globalConstant/database');

const dbName = databaseConstants.mainDbName;

/**
 * Class for lens_post model.
 *
 * @class LensPost
 */
class LensPost extends ModelBase {
  /**
   * Constructor for lens_post model.
   *
   * @augments ModelBase
   *
   * @constructor
   */
  constructor() {
    super({ dbName: dbName });

    const oThis = this;

    oThis.tableName = 'lens_posts';
  }

  /**
   * Format Db data.
   *
   * @param {object} dbRow
   * @param {number} dbRow.id
   * @param {string} dbRow.owner_user_id
   * @param {string} dbRow.lens_publication_id
   * @param {string} dbRow.title
   * @param {number} dbRow.description_text_id
   * @param {number} dbRow.image_id
   * @param {number} dbRow.ipfs_object_id
   * @param {number} dbRow.total_votes
   * @param {string} dbRow.nft_data
   * @param {string} dbRow.created_at
   * @param {string} dbRow.updated_at
   *
   * @returns {object}
   * @private
   */
  _formatDbRows(dbRow) {
    const oThis = this;

    const formattedData = {
      id: dbRow.id,
      ownerUserId: dbName.owner_user_id,
      lensPublicationId: dbRow.lens_publication_id,
      title: dbRow.title,
      descriptionTextId: dbRow.description_text_id,
      imageId: dbRow.image_id,
      ipfsObjectId: dbRow.ipfs_object_id,
      totalVotes: dbRow.total_votes,
      nftData: JSON.parse(dbRow.nft_data),
      createdAt: dbRow.created_at,
      updatedAt: dbRow.updated_at
    };

    formattedData.nftData = this._formatNFTData(formattedData.nftData);

    return oThis.sanitizeFormattedData(formattedData);
  }

  /**
   * Format NFT data.
   *
   * @param {object} nftData
   * @param {string} nftData.nft_tx_hash
   * @param {string} nftData.nft_token_id
   * @param {string} nftData.nft_metadata_cid
   *
   * @returns {object}
   * @private
   */
  _formatNFTData(nftData) {
    const oThis = this;

    const formattedData = {
      nftTxHash: nftData.nft_tx_hash,
      nftTokenId: nftData.nft_token_id,
      nftMetadataIpfsObjectId: nftData.nft_metadata_ipfs_object_id
    };

    return oThis.sanitizeFormattedData(formattedData);
  }

  /**
   * Insert into lens_posts
   * @param {object} params
   * @param {string} params.ownerUserId,
   * @param {string} params.lensPublicationId,
   * @param {string} params.title,
   * @param {number} params.descriptionTextId,
   * @param {number} params.imageId,
   * @param {number} params.ipfsObjectId,
   * @param {number} params.totalVotes,
   * @param {object} params.nftData),
   */
  insertLensPost(params) {
    const oThis = this;

    return oThis.insert({
      owner_user_id: params.ownerUserId,
      lens_publication_id: params.lensPublicationId,
      title: params.title,
      description_text_id: params.descriptionTextId,
      image_id: params.imageId,
      ipfs_object_id: params.ipfsObjectId,
      total_votes: params.totalVotes,
      nft_data: JSON.stringify(params.nftData)
    });
  }
}

module.exports = LensPost;