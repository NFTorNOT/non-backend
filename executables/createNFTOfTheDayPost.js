const rootPrefix = '..',
 util = require(rootPrefix + '/helpers/util.js'),
 lensHelper = require(rootPrefix + '/helpers/lens.js'),
 { v4: uuidv4 } = require('uuid');

async function main(){

   const commentsRes = await lensHelper.getCommentsData();
   const commentsArr = commentsRes.data.publications.items;
   const commentwithMostVotes = {
    profileId: '', 
    votes: 0,
    imageCid: '',
    imageType: '',
    imageTitle: ''
   }

   for (let index = 0; index<commentsArr.length; index++){
     const comment = commentsArr[index];
     if(comment.stats.totalUpvotes > commentwithMostVotes.votes){
      commentwithMostVotes.votes = comment.stats.totalUpvotes;
      commentwithMostVotes.profileId = comment.profile.id;
      commentwithMostVotes.imageCid = comment.metadata.image;
      commentwithMostVotes.imageType = comment.metadata.media[0].original.mimeType;
      commentwithMostVotes.imageTitle = comment.metadata.description;
     }
   }

   console.log('commentwithMostVotes----->', commentwithMostVotes);

   const userName = await lensHelper.getUserNameFromId(commentwithMostVotes.profileId);

   const contentText = `NFT for day #1 is ready, and the hottest image, voted by our lens frens is ${commentwithMostVotes.imageTitle} by ${userName} 🔥
   Collect it today and show your support (all the tokens will be going directly to ${userName})`

    const postMetadata = {
        version: "2.0.0",
        mainContentFocus: "IMAGE",
        metadata_id: uuidv4(),
        description: "Description",
        locale: "en-US",
        content: contentText,
        external_url: null,
        image: commentwithMostVotes.imageCid,
        imageMimeType: commentwithMostVotes.imageType,
        name: "NFT Of The Day Image",
        media: [
          {
            item: commentwithMostVotes.imageCid,
            type: commentwithMostVotes.imageType,
          },
        ],
        attributes: [],
        tags: [],
        appId: "NON-Backend",
      };

    const metadataCid = await util.uploadDataToIpfsInfura(postMetadata);
    const res = await lensHelper.createPostViaDispatcher(metadataCid);
    return;
}

main().then(console.log);