const {ethers} = require('ethers');
  axios = require('axios');

const basicHelper = require('../helpers/basic');

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
    oThis.imageCid = params.imageCid;

    oThis.response = {
      success: true,
      data: {},
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

      console.log('--- Getting Infura Provider for Mumbai Testnet ---');
      const provider = await new ethers.providers.InfuraProvider('maticmum');

      console.log('--- Getting Signer (Owner) of NFT Contract for Mumbai Testnet ---');
      const signer = new ethers.Wallet(process.env.SIGNER_PK, provider);

      console.log('--- Getting NFT Contract Instance for Mumbai Testnet ---');
      const NFTContract = new ethers.Contract(NFTContractAddress, safeMintNFTContractAbi, signer);

      console.log('--- Obtaining gas options ---');
      const gasOptions = await oThis.getGasOptions();

      console.log('--- Minting the NFT ---');
      const mintTx = await NFTContract.safeMint(oThis.receiverAddress, oThis.imageCid, gasOptions);

      console.log('--- Waiting for the NFT minting to be confirmed ---');
      const receipt = await mintTx.wait();

      console.log('--- NFT Minted Successfully ---');

      const topics = receipt.logs[0].topics;
      const tokenId = parseInt(topics[3]);

      console.log('Transaction Receipt ------- ', JSON.stringify(receipt));

      oThis.response.data = {
        transactionHash: receipt.transactionHash,
        tokenId: tokenId
      } 

    } catch(error) {
      console.error(`NFT Minting FAILED --- due to -- ${error}`);
      oThis.response.success = false;
      oThis.response.error = error;
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
      throw new Error('Receiver Address Required. -- 1');
    }

    if(!ethers.utils.isAddress(oThis.receiverAddress)) {
      throw new Error('Invalid Receiver Address. Please provide an valid address');
    }

    if(!oThis.imageCid || !basicHelper.validateNonEmptyString(oThis.imageCid)) {
      throw new Error('Invalid Image CID provided.')
    }
  }

  /**
   * Fetch and get gas options for a transaction.
   *
   * @returns {Promise<{maxPriorityFeePerGas: BigNumber, maxFeePerGas: BigNumber}>}
   */
  async getGasOptions() {
    const oThis = this;

    const {data} = await axios({
      method: 'get',
      url: 'https://gasstation-mainnet.matic.network/v2'
    })
    return {
        "maxFeePerGas": ethers.utils.parseUnits(Math.ceil(data.fast.maxFee).toString(), 'gwei'),
        "maxPriorityFeePerGas": ethers.utils.parseUnits(Math.ceil(data.fast.maxPriorityFee).toString(), 'gwei')
    }
  }
}

module.exports = MintNFT;