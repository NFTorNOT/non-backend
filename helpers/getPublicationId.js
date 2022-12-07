const {ethers} = require('ethers');
const moment = require('moment-timezone');

  const NFTOfTheDayContractAbi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "epochTimestamp",
          "type": "uint256"
        }
      ],
      "name": "getPublicationIdForTimestamp",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
  ];

  async function getPublicationId() {

    // const contractAddress = '0x8235C2CE19fE0A898E57306bB8E6b3c68afe8fd7';
    const contractAddress = '0x0F731a10eF112232986E72FBEb93de050ff23b00';


    const provider = await new ethers.providers.InfuraProvider('maticmum');
    const contractInstance = new ethers.Contract(contractAddress, NFTOfTheDayContractAbi, provider);

    const currentTimestampInSeconds = Math.floor(Date.now()/1000);
    const startOfHourTimestamp = moment(currentTimestampInSeconds * 1000).startOf('hour');

    console.log('startOfHourTimestamp -----------', startOfHourTimestamp);

    return await contractInstance.getPublicationIdForTimestamp(Math.floor(startOfHourTimestamp.valueOf()/1000))
    .catch(function(error) {
      console.error('Error while getting publication Id');
    });
 }
  
module.exports = getPublicationId