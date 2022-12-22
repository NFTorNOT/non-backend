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

  get storeOnIpfsApiName() {
    return 'storeOnIpfsApiName';
  }

  get submitToVote() {
    return 'submitToVote';
  }
}

module.exports = new ApiName();
