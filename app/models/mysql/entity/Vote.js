const rootPrefix = '../../../..',
  ModelBase = require(rootPrefix + '/app/models/mysql/Base'),
  databaseConstants = require(rootPrefix + '/lib/globalConstant/database'),
  voteConstants = require(rootPrefix + '/lib/globalConstant/entity/vote');

const dbName = databaseConstants.mainDbName;

/**
 * Class for Vote model.
 *
 * @class Vote
 */
class Vote extends ModelBase {
  /**
   * Constructor for Vote model.
   *
   * @augments ModelBase
   *
   * @constructor
   */
  constructor() {
    super({ dbName: dbName });

    const oThis = this;

    oThis.tableName = 'votes';
  }

  /**
   * Format Db data.
   *
   * @param {object} dbRow
   * @param {number} dbRow.id
   * @param {string} dbRow.lens_post_id
   * @param {string} dbRow.voter_user_id
   * @param {string} dbRow.status
   * @param {string} dbRow.collect_nft_transaction_hash
   * @param {string} dbRow.created_at
   * @param {string} dbRow.updated_at
   *
   * @returns {object}
   * @private
   */
  _formatDbData(dbRow) {
    const oThis = this;

    const formattedData = {
      id: dbRow.id,
      lensPostId: dbName.lens_post_id,
      voterUserId: dbRow.voter_user_id,
      status: voteConstants.statuses[dbRow.status],
      collectNftTransactionHash: dbRow.collect_nft_transaction_hash,
      createdAt: dbRow.created_at,
      updatedAt: dbRow.updated_at
    };

    return oThis.sanitizeFormattedData(formattedData);
  }

  /**
   * Insert into votes
   * @param {object} params
   * @param {string} params.lensPostId,
   * @param {string} params.voterUserId,
   * @param {string} params.collectNftTransactionHash,
   * @param {string} params.status,
   */
  async insertVote(params) {
    const oThis = this;

    return oThis
      .insert({
        lens_post_id: params.lensPostId,
        voter_user_id: params.voterUserId,
        collect_nft_transaction_hash: params.collectNftTransactionHash,
        status: voteConstants.invertedStatuses[params.status]
      })
      .fire();
  }
}

module.exports = Vote;
