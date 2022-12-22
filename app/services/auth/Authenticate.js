const { ethers } = require('ethers');

const rootPrefix = '../../..';
const ServiceBase = require(rootPrefix + '/app/services/Base'),
  ImageModel = require(rootPrefix + '/app/models/mysql/main/Image'),
  UserModel = require(rootPrefix + '/app/models/mysql/main/User'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  imageConstants = require(rootPrefix + '/lib/globalConstant/entity/image'),
  userConstants = require(rootPrefix + '/lib/globalConstant/entity/user'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  VerifyLensSignerAddress = require(rootPrefix + '/lib/auth/VerifyLensSignerAddress'),
  localCipher = require(rootPrefix + '/lib/encryptors/localCipher');

/**
 * Class to authenticate user.
 *
 * @class Authenticate
 */
class Authenticate extends ServiceBase {
  /**
   * Constructor of Authenticate.
   *
   * @param {object} params
   * @param {string} params.message
   * @param {number} params.signed_message
   * @param {string} params.wallet_address
   * @param {string} params.lens_profile_username
   * @param {number} params.lens_profile_id
   * @param {number} params.lens_profile_display_name
   * @param {number} params.lens_profile_image_url
   * @constructor
   */
  constructor(params) {
    super(params);
    const oThis = this;

    oThis.message = params.message;
    oThis.signedMessage = params.signed_message;
    oThis.walletAddress = params.wallet_address;
    oThis.lensProfileUsername = params.lens_profile_username;
    oThis.lensProfileId = params.lens_profile_id;
    oThis.lensProfileDisplayName = params.lens_profile_display_name;
    oThis.lensProfileImageUrl = params.lens_profile_image_url;

    oThis.profileImageId = null;
    oThis.currentUser = null;
  }

  async _asyncPerform() {
    const oThis = this;

    await oThis._validateParams();

    await oThis._validateUser();

    await oThis._createOrFetchCurrentUser();

    return oThis._prepareResponse();
  }

  /**
   * Validate params.
   *
   * @private
   */
  async _validateParams() {
    const oThis = this;
    console.log('------_validateParams-------');

    if (!ethers.utils.isAddress(oThis.walletAddress)) {
      return Promise.reject(
        responseHelper.paramValidationError({
          internal_error_identifier: 'a_s_g_stv_vp_1',
          api_error_identifier: 'invalid_api_params',
          params_error_identifiers: ['invalid_wallet_address'],
          debug_options: {
            walletAddress: oThis.walletAddress
          }
        })
      );
    }

    console.log('------_validateParams success-------');
  }

  /**
   * Validate user.
   *
   * @private
   */
  async _validateUser() {
    console.log('------_validateUser-------');
    const oThis = this;
    await new VerifyLensSignerAddress(oThis.message, oThis.signedMessage, oThis.walletAddress).perform();
    console.log('------_validateUser success-------');
  }

  /**
   * Fetch the user or create a new user if not present.
   *
   * @private
   */
  async _createOrFetchCurrentUser() {
    console.log('------_createOrFetchCurrentUser -------');
    const oThis = this;

    const user = await new UserModel().fetchActiveUserByLensProfileIdAndWalletAddress(
      oThis.lensProfileId,
      oThis.walletAddress
    );

    console.log('------_createOrFetchCurrentUser user -------');
    console.log(user);

    if (user) {
      oThis.currentUser = user;
    } else {
      await oThis._createUser();
    }
  }

  /**
   * Create a new user.
   *
   * @private
   */
  async _createUser() {
    const oThis = this;

    console.log('------_createUser -------');

    const salt = coreConstants.API_COOKIE_ENCRYPTION_SALT;
    console.log('------_createUser salt-------', salt);
    const decryptedEncryptionSalt = localCipher.decrypt(coreConstants.ENCRYPTION_KEY, salt);
    console.log('------_createUser decryptedEncryptionSalt-------', decryptedEncryptionSalt);
    const cookieToken = localCipher.generateRandomIv(32),
      encryptedCookieToken = localCipher.encrypt(decryptedEncryptionSalt, cookieToken);
    console.log('------_createUser cookieToken-------', cookieToken);
    if (oThis.lensProfileImageUrl) {
      await oThis._createImage();
    }
    const qryResponse = await new UserModel().insertUser({
      lensProfileId: oThis.lensProfileId,
      lensProfileOwnerAddress: oThis.walletAddress,
      lensProfileUsername: oThis.lensProfileUsername,
      lensProfileDisplayName: oThis.lensProfileDisplayName,
      lensProfileImageId: oThis.profileImageId,
      cookieToken: encryptedCookieToken,
      status: userConstants.activeStatus
    });

    oThis.currentUser = {
      id: qryResponse.insertId,
      lensProfileId: oThis.lensProfileId,
      lensProfileOwnerAddress: oThis.walletAddress,
      lensProfileUsername: oThis.lensProfileUsername,
      lensProfileDisplayName: oThis.lensProfileDisplayName,
      lensProfileImageId: oThis.profileImageId,
      cookieToken: encryptedCookieToken,
      status: userConstants.activeStatus
    };
    console.log('------_createUser oThis.currentUser-------', oThis.currentUser);
  }

  /**
   * Create image entity for the user profile image.
   *
   * @private
   */
  async _createImage() {
    const oThis = this;

    const profileImage = await new ImageModel().insertImage({
      urlTemplate: oThis.lensProfileImageUrl,
      kind: imageConstants.profileImageKind
    });

    oThis.profileImageId = profileImage.insertId;
  }

  /**
   * Prepare response.
   *
   * @returns {Promise<*|result>}
   * @private
   */
  async _prepareResponse() {
    const oThis = this;
    console.log('------_prepareResponse -------');
    const salt = coreConstants.API_COOKIE_ENCRYPTION_SALT;
    console.log('------_prepareResponse salt-------', salt);
    const decryptedEncryptionSalt = localCipher.decrypt(coreConstants.ENCRYPTION_KEY, salt);
    console.log('------_prepareResponse decryptedEncryptionSalt-------', decryptedEncryptionSalt);

    const userLoginCookieValue = new UserModel().getCookieValue(oThis.currentUser, decryptedEncryptionSalt, {
      timestamp: Date.now() / 1000
    });
    console.log('------_prepareResponse userLoginCookieValue-------', { userLoginCookieValue });
    console.log('------_prepareResponse response-------', {
      response: responseHelper.successWithData({
        userLoginCookieValue: userLoginCookieValue,
        userId: oThis.currentUser.id
      })
    });

    return responseHelper.successWithData({
      userLoginCookieValue: userLoginCookieValue,
      userId: oThis.currentUser.id
    });
  }
}

module.exports = Authenticate;
