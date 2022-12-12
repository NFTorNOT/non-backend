const express = require('express'),
  cookieParser = require('cookie-parser'),
  router = express.Router();

const rootPrefix = '../../..',
  FormatterComposerFactory = require(rootPrefix + '/lib/formatter/composer/Factory'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  apiSourceConstants = require(rootPrefix + '/lib/globalConstant/apiSource'),
  apiVersions = require(rootPrefix + '/lib/globalConstant/apiVersions'),
  routeHelper = require(rootPrefix + '/routes/helper'),
  apiNameConstants = require(rootPrefix + '/lib/globalConstant/apiName'),
  webResponse = require(rootPrefix + '/config/apiParams/web/response');

const FormatterComposer = FormatterComposerFactory.getComposer(apiVersions.web);

/**
 * Set api_source in internal decoded params
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const setWebApiSourceInternalParam = function(req, res, next) {
  req.internalDecodedParams.api_source = apiSourceConstants.web;
  next();
};

// Node.js cookie parsing middleware.
router.use(cookieParser(coreConstants.WEB_COOKIE_SECRET));

// Set internal params
router.use(setWebApiSourceInternalParam);

module.exports = router;
