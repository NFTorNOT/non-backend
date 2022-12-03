const fs = require('fs'),
  { uuid } = require('uuidv4'),
  execSync = require('child_process').execSync,
  AWS = require('aws-sdk');

class FetchImageFromStabilityAI {

  constructor(params) {
    const oThis = this;

    oThis.prompt = params.prompt;
    oThis.artStyle = params.artStyle;
    oThis.uuidv4 = uuid();
    oThis.dataDir = `/tmp/${oThis.uuidv4}`;

    oThis.response = {
      image: {},
      debugData: {},
      error: {}
    };
  }

  /**
   * Main performer for class.
   *
   * @returns {Promise<object>}
   */
  async perform() {
    const oThis = this;

    const filePath = await oThis.fetchImage();

    if(!filePath) {
      return oThis.response;
    }

    await oThis.uploadImageToS3(filePath);

    await oThis.removeDirectory(oThis.dataDir);

    return oThis.response;
  }

  /**
   * Fetch image from stability.
   *
   * @returns {Promise<string>}
   */
  async fetchImage() {
    const oThis = this;

    console.log('---- Start :: Fetch Image from stability api starts here ---- ', Math.floor(Date.now()/1000));

    if(!oThis.prompt ) {
      throw new Error('Prompt is empty');
    }

    oThis.prompt = oThis.prompt.replace('.', '');
    oThis.prompt = oThis.prompt.replaceAll('\"','');

    oThis.prompt = '\"'+`${oThis.prompt}`+'\"';
    oThis.prompt = oThis.artStyle ? `${oThis.prompt}, ${oThis.artStyle}`: oThis.prompt;

    let imageFIlePathResp;
    try {
      imageFIlePathResp = await oThis.stabilityApiCall();
      return imageFIlePathResp;

    } catch (e) {
      console.log("--------------------- Stability API Error ----------------", e.toString('utf8'));


      const error = e.toString('utf8');
      if (error.includes('Invalid prompts detected')) {
        oThis.response.error = {message: "Invalid prompts detected"};
      } else {
        oThis.response.error = {message: "Failed to generate image"};
      }
    }

    console.log('---- End :: Fetch Image from stability api ends here ---- ', Math.floor(Date.now()/1000));
  }

  /**
   * Make an stability ai call to generate an image
   *
   * @returns {Promise<string>}
   */
  async stabilityApiCall() {
    const oThis = this;

    execSync(`mkdir ${oThis.dataDir}`);

    oThis.response.debugData = {
      prompt: oThis.prompt
    };

    execSync(
      `python3 -m stability_sdk.client -W 512 -H 512 ${oThis.prompt}`,
      {
        shell: true,
        cwd: `${oThis.dataDir}`,
        env: Object.assign({},
          process.env,
          {
            STABILITY_KEY: process.env.STABILITY_KEY,
            NODE_PATH: process.cwd() + '/node_modules'
          })
      }
    );

    let imageFileName = null;

    const fileNames = fs.readdirSync(oThis.dataDir);

    for(let fileName of fileNames) {
      if(fileName.endsWith('.png')) {
        imageFileName = fileName;
      }
    }

    const imageFilePath = `${oThis.dataDir}/${imageFileName}`;

    return imageFilePath;
  }

  /**
   * Upload image to S3 storage.
   *
   * @param filePath
   * @returns {Promise<void>}
   */
  async uploadImageToS3(filePath) {
    const oThis = this;

    await oThis.putObject(`${process.env.S3_BUCKET}`, `stability/${oThis.uuidv4}.png`, filePath);
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
      ContentType: 'image/png'
    };

