const rootPrefix = '../..',
  apiNameConstants = require(rootPrefix + '/lib/globalConstant/apiName');

const webRouteSpec = {
  'POST /api/store-on-ipfs': {
    apiName: apiNameConstants.storeOnIpfsApiName,
    summary: 'Store image and metadata on ipfs and database',
    tag: 'Submit to vote CRUD'
  }
};

module.exports = webRouteSpec;
