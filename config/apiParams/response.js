const rootPrefix = '../..',
  apiNameConstants = require(rootPrefix + '/lib/globalConstant/apiName'),
  entityTypeConstants = require(rootPrefix + '/lib/globalConstant/entityType'),
  responseEntityKey = require(rootPrefix + '/lib/globalConstant/responseEntityKey');

const webResponse = {
  [apiNameConstants.storeOnIpfsApiName]: {
    resultType: responseEntityKey.ipfsObjectIds,
    resultTypeLookup: responseEntityKey.ipfsObjects,
    entityKindToResponseKeyMap: {
      [entityTypeConstants.ipfsObjectIds]: responseEntityKey.ipfsObjectIds,
      [entityTypeConstants.ipfsObjectsMap]: responseEntityKey.ipfsObjects
    }
  },

  [apiNameConstants.getNftsToVoteApiName]: {
    resultType: responseEntityKey.lensPostsIds,
    resultTypeLookup: responseEntityKey.lensPosts,
    entityKindToResponseKeyMap: {
      [entityTypeConstants.lensPostsIds]: responseEntityKey.lensPostsIds,
      [entityTypeConstants.lensPostsMap]: responseEntityKey.lensPosts,
      [entityTypeConstants.imagesMap]: responseEntityKey.images,
      [entityTypeConstants.textsMap]: responseEntityKey.texts,
      [entityTypeConstants.themesMap]: responseEntityKey.themes,
      [entityTypeConstants.usersMap]: responseEntityKey.users,
      [entityTypeConstants.getNFTsToVoteListMeta]: responseEntityKey.meta
    }
  }
};

module.exports = webResponse;
