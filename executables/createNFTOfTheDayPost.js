const rootPrefix = '..',
 util = require(rootPrefix + '/helpers/util.js'),
 lensHelper = require(rootPrefix + '/helpers/lens.js'),
 { v4: uuidv4 } = require('uuid');

async function main(){

    const imageCid = "ipfs://bafkreihnxxeyqgujhvab6wijomenrrdfzfocqqxnrgb4a43zyywgjtvmly";

    const postMetadata = {
        version: "2.0.0",
        mainContentFocus: "IMAGE",
        metadata_id: uuidv4(),
        description: "Description",
        locale: "en-US",
        content: "02-12-2022 NFT of the day",
        external_url: null,
        image: imageCid,
        imageMimeType: 'image/jpeg',
        name: "Test Image",
        media: [
          {
            item: imageCid,
            type: 'image/jpeg',
          },
        ],
        attributes: [],
        tags: [],
        appId: "NON-Backend",
      };

    const metadataCid = await util.uploadDataToIpfsInfura(postMetadata);
    console.log('metadataCid--->', metadataCid);

    const res = await lensHelper.createPostViaDispatcher(metadataCid);
    console.log('res----->', res)
    return;
}

main().then(console.log);