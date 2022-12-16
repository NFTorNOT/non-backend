const rootPrefix = '../../..',
  BaseComposer = require(rootPrefix + '/lib/formatter/composer/Base'),
  EntityIntIdListFormatter = require(rootPrefix + '/lib/formatter/strategy/EntityIntIdList'),
  IpfsObjectMapFormatter = require(rootPrefix + '/lib/formatter/strategy/ipfsObject/Map'),
  entityTypeConstants = require(rootPrefix + '/lib/globalConstant/entityType');

// Add your entity type here with entity formatter class name.
const entityClassMapping = {
  [entityTypeConstants.ipfsObjectIds]: EntityIntIdListFormatter,
  [entityTypeConstants.ipfsObjectsMap]: IpfsObjectMapFormatter
};

class CommonFormatterComposer extends BaseComposer {
  /**
   * Entity class mapping
   *
   * @returns {{}}
   */
  static get entityClassMapping() {
    return entityClassMapping;
  }
}

module.exports = CommonFormatterComposer;
