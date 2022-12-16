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
}

module.exports = new EntityType();
