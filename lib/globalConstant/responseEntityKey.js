/**
 * Class for response entity key constants.
 *
 * @class ResponseEntityKeyConstants
 */
class ResponseEntityKeyConstants {
  /**
   * Get response key for meta entities.
   *
   * @returns {string}
   */
  get meta() {
    return 'meta';
  }

  get ipfsObjectIds() {
    return 'ipfs_object_ids';
  }

  get ipfsObjects() {
    return 'ipfs_objects';
  }
}

module.exports = new ResponseEntityKeyConstants();
