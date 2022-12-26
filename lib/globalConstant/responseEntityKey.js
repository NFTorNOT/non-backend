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

  get currentUser() {
    return 'current_user';
  }

  get ipfsObjectIds() {
    return 'ipfs_object_ids';
  }

  get ipfsObjects() {
    return 'ipfs_objects';
  }

  get lensPostsIds() {
    return 'lens_posts_ids';
  }

  get lensPosts() {
    return 'lens_posts';
  }

  get images() {
    return 'images';
  }

  get users() {
    return 'users';
  }

  get texts() {
    return 'texts';
  }

  get themes() {
    return 'themes';
  }

  get suggestionIds() {
    return 'suggestion_ids';
  }

  get suggestions() {
    return 'suggestions';
  }
}

module.exports = new ResponseEntityKeyConstants();
