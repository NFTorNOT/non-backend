const rootPrefix = '..',
gqlSchema = require(rootPrefix + '/helpers/gqlSchema.js'),
clientHelper = require(rootPrefix + '/helpers/apolloClient.js'),
gql = require("graphql-tag");

class LensHelper {

async createPostViaDispatcher(postDataCID){
  const client = await clientHelper.getApolloClient();

  return await client.mutate({
   mutation: gql(gqlSchema.postViaDispatcher), 
   variables: {
    postDataCID
  },
 });
}

async getPublicationId(postTxHash) {
  const client = await clientHelper.getApolloClient();

  return await client.query({
    query: gql(gqlSchema.publicationIdByTx),
    variables: {
      postTxHash
    },
  });
};

async getPublicationMetadataStatus(postTxHash) {
  const client = await clientHelper.getApolloClient();

  return await client.query({
    query: gql(gqlSchema.publicationMetadataStatus),
    variables: {
      postTxHash
    },
  });
};

async getCommentsData(publicationId) {
  const client = await clientHelper.getApolloClient();

  return await client.query({
    query: gql(gqlSchema.commentsData),
    variables: {
      request:  {
        commentsOf: publicationId,
        limit: 10
      },
        reactionRequest: null,
        profileId: null
    },
  });
};

async getUserNameFromId(profileId) {
  const client = await clientHelper.getApolloClient();

  const res = await client.query({
    query: gql(gqlSchema.usernameFromId),
    variables: {
      profileId
    },
  });

  return res.data.profile.handle;
};

}

module.exports = new LensHelper()