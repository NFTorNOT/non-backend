const rootPrefix = '../..',
  commonParamErrorConfig = require(rootPrefix + '/config/apiParams/commonParamErrorConfig');

const webSpecificErrorConfig = {
  invalid_image_title_length: {
    parameter: 'title',
    code: 'invalid',
    message: 'Title exceeds character limit of 50 characters.'
  },
  invalid_image_description_length: {
    parameter: 'description',
    code: 'invalid',
    message: 'Description exceeds character limit of 200 characters.'
  },
  invalid_reaction_type: {
    parameter: 'reaction',
    code: 'invalid',
    message: 'Invalid reaction type given.'
  },
  invalid_lens_post_id: {
    parameter: 'lens_post_id',
    code: 'invalid',
    message: 'Invalid lens post id given.'
  }
};

const webErrorConfig = Object.assign({}, commonParamErrorConfig, webSpecificErrorConfig);

module.exports = webErrorConfig;
