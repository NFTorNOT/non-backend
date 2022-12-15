const rootPrefix = '../../..',
  util = require(rootPrefix + '/lib/util');

let invertedStatuses;

/**
 * Class for vote constants
 *
 * @class VoteConstants
 */
class VoteConstants {
  get votedStatus() {
    return 'VOTED';
  }

  get ignoredStatus() {
    return 'IGNORED';
  }

  get statuses() {
    const oThis = this;

    return {
      '1': oThis.votedStatus,
      '2': oThis.ignoredStatus
    };
  }

  get invertedStatuses() {
    const oThis = this;

    invertedStatuses = invertedStatuses || util.invert(oThis.statuses);

    return invertedStatuses;
  }
}

module.exports = new VoteConstants();
