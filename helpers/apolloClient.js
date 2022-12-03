const rootPrefix = '..',
  ApolloClient = require("apollo-client").ApolloClient,
  apolloLink = require("apollo-link"),
  createHttpLink = require("apollo-link-http").createHttpLink,
  InMemoryCache = require("apollo-cache-inmemory").InMemoryCache,
  IntrospectionFragmentMatcher = require("apollo-cache-inmemory").IntrospectionFragmentMatcher,
  gql = require("graphql-tag"),
  IntrospectionQueryResultData = require(rootPrefix + '/helpers/fragmentTypes.json'),
  gqlSchema = require(rootPrefix + '/helpers/gqlSchema.js'),
  util = require(rootPrefix + '/helpers/util.js');

let client = null;

async function getApolloClient(){
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: IntrospectionQueryResultData
});

const httpLink = createHttpLink({
  uri: 'https://api-mumbai.lens.dev'
});

client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

const accessToken = await getAccessToken();

const authLink = new apolloLink.ApolloLink( (operation, forward) => {
  const token = accessToken;


  operation.setContext({
    headers: {
      "x-access-token": token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

return new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ fragmentMatcher })
});
}

async function getChallengeText(address) {
  return await client.query({
    query: gql(gqlSchema.GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
};

async function getAuthentication(address, signature){
  return await client.mutate({
    mutation: gql(gqlSchema.AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};

async function getAccessToken(){
  const ADDRESS = process.env.WALLET_ADDRESS;
  const resp = await getChallengeText(ADDRESS);
  const challengeText = resp.data.challenge.text;

  const signature =  await util.signMessage(challengeText);

  const authRes = await getAuthentication(ADDRESS, signature);
  const { accessToken, refreshToken } = authRes.data.authenticate;

  return accessToken;
}


module.exports = {getApolloClient};

