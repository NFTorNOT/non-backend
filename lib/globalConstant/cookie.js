/**
 * Class for cookie constants.
 *
 * @class CookieConstants
 */
class CookieConstants {
  /**
   * Get expiry time for user cookie.
   *
   * @returns {number}
   */
  get userCookieExpiryTime() {
    return 7 * 60 * 24 * 30; // 30 days
  }

  /**
   * Get cookie name for user login cookie.
   *
   * @returns {string}
   */
  get userLoginCookieName() {
    return 'ulc';
  }

  /**
   * Get latest cookie version.
   *
   * @returns {number}
   */
  get latestVersion() {
    return '1';
  }
}

module.exports = new CookieConstants();
