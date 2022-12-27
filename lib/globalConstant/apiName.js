/**
 * Class for API names.
 *
 * @class ApiName
 */
class ApiName {
  get addReactionToNFT() {
    return 'addReactionToNFT';
  }

  get authenticateUser() {
    return 'authenticateUser';
  }

  get getImageSuggestions() {
    return 'getImageSuggestions';
  }

  get getNftsToVoteApiName() {
    return 'getNftsToVoteApiName';
  }

  get logout() {
    return 'logout';
  }

  get storeOnIpfsApiName() {
    return 'storeOnIpfsApiName';
  }

  get submitToVote() {
    return 'submitToVote';
  }

  get getCurrentUser() {
    return 'getCurrentUser';
  }
}

module.exports = new ApiName();
