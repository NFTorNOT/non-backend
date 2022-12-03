
class BasicHelper {

  /**
   * Checks whether the object is empty or not.
   *
   * @param {object} obj
   *
   * @return {boolean}
   */
  isEmptyObject(obj) {
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Sleep for particular time.
   *
   * @param {number} ms: time in ms
   *
   * @returns {Promise<any>}
   */
  sleep(ms) {
    // eslint-disable-next-line no-console
    console.log(`Sleeping for ${ms} ms.`);

    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
  }

  /**
   * Validate non-empty string.
   *
   * @param {string} variable
   *
   * @returns {boolean}
   */
  validateNonEmptyString(variable) {
    return !!(this.validateString(variable) && variable && variable.trim().length !== 0);
  }

  /**
   * Is string valid ?
   *
   * @returns {boolean}
   */
  validateString(variable) {
    return typeof variable === 'string';
  }
}

module.exports = new BasicHelper();
