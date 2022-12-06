const fs = require('fs'),
  { uuid } = require('uuidv4'),
  execSync = require('child_process').execSync,
  AWS = require('aws-sdk');

  const S3_WORDS_FILE_PATH = `wordsForTheDay/words.json`;
  const LOCAL_FILE_PATH = `/tmp/words.json`;

class WordsForLensPost {

   
  /**
   * Upload Json file to S3 storage.
   *
   * @returns {Promise<void>}
   */
  async uploadJsonToS3() {
    const oThis = this;

    await oThis.putObject(`${process.env.S3_BUCKET}`, S3_WORDS_FILE_PATH, LOCAL_FILE_PATH);
  }

  /**
   * Put object in s3 bucket.
   *
   * @param bucket
   * @param S3FilePath
   * @param filePath
   * @returns {Promise<unknown>}
   */
  async putObject(bucket, S3FilePath, filePath) {
    const oThis = this;

    const AWSS3 = await oThis.getInstance();

    const params = {
      Bucket: bucket,
      Key: S3FilePath,
      Body: fs.createReadStream(filePath),
      ACL:'public-read',
      ContentType: 'application/json'
    };

    return new Promise(function(onResolve, reject) {
      AWSS3.upload(params)
        .promise()
        .then(function(resp) {
          onResolve(console.log("success", resp));
        })
        .catch(function(err) {
          console.error('Error in uploading file to S3 ------- ', err);
          reject(err);
        });
    });
  }
    
  /**
   * Get AWS SDK instance.
   *
   * @returns {Promise<S3>}
   */
  async getInstance() {

    const AWSInstance = new AWS.S3({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    return AWSInstance;
  }
  
  /**
   * Get object from S3.
   * 
   * 
   */
  async getObject(){

    const oThis = this;

    fs.closeSync(fs.openSync(LOCAL_FILE_PATH, 'w'));
    const file = fs.createWriteStream(LOCAL_FILE_PATH);

    const AWSS3 = await oThis.getInstance();

    const params = { Bucket: `${process.env.S3_BUCKET}`, Key: S3_WORDS_FILE_PATH };

    return new Promise(function(resolve, reject) {
      AWSS3.getObject(params, function(err, res) {
        if (err == null) {
          file.write(res.Body, function(error) {
            if (error) {
              reject(error);
            }

            file.end();
            resolve({});
          });
        } else {
          reject(err);
        }
      });
    });
    }
  }
  
  module.exports = new WordsForLensPost();
  