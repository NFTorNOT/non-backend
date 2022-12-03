const rootPrefix = '..',
 util = require(rootPrefix + '/helpers/util.js'),
 lensHelper = require(rootPrefix + '/helpers/lens.js'),
 { v4: uuidv4 } = require('uuid');

async function main(){

    const NONLink = '';
    const postText = `Word of the Day #1: Garden
    Start now by submitting your own generations on NFTorNot.com  🪄
    Cast votes on the hottest images 🔥
    See all the submissions in the comments 👇
    New to NFT or Not? Know more about us here`;
    
    const postMetadata = {
        version: "2.0.0",
        mainContentFocus: "TEXT_ONLY",
        metadata_id: uuidv4(),
        description: "Word of the day post",
        locale: "en-US",
        content: postText,
        external_url: null,
        name: "Test Image",
        media: [],
        attributes: [],
        tags: [],
        appId: "NON-Backend",
      };

    const metadataCid = await util.uploadDataToIpfsInfura(postMetadata);
    console.log('metadataCid--->', metadataCid);
    
    const res = await lensHelper.createPostViaDispatcher(metadataCid);
    // console.log('publication res----->', res)
    // console.log('res.data.createPostViaDispatcher.txId---->', res.data.createPostViaDispatcher.txId);


    // const txHashRes = await lensHelper.getTxHash(res.data.createPostViaDispatcher.txId);
    // console.log('publicationId---->', txHashRes.data.txIdToTxHash);

    // const publicationRes = await lensHelper.getPublicationId(txHashRes.data.txIdToTxHash);
    // console.log('publicationId---->', publicationRes.data.publication.id);

    return;
}

main().then(console.log);