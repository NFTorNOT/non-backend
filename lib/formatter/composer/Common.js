const rootPrefix = '../../..',
  BaseComposer = require(rootPrefix + '/lib/formatter/composer/Base'),
  EntityIntIdListFormatter = require(rootPrefix + '/lib/formatter/strategy/EntityIntIdList'),
  entityTypeConstants = require(rootPrefix + '/lib/globalConstant/entityType');

// Add your entity type here with entity formatter class name.
const entityClassMapping = {
  // Following entities are for example only,
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
