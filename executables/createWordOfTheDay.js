const rootPrefix = '..',
 util = require(rootPrefix + '/helpers/util.js'),
 lensHelper = require(rootPrefix + '/helpers/lens.js'),
 { v4: uuidv4 } = require('uuid'),
 nftOrNotContract = require(rootPrefix + '/helpers/nftOrNotContract.js');

class CreateWordOfTheDay {
  constructor() {
    const oThis = this;
    oThis.notionUrl = 'https://plgworks.notion.site/NFT-or-not-61e944ba261f49a2805c73468c92a43a';
    oThis.postText = `Word of the Day #1: Garden
    Start now by submitting your own generations on NFTorNot.com  🪄
    Cast votes on the hottest images 🔥
    See all the submissions in the comments 👇
    New to NFT or Not? Know more about us [here](${oThis.notionUrl})`;
  }

  /*
 * Main performer for create word of the day.
 *
 * @returns {Promise<object>}
 */
 async perform() {
    const oThis = this;
    
    const postMetadata = {
        version: "2.0.0",
        mainContentFocus: "TEXT_ONLY",
        metadata_id: uuidv4(),
        description: "Word of the day post",
        locale: "en-US",
        content:  oThis.postText,
        external_url: null,
        name: "Test Image",
        media: [],
        attributes: [],
        tags: [],
        appId: "NON-Backend",
      };

    const metadataCid = await util.uploadDataToIpfsInfura(postMetadata);
    
    const res = await lensHelper.createPostViaDispatcher(metadataCid);
    console.log('res----->', res)
    let metadataSatus = await lensHelper.getPublicationMetadataStatus(res.data.createPostViaDispatcher.txHash)

    while(metadataSatus.data.publicationMetadataStatus.status != "SUCCESS"){
        metadataSatus = await lensHelper.getPublicationMetadataStatus(res.data.createPostViaDispatcher.txHash)
    }

    const publicationRes = await lensHelper.getPublicationId(res.data.createPostViaDispatcher.txHash);

    const publicationId = publicationRes.data.publication.id;
    console.log('publicationId---->', publicationRes.data.publication.id);

    await nftOrNotContract.setWordOfTheDayPublicationId(Date.now(), publicationId)
    return;
    }
}

const performerObj = new CreateWordOfTheDay();

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
