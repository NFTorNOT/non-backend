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

async function getTxHash(postTxId) {
  const client = await clientHelper.getApolloClient();

  return await client.query({
    query: gql(gqlSchema.GET_TXHASH_BY_TXID),
    variables: {
      postTxId
    },
  });
};



module.exports = {createPostViaDispatcher, getPublicationId, getTxHash}