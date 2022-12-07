const PushAPI = require('@pushprotocol/restapi');
const ethers = require('ethers');

class SendNotification {
  constructor() {}

  async perform(recipientAddress) {

    const signer = new ethers.Wallet(process.env.WALLET_PK);

    console.log('* Sending push notification to:', recipientAddress);

    await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // subset
      identityType: 2, // direct payload
      notification: {
        title: `NON Updates`,
        body: `Congratulations 👍 your image has been selected for nft of the day`
      },
      payload: {
        title: `NON Updates`,
        body: `Congratulations 👍 your image has been selected for nft of the day`,
        cta: '',
        img: ''
      },
      recipients: `eip155:5:${recipientAddress}`, // recipients addresses
      channel: 'eip155:5:0xd49F5734271a887C689A5f91202Ff4b8a7720C5a', // your channel address
      env: 'staging'
    });

    console.log('** Push notification sent to:', recipientAddress);
  }
}
module.exports = new SendNotification;