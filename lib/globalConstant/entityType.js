/**
 * Class for entity types.
 *
 * @class EntityType
 */
class EntityType {
  get ipfsObjectIds() {
    return 'ipfsObjectIds';
  }

  get ipfsObjectsMap() {
    return 'ipfsObjectsMap';
  }

  get imagesMap() {
    return 'imagesMap';
  }

  get textsMap() {
    return 'textsMap';
  }

  get themesMap() {
    return 'themesMap';
  }

  get usersMap() {
    return 'usersMap';
  }

  get lensPostsIds() {
    return 'lensPostsIds';
  }

  get lensPostsMap() {
    return 'lensPostsMap';
  }

  get getNFTsToVoteListMeta() {
    return 'getNFTsToVoteListMeta';
  }

  get suggestionsMap() {
    return 'suggestionsMap';
  }

  get suggestionIds() {
    return 'suggestionIds';
  }

  get currentUser() {
    return 'currentUser';
  }
}

module.exports = new EntityType();
