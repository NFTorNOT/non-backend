
const rootPrefix = '.';
const fs = require('fs');
const { uuid } = require('uuidv4');
const execSync = require('child_process').execSync;
const AWS = require('aws-sdk');

const BUCKET_NAME = 'slackmin-poc';

class FetchImageFromStabilityAI {

  /**
   * Main performer for class.
   *
   * @returns {Promise<object>}
   */
  async perform() {
    const oThis = this;

    return {};
  }
}

module.exports = FetchImageFromStabilityAI;