    return new Promise(function(onResolve, reject) {
      AWSS3.upload(params)
        .promise()
        .then(function(resp) {
          const location = {url: resp.Location || ''};
          oThis.response.image = oThis._replaceS3UrlWithCDN(location);
          onResolve(console.log("success", resp));
        })
        .catch(function(err) {
          console.error('Error in uploading image to S3 ------- ', err);
          reject(err);
        });
    });
  }

  /**
   * Remove temporary files directory.
   *
   * @param directory
   * @returns {Promise<void>}
   */
  async removeDirectory(directory) {
    fs.rm(directory, { recursive: true }, err => {
      if (err) {
        throw err
      }

      console.log(`${directory} is deleted!`)
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
   * Replaces S3 url with it's cdn
   * 
   * @param {string} s3url 
   * @returns 
   */
  _replaceS3UrlWithCDN(s3url) {

    const urlParts = s3url.split('/'),
      filePathParts = urlParts.splice(3,5);

    return `https://static.nftornot.com/${filePathParts.join('/')}`;
  }

  /**
   * Fetch image from stability.
   *
   * @returns {Promise<string>}
   */
  async fetchImage() {
    const oThis = this;

    console.log('---- Start :: Fetch Image from stability api starts here ---- ', Math.floor(Date.now()/1000));

    if(!oThis.prompt ) {
      throw new Error('Prompt is empty');
    }

    oThis.prompt = oThis.prompt.replace('.', '');
    oThis.prompt = oThis.prompt.replaceAll('\"','');

    oThis.prompt = '\"'+`${oThis.prompt}`+'\"';
    oThis.prompt = oThis.artStyle ? `${oThis.prompt}, ${oThis.artStyle}`: oThis.prompt;

    let imageFIlePathResp;
    try {
      imageFIlePathResp = await oThis.stabilityApiCall();
      return imageFIlePathResp;

    } catch (e) {
      console.log("--------------------- Stability API Error ----------------", e.toString('utf8'));


      const error = e.toString('utf8');
      if (error.includes('Invalid prompts detected')) {
        oThis.response.error = {message: "Invalid prompts detected"};
      } else {
        oThis.response.error = {message: "Failed to generate image"};
      }
    }

    console.log('---- End :: Fetch Image from stability api ends here ---- ', Math.floor(Date.now()/1000));
  }

  /**
   * Make an stability ai call to generate an image
   *
   * @returns {Promise<string>}
   */
  async stabilityApiCall() {
    const oThis = this;

    execSync(`mkdir ${oThis.dataDir}`);

    oThis.response.debugData = {
      prompt: oThis.prompt
    };

    execSync(
      `python3 -m stability_sdk.client -W 512 -H 512 ${oThis.prompt}`,
      {
        shell: true,
        cwd: `${oThis.dataDir}`,
        env: Object.assign({},
          process.env,
          {
            STABILITY_KEY: process.env.STABILITY_KEY,
            NODE_PATH: process.cwd() + '/node_modules'
          })
      }
    );

    let imageFileName = null;

    const fileNames = fs.readdirSync(oThis.dataDir);

    for(let fileName of fileNames) {
      if(fileName.endsWith('.png')) {
        imageFileName = fileName;
      }
    }

    const imageFilePath = `${oThis.dataDir}/${imageFileName}`;

    return imageFilePath;
  }

  /**
   * Upload image to S3 storage.
   *
   * @param filePath
   * @returns {Promise<void>}
   */
  async uploadImageToS3(filePath) {
    const oThis = this;

    await oThis.putObject(`${process.env.S3_BUCKET}`, `stability/nft-or-not/${oThis.uuidv4}.png`, filePath);
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
      ContentType: 'image/png'
    };

    return new Promise(function(onResolve, reject) {
      AWSS3.upload(params)
        .promise()
        .then(function(resp) {
          const location = {url: resp.Location || ''};
          oThis.response.image = location;
          onResolve(console.log("success", resp));
        })
        .catch(function(err) {
          console.error('Error in uploading image to S3 ------- ', err);
          reject(err);
        });
    });
  }

  /**
   * Remove temporary files directory.
   *
   * @param directory
   * @returns {Promise<void>}
   */
    async removeDirectory(directory) {
      fs.rm(directory, { recursive: true }, err => {
        if (err) {
          throw err
        }

        console.log(`${directory} is deleted!`)
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
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
      });

      return AWSInstance;
    }
}

module.exports = FetchImageFromStabilityAI;
