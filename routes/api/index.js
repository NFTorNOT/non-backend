const express = require('express');

const rootPrefix = '../..',
  webRoutes = require(rootPrefix + '/routes/api/web/index'),
  apiVersions = require(rootPrefix + '/lib/globalConstant/apiVersions');

const basicHelper = require(rootPrefix + '/helpers/basic'),
  FetchImageFromStabilityAIService = require(rootPrefix + '/services/FetchImageFromStabilityAI'),
  MintNFTService = require(rootPrefix + '/services/MintNFT'),
  words = require(rootPrefix + '/helpers/words.json');

const router = express.Router();

/**
 * Web APIs middleware.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const webApis = function(req, res, next) {
  req.internalDecodedParams.apiVersion = apiVersions.web;
  next();
};

// Web routes.
router.use('/web', webApis, webRoutes);

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
