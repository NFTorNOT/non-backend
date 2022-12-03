const { ethers } = require('ethers');
  axios = require('axios');

const NFTOfTheDayContractAddress = '';

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
    const gasOptions = await oThis.getGasOptions();

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
  async setNFTOfTheDayTokenId(epochTimestamp, tokenId) {
    const oThis = this;

    console.log('--- Getting Infura Provider ---');
    const provider = await new ethers.providers.InfuraProvider('maticmum');

    console.log('--- Getting Signer (Owner) of NFTOfTheDay Contract  ---');
    const signer = new ethers.Wallet(process.env.SIGNER_PK, provider);

    console.log('--- Getting NFTOfTheDay Contract Instance ---');
    const NFTOfTheDayContract = new ethers.Contract(NFTOfTheDayContractAddress, NFTOfTheDayContractAbi, signer);

    console.log('--- Obtaining gas options ---');
    const gasOptions = await oThis.getGasOptions();

    console.log('--- Making set nft of the day tx ---');
    const setTx = await NFTOfTheDayContract.setNFTOfTheDay(epochTimestamp, tokenId, gasOptions);

    console.log('--- Waiting for the tx to be confirmed ---');
    const receipt = await setTx.wait();

    console.log('--- Set nft of the day Successful ---');

    console.log('Transaction Receipt ------- ', receipt);
  }
}

module.exports = new NftOrNotContract;