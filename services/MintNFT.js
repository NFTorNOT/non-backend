const {ethers} = require('ethers');
  axios = require('axios'),
  fs = require('fs');

const basicHelper = require('../helpers/basic'),
  ipfsHelper = require('../helpers/ipfs');

const NFTContractAddress = '0xE6E3A805bf2b0DC1D7713d7B30B9eE476ab77a19';

const safeMintNFTContractAbi = [
  {
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "safeMint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
];

class MintNFT {

  constructor(params) {
    const oThis = this;

    oThis.receiverAddress = params.receiverAddress;
    oThis.imageUrl = params.imageUrl;
    oThis.description =  params.description;

    oThis.imageCid= null;
    oThis.imageMetaDataCid = null;

    oThis.response = {
      transactionHash: null,
      tokenId: null,
      imageCid: null,
      error: null
    };
  }

  /**
   * Main performer for class.
   *
   * @returns {Promise<object>}
   */
  async perform() {
    const oThis = this;

    try {

      oThis._validateParams();

      await oThis._uploadImageToIpfs();

      await oThis._uploadImageMetadataToIpfs();

      await oThis._mintToken();

    } catch(error) {
      console.error(`NFT Minting FAILED --- due to -- ${error}`);
      oThis.response.error = JSON.stringify(error);
    }

    return oThis.response;
  }

  /**
   * Validate input parameters.
   *
   * @private
   */
  _validateParams() {
    const oThis = this;

    if(!oThis.receiverAddress || !basicHelper.validateNonEmptyString(oThis.receiverAddress)) {
      throw new Error('Receiver Address Required.');
    }

    if(!ethers.utils.isAddress(oThis.receiverAddress)) {
      throw new Error('Invalid Receiver Address. Please provide an valid address');
    }

    if(!oThis.imageUrl || !basicHelper.validateNonEmptyString(oThis.imageUrl)) {
      throw new Error('Invalid Image url provided.')
    }

    if(!oThis.description || !basicHelper.validateNonEmptyString(oThis.description)) {
      throw new Error('Invalid description provided.')
    }
  }

  /**
   * 
   */
  async _uploadImageToIpfs() {
    const oThis = this;

    console.log('--- Downloading file from S3 ---');
    const localImageDownloadPath = await basicHelper.downloadFile(oThis.imageUrl, 'png');
    console.log('--- Download file completed from S3 ---');

    const fileName = localImageDownloadPath.split('/').at(-1);
    const localImageFileData = fs.readFileSync(localImageDownloadPath);

    console.log('--- Upload image to IPFS ---');
    oThis.imageCid = await ipfsHelper.uploadImage(fileName, localImageFileData);
    console.log('---- Upload image to IPFS completed:', oThis.imageCid);

    oThis.response.imageCid = oThis.imageCid;
  }

  async _uploadImageMetadataToIpfs() {
    const oThis = this;

    const metadataObject = {
      name: 'NFTorNOT',
      description: oThis.description,
      image: `ipfs://${oThis.imageCid}`
    };

    oThis.imageMetaDataCid = await ipfsHelper.uploadMetaData(metadataObject);
  }

  async _mintToken() {
    const oThis = this;

    console.log('--- Getting Infura Provider for Mumbai Testnet ---');
    const provider = await new ethers.providers.InfuraProvider('maticmum');

    console.log('--- Getting Signer (Owner) of NFT Contract for Mumbai Testnet ---');
    const signer = new ethers.Wallet(process.env.SIGNER_PK, provider);

    console.log('--- Getting NFT Contract Instance for Mumbai Testnet ---');
    const NFTContract = new ethers.Contract(NFTContractAddress, safeMintNFTContractAbi, signer);

    console.log('--- Obtaining gas options ---');
    const gasOptions = await oThis.getGasOptions(provider);

    console.log('--- Minting the NFT ---');
    const mintTx = await NFTContract.safeMint(oThis.receiverAddress, oThis.imageCid, gasOptions);

    console.log('--- Waiting for the NFT minting to be confirmed ---');
    const receipt = await mintTx.wait();

    console.log('--- NFT Minted Successfully ---');

    const topics = receipt.logs[0].topics;
    const tokenId = parseInt(topics[3]);

    console.log('Transaction Receipt ------- ', JSON.stringify(receipt));

    oThis.response.transactionHash = receipt.transactionHash;
    oThis.response.tokenId = tokenId;
  }

  /**
   * Fetch and get gas options for a transaction.
   *
   * @returns {Promise<{maxPriorityFeePerGas: BigNumber, maxFeePerGas: BigNumber}>}
   */
  async getGasOptions(provider) {
    const oThis = this;

    const feeData = await provider.getFeeData()
    const maxPriority = feeData.maxPriorityFeePerGas
    return {
        "maxPriorityFeePerGas": maxPriority,
        "maxFeePerGas": feeData.maxFeePerGas.add(maxPriority)
    }
  }
}

module.exports = MintNFT;