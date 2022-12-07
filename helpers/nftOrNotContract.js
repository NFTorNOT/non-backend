const { ethers } = require('ethers');
  axios = require('axios');

// const NFTOfTheDayContractAddress = '0x4E311732CD82C26237cEf8Bb1065CCF90b74b596';
const NFTOfTheDayContractAddress = '0x0F731a10eF112232986E72FBEb93de050ff23b00';

const NFTOfTheDayContractAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "epochTimestamp",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "publicationId",
        "type": "string"
      }
    ],
    "name": "setPublication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
		"inputs": [
			{
				"internalType": "uint256",
				"name": "epochTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "nftOftheDayPublicationId",
				"type": "string"
			}
		],
		"name": "setNFTOfTheDay",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
];

class NftOrNotContract {

  /**
   * Sets publication id for a day in smart contract.
   * 
   * @param {number} epochTimestamp 
   * @param {string} publicationId 
   */
  async setWordOfTheDayPublicationId(epochTimestamp, publicationId) {
    const oThis = this;

    console.log('--- Getting Infura Provider ---');
    const provider = await new ethers.providers.InfuraProvider('maticmum');

    console.log('--- Getting Signer (Owner) of NFTOfTheDay Contract  ---');
    const signer = new ethers.Wallet(process.env.SIGNER_PK, provider);

    console.log('--- Getting NFTOfTheDay Contract Instance ---');
    const NFTOfTheDayContract = new ethers.Contract(NFTOfTheDayContractAddress, NFTOfTheDayContractAbi, signer);

    console.log('--- Obtaining gas options ---');
    const gasOptions = await oThis.getGasOptions(provider);
    console.log('--- Obtaining gas options ---', gasOptions);

    console.log('--- Making set publication tx ---');
    const setTx = await NFTOfTheDayContract.setPublication(epochTimestamp, publicationId, gasOptions);

    console.log('--- Waiting for the tx to be confirmed ---');
    const receipt = await setTx.wait();

    console.log('--- Set Publication tx Successful ---');

    console.log('Transaction Receipt ------- ', receipt);
  }

  /**
   * Sets token id as nft of the day in smart contract.
   * 
   * @param {number} epochTimestamp 
   * @param {number} tokenId 
   */
  async setNFTOfTheDayTokenId(epochTimestamp, tokenId, nftOfTheDayPublicationId) {
    const oThis = this;

    console.log('--- Getting Infura Provider ---');
    const provider = await new ethers.providers.InfuraProvider('maticmum');

    console.log('--- Getting Signer (Owner) of NFTOfTheDay Contract  ---');
    const signer = new ethers.Wallet(process.env.SIGNER_PK, provider);

    console.log('--- Getting NFTOfTheDay Contract Instance ---');
    const NFTOfTheDayContract = new ethers.Contract(NFTOfTheDayContractAddress, NFTOfTheDayContractAbi, signer);

    console.log('--- Obtaining gas options ---');
    const gasOptions = await oThis.getGasOptions(provider);

    console.log('--- Making set nft of the day tx ---');
    const setTx = await NFTOfTheDayContract.setNFTOfTheDay(epochTimestamp, tokenId, nftOfTheDayPublicationId, gasOptions);

    console.log('--- Waiting for the tx to be confirmed ---');
    const receipt = await setTx.wait();

    console.log('--- Set nft of the day Successful ---');

    console.log('Transaction Receipt ------- ', receipt);
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

module.exports = new NftOrNotContract;