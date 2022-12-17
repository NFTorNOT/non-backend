const express = require('express'),
  cookieParser = require('cookie-parser');

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  FormatterComposerFactory = require(rootPrefix + '/lib/formatter/composer/Factory'),
  FetchImageFromStabilityAIService = require(rootPrefix + '/services/FetchImageFromStabilityAI'),
  MintNFTService = require(rootPrefix + '/services/MintNFT'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  apiNameConstants = require(rootPrefix + '/lib/globalConstant/apiName'),
  routeHelper = require(rootPrefix + '/routes/helper'),
  responseConfig = require(rootPrefix + '/config/apiParams/response'),
  words = require(rootPrefix + '/helpers/words.json');

const router = express.Router();

const FormatterComposer = FormatterComposerFactory.getComposer();

// Node.js cookie parsing middleware.
router.use(cookieParser(coreConstants.WEB_COOKIE_SECRET));

/* To store data on ipfs */
router.post('/store-on-ipfs', sanitizer.sanitizeDynamicUrlParams, function(req, res, next) {
  const apiName = apiNameConstants.storeOnIpfsApiName;
  req.internalDecodedParams.apiName = apiName;

  const dataFormatterFunc = async function(serviceResponse) {
    const formatterParams = Object.assign({}, responseConfig[apiName], { serviceData: serviceResponse.data });
    formatterParams.entityKindToResponseKeyMap = Object.assign({}, formatterParams.entityKindToResponseKeyMap);
    const wrapperFormatterRsp = await new FormatterComposer(formatterParams).perform();

    serviceResponse.data = wrapperFormatterRsp.data;
  };

  Promise.resolve(
    routeHelper.perform(req, res, next, '/app/services/StoreNFTDataInIPFS', 'r_a_i_1', null, dataFormatterFunc)
  );
});

router.post('/fetch-stable-diffusion-image', async function(req, res, next) {
  try {
    const prompt = req.body.prompt,
      artStyle = req.body.art_style;
    const response = await new FetchImageFromStabilityAIService({
      prompt: prompt,
      artStyle: artStyle
    }).perform();
    let status = true;
    if (!basicHelper.isEmptyObject(response.error)) {
      status = false;
    }

    return res.status(200).json({ success: status, data: response });
  } catch (err) {
    console.error('error ---------', err);

    return res.status(200).json({ success: false, err: { msg: 'something went wrong' } });
  }
});

router.post('/mint-nft', async function(req, res, next) {
  try {
    const receiverAddress = req.body.receiver_address,
      imageUrl = req.body.image_url,
      description = req.body.description;

    const response = await new MintNFTService({
      receiverAddress: receiverAddress,
      imageUrl: imageUrl,
      description: description
    }).perform();

    let status = true;
    if (response.error != null) {
      status = false;
    }

    return res.status(200).json({ success: status, data: response });
  } catch (error) {
    console.error('error ---------', error);

    return res.status(200).json({
      success: false,
      err: { msg: 'something went wrong', err_data: error }
    });
  }
});

router.get('/get-word-of-the-day', function(req, res, next) {
  return res.status(200).json({
    success: true,
    data: words
  });
});

module.exports = router;