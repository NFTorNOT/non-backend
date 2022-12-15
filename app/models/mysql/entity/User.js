const rootPrefix = '../../../..',
  ModelBase = require(rootPrefix + '/app/models/mysql/Base'),
  databaseConstants = require(rootPrefix + '/lib/globalConstant/database'),
  userConstants = require(rootPrefix + '/lib/globalConstants/entity/user');

const dbName = databaseConstants.mainDbName;

/**
 * Class for User model.
 *
 * @class User
 */
class User extends ModelBase {
  /**
   * Constructor for User model.
   *
   * @augments ModelBase
   *
   * @constructor
   */
  constructor() {
    super({ dbName: dbName });

    const oThis = this;

    oThis.tableName = 'users';
  }

  /**
   * Format Db data.
   *
   * @param {object} dbRow
   * @param {number} dbRow.id
   * @param {string} dbRow.lens_profile_id
   * @param {string} dbRow.lens_profile_owner_address
   * @param {string} dbRow.status
   * @param {string} dbRow.cookie_token
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
      lensProfileId: dbRow.lens_profile_id,
      lensProfileOwnerAddress: dbRow.lens_profile_owner_address,
      status: userConstants.statuses[dbRow.status],
      cookieToken: dbRow.cookie_token,
      createdAt: dbRow.created_at,
      updatedAt: dbRow.updated_at
    };

    return oThis.sanitizeFormattedData(formattedData);
  }

  /**
   * Insert into votes
   * @param {object} params
   * @param {string} params.lensProfileId,
   * @param {string} params.lensProfileOwnerAddress,
   * @param {string} params.cookieToken,
   * @param {string} params.status,
   */
  insertUser(params) {
    const oThis = this;

    return oThis.insert({
      lens_profile_id: params.lensProfileId,
      lens_profile_owner_address: params.lensProfileOwnerAddress,
      cookie_token: params.cookieToken,
      status: userConstants.invertedStatuses[params.status]
    });
  }
}

module.exports = User;
