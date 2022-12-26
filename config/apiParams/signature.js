const rootPrefix = '../..',
  apiNameConstants = require(rootPrefix + '/lib/globalConstant/apiName'),
  paginationConstants = require(rootPrefix + '/lib/globalConstant/pagination');

/*
   Example of mandatory param config:
    {
        parameter: 'api_source',
        validatorMethods: [{ validateString: null }],
        kind: 'internal',
        missingKeyError: null,
        type: 'string'
      }
 */

/*
   Example of optional param config:
    {
        parameter: 'api_source',
        validatorMethods: [{ validateString: null }],
        kind: 'internal',
        type: 'string'
      }
 */

const webSignature = {
  [apiNameConstants.storeOnIpfsApiName]: {
    mandatory: [
      {
        parameter: 'image_url',
        validatorMethods: [{ validateNonBlankString: null }],
        type: 'string'
      },
      {
        parameter: 'title',
        validatorMethods: [{ validateNonBlankString: null }],
        type: 'string'
      },
      {
        parameter: 'description',
        validatorMethods: [{ validateNonBlankString: null }],
        type: 'string'
      }
    ],
    optional: []
  },

  [apiNameConstants.addReactionToNFT]: {
    mandatory: [
      {
        parameter: 'lens_post_id',
        validatorMethods: [{ validateInteger: null }],
        type: 'number'
      },
      {
        parameter: 'reaction',
        validatorMethods: [{ validateNonBlankString: null }],
        type: 'string'
      },
      {
        parameter: 'current_user_id',
        validatorMethods: [{ validateInteger: null }],
        type: 'number',
        kind: 'internal'
      }
    ]
  },

  [apiNameConstants.getNftsToVoteApiName]: {
    mandatory: [],
    optional: [
      {
        parameter: paginationConstants.paginationIdentifierKey, // Pagination identifier.
        validatorMethods: [{ validateString: null }, { validatePaginationIdentifier: null }],
        type: 'string'
      }
    ]
  },

  [apiNameConstants.getNftsToCollect]: {
    mandatory: [
      // Todo : Vindeep/Dhruv uncomment this after auth flow
      // {
      //   parameter: 'current_user',
      //   validatorMethods: [{ validateNonEmptyObject: null }],
      //   type: 'object',
      //   kind: 'internal'
      // }
    ],
    optional: [
      {
        parameter: paginationConstants.paginationIdentifierKey, // Pagination identifier.
        validatorMethods: [{ validateString: null }, { validatePaginationIdentifier: null }],
        type: 'string'
      }
    ]
  },

  [apiNameConstants.getNftsForHallOfFlame]: {
    mandatory: [
      // Todo : Vindeep/Dhruv uncomment this after auth flow
      // {
      //   parameter: 'current_user',
      //   validatorMethods: [{ validateNonEmptyObject: null }],
      //   type: 'object',
      //   kind: 'internal'
      // }
    ],
    optional: [
      {
        parameter: paginationConstants.paginationIdentifierKey, // Pagination identifier.
        validatorMethods: [{ validateString: null }, { validatePaginationIdentifier: null }],
        type: 'string'
      }
    ]
  },

  [apiNameConstants.getImageSuggestions]: {
    mandatory: [
      {
        parameter: 'prompt',

        validatorMethods: [{ validateNonBlankString: null }],
        type: 'string'
      },
      {
        parameter: 'art_style',
        validatorMethods: [{ validateNonBlankString: null }],
        type: 'string'
      }
    ],
    optional: []
  },
  [apiNameConstants.submitToVote]: {
    mandatory: [
      {
        parameter: 'theme_name',
        validatorMethods: [{ validateNonBlankString: null }],
        type: 'string'
      },
      {
        parameter: 'image_url',
        validatorMethods: [{ validateNonBlankString: null }],
        type: 'string'
      },
      {
        parameter: 'current_user_id',
        validatorMethods: [{ validateInteger: null }],
        type: 'number',
        kind: 'internal'
      },
      {
        parameter: 'title',
        validatorMethods: [{ validateNonBlankString: null }],
        type: 'string'
      },
      {
        parameter: 'lens_publication_id',
        validatorMethods: [{ validateNonBlankString: null }],
        type: 'string'
      },
      {
        parameter: 'description',
        validatorMethods: [{ validateNonBlankString: null }],
        type: 'string'
      },
      {
        parameter: 'lens_metadata_ipfs_object_id',
        validatorMethods: [{ validateInteger: null }],
        type: 'number'
      },
      {
        parameter: 'image_ipfs_object_id',
        validatorMethods: [{ validateInteger: null }],
        type: 'number'
      }
    ]
  }
};
module.exports = webSignature;
