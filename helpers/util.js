const rootPrefix = '..',
 fetch = require("node-fetch"),
 fs = require('fs'),
 { ethers } = require("ethers"),
 { splitSignature } = require("ethers/lib/utils"),
  ABI = require(rootPrefix + '/helpers/contractABI.js');


let client = null;
let urlSourceFunction = null;
let globSourceFunction = null;
const provider = new ethers.providers.JsonRpcProvider(process.env.ENDPOINT);


class util {

  constructor(){
  }

  getProvider(){
    return provider;
  }

  async getSigner() {
    const signer = new ethers.Wallet(process.env.SIGNER_PK, provider);
    return signer
  }
  
  async  signMessage(message) {
    const signer = await this.getSigner();
    const signature =  await signer.signMessage(message);
    return signature;
  }

  async ipfsClient() {
    const { create, urlSource, globSource } = await import('ipfs-http-client')
    console.log('create--->', create);
    urlSourceFunction = urlSource;
    globSourceFunction = globSource;
    client = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
            headers: {
                "Authorization": `Basic ${Buffer.from(`${process.env.PROJET_ID}:${process.env.SECRET}`).toString("base64")}`
        }
    });
  }

  async uploadDataToIpfs(postData) {
    const response = await fetch("https://api.web3.storage/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WEB3_IPFS_TOKEN}`,
        contentType: "application/json",
      },
      body: JSON.stringify(postData),
    });
    // console.log({ response });
    const responseJson = await response?.json();
    const cid = responseJson?.cid;
    console.log("Content added with CID:", cid);
    return "ipfs://" + cid;
  }

  async uploadDataToIpfsInfura(data) {
    await this.ipfsClient();
    const result = await client.add(JSON.stringify(data));

    console.log('upload result ipfs', result);
    return `ipfs://${result.path}`;
  }

  async uploadImageToIpfsInfura() {
    await this.ipfsClient();
    const file = fs.readFileSync('./naruto_1.png');
    // const result = await client.add(urlSourceFunction('https://slackmin-poc.s3.amazonaws.com/gpt3/402390a4-73e0-4625-ae29-ff3ece17fa52.png'));

    // const result = await client.add(globSourceFunction('./image2.jpeg', '/*'));

    const result = await client.add({path: 'naruto_1.jpg', content: file});
    
    // const fileAdded = await ipfs.add({path: fileName);

    console.log('upload result ipfs image - ', result);
    return `ipfs://${result.cid}`;
  }

}

module.exports = new util();