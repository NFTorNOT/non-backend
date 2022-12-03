const rootPrefix = '..',
gqlSchema = require(rootPrefix + '/helpers/gqlSchema.js'),
clientHelper = require(rootPrefix + '/helpers/apolloClient.js'),
gql = require("graphql-tag");

async function createPostViaDispatcher(postDataCID){
  const client = await clientHelper.getApolloClient();

  return await client.mutate({
   mutation: gql(gqlSchema.CREATE_POST_VIA_DISPATCHER), 
   variables: {
    postDataCID
  },
 });
}

async function getPublicationId(postTxHash) {
  const client = await clientHelper.getApolloClient();

  return await client.query({
    query: gql(gqlSchema.GET_PUBLICATION_ID_BY_TX),
    variables: {
      postTxHash
    },
  });
};

async function getPublicationMetadataStatus(postTxHash) {
  const client = await clientHelper.getApolloClient();

  return await client.query({
    query: gql(gqlSchema.GET_PUBLICATION_METADATA_STATUS),
    variables: {
      postTxHash
    },
  });
};

async function getCommentsData(publicationId) {
  const client = await clientHelper.getApolloClient();

  return await client.query({
    query: gql(gqlSchema.GET_COMMENTS_DATA),
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

async function getUserNameFromId(profileId) {
  const client = await clientHelper.getApolloClient();

  const res = await client.query({
    query: gql(gqlSchema.GET_USERNAME_FROM_ID),
    variables: {
      profileId
    },
  });

  return res.data.profile.handle;
};

module.exports = {createPostViaDispatcher, getPublicationId, getPublicationMetadataStatus, getCommentsData, getUserNameFromId}