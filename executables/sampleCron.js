const rootPrefix = '..';

class SampleCron {

  constructor() {
    const oThis = this;
  }

    /**
   * Main performer for create nft of the day.
   *
   * @returns {Promise<object>}
   */
     async perform() {
      const oThis = this;

      console.log('I am ready');
      oThis.sleep(1000)
      console.log('I am ready');
      oThis.sleep(1000)
      console.log('I am ready');
      oThis.sleep(1000)
      console.log('I am ready');
      oThis.sleep(1000)
      console.log('I am ready');
      oThis.sleep(1000)

     }

  /**
   * Sleep for particular time.
   *
   * @param {number} ms: time in ms
   *
   * @returns {Promise<any>}
   */
  sleep(ms) {
    // eslint-disable-next-line no-console
    console.log(`Sleeping for ${ms} ms.`);

    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
  }
}

const performerObj = new SampleCron();

performerObj
  .perform()
  .then(function() {
    console.log('** Exiting process');
    console.log('Cron last run at: ', Date.now());
    process.emit('SIGINT');
  })
  .catch(function(err) {
    console.error('** Exiting process due to Error: ', err);
    process.emit('SIGINT');
  });