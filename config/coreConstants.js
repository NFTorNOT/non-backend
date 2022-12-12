/* eslint-disable no-process-env */

/**
 * Class for core constants.
 *
 * @class CoreConstants
 */
class CoreConstants {
  get environment() {
    return process.env.NA_ENVIRONMENT;
  }

  get dbSuffix() {
    return process.env.NA_DB_SUFFIX;
  }

  get environmentShort() {
    return process.env.NA_ENVIRONMENT.substring(0, 2);
  }

  // DevOps error logs framework details.
  get APP_NAME() {
    return process.env.NA_DEVOPS_APP_NAME;
  }

  get ENV_IDENTIFIER() {
    return process.env.NA_DEVOPS_ENV_ID;
  }

  get IP_ADDRESS() {
    return process.env.NA_DEVOPS_IP_ADDRESS;
  }

  get WS_SERVER_IDENTIFIER() {
    return process.env.NA_DEVOPS_SERVER_IDENTIFIER;
  }

  get DEFAULT_LOG_LEVEL() {
    return process.env.NA_DEFAULT_LOG_LEVEL;
  }

  get API_DOMAIN() {
    return process.env.NAPI_DOMAIN;
  }

  get A_COOKIE_DOMAIN() {
    return process.env.NA_COOKIE_DOMAIN;
  }

  get A_COOKIE_TOKEN_SECRET() {
    return process.env.NA_COOKIE_TOKEN_SECRET;
  }

  get WEB_COOKIE_SECRET() {
    return process.env.NA_W_COOKIE_SECRET;
  }

  // MySql constants.
  get MYSQL_CONNECTION_POOL_SIZE() {
    return process.env.NA_MYSQL_CONNECTION_POOL_SIZE;
  }

  // Main db
  get MAIN_DB_MYSQL_HOST() {
    return process.env.NA_MAIN_DB_MYSQL_HOST;
  }

  get MAIN_DB_MYSQL_USER() {
    return process.env.NA_MAIN_DB_MYSQL_USER;
  }

  get MAIN_DB_MYSQL_PASSWORD() {
    return process.env.NA_MAIN_DB_MYSQL_PASSWORD;
  }

  get MAIN_DB_MYSQL_HOST_SLAVE() {
    return process.env.NA_MAIN_DB_MYSQL_HOST_SLAVE;
  }

  get MAIN_DB_MYSQL_USER_SLAVE() {
    return process.env.NA_MAIN_DB_MYSQL_USER_SLAVE;
  }

  get MAIN_DB_MYSQL_PASSWORD_SLAVE() {
    return process.env.NA_MAIN_DB_MYSQL_PASSWORD_SLAVE;
  }

  // Config db.
  get CONFIG_DB_MYSQL_HOST() {
    return process.env.NA_CONFIG_DB_MYSQL_HOST;
  }

  get CONFIG_DB_MYSQL_USER() {
    return process.env.NA_CONFIG_DB_MYSQL_USER;
  }

  get CONFIG_DB_MYSQL_PASSWORD() {
    return process.env.NA_CONFIG_DB_MYSQL_PASSWORD;
  }

  // Big db.
  get BIG_DB_MYSQL_HOST() {
    return process.env.NA_BIG_DB_MYSQL_HOST;
  }

  get BIG_DB_MYSQL_USER() {
    return process.env.NA_BIG_DB_MYSQL_USER;
  }

  get BIG_DB_MYSQL_PASSWORD() {
    return process.env.NA_BIG_DB_MYSQL_PASSWORD;
  }

  get CONFIG_STRATEGY_SALT() {
    return process.env.NA_CONFIG_STRATEGY_SALT;
  }

  get ENCRYPTION_KEY() {
    return process.env.NA_ENCRYPTION_KEY;
  }
}

module.exports = new CoreConstants();
