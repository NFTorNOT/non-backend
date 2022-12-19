const rootPrefix = '../..',
  apiNameConstants = require(rootPrefix + '/lib/globalConstant/apiName');

const webRouteSpec = {
  'POST /api/store-on-ipfs': {
    apiName: apiNameConstants.storeOnIpfsApiName,
    summary: 'Store image and metadata on ipfs and database',
    tag: 'Submit to vote CRUD'
  },

  'GET /api/nfts': {
    apiName: apiNameConstants.getNftsToVoteApiName,
    summary: 'Get all nfts and images to vote for a user',
    tag: 'Vote NFTs'
  }
};

module.exports = webRouteSpec;
