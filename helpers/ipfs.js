const fs = require('fs');

class Ipfs {
  async uploadImage(fileName, localFileData) {
    const response = await fetch('https://api.web3.storage/upload', {
      method: 'POST',
      headers: {
        'X-NAME': fileName,
        Authorization: `Bearer ${process.env.WEB3_STORAGE_IPFS_TOKEN}`
      },
      body: localFileData
    });
    const responseJson = await response.json();

    const cid = responseJson.cid;

    return cid;
  }

  async uploadMetaData(metadataObj) {
    const oThis = this;

    const client = await oThis._ipfsInfuraClient();

    let result;

    try {
      result = await client.add(JSON.stringify(metadataObj));
    } catch (err) {
      console.log('Error while uploading NFT Metadata -----', err);
    }

    return result.path;
  }

  async _ipfsInfuraClient() {
    const { create } = await import('ipfs-http-client');

    const auth = `${process.env.INFURA_PROJECT_ID}:${process.env.INFURA_API_SECRET_KEY}`;

    const client = await create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        Authorization: `Basic ${Buffer.from(auth).toString('base64')}`
      }
    });

    return client;
  }
}

module.exports = new Ipfs();
