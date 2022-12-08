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

class ApolloClientHelper {

constructor() {
  const oThis = this;
  oThis.client = null;
}

async getApolloClient(){
const oThis = this;

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: IntrospectionQueryResultData
});

const httpLink = createHttpLink({
  uri: 'https://api-mumbai.lens.dev'
});

oThis.client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

const accessToken = await oThis.getAccessToken();

const authLink = new apolloLink.ApolloLink( (operation, forward) => {
  const token = accessToken;


  operation.setContext({
    headers: {
      "x-access-token": token ? `Bearer ${token}` : "",
    },
  });

  console.log('hi done--->')
  return forward(operation);
});

return new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ fragmentMatcher })
});
}

async getChallengeText(address) {
  const oThis = this;

  return await oThis.client.query({
    query: gql(gqlSchema.challenge),
    variables: {
      request: {
        address,
      },
    },
  });
};

async getAuthentication(address, signature){
  const oThis = this;

  return await oThis.client.mutate({
    mutation: gql(gqlSchema.authentication),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};

async getAccessToken(){
  const oThis = this;

  const ADDRESS = process.env.WALLET_ADDRESS;
  const resp = await oThis.getChallengeText(ADDRESS);
  const challengeText = resp.data.challenge.text;

  const signature =  await util.signMessage(challengeText);

  const authRes = await oThis.getAuthentication(ADDRESS, signature);
  const { accessToken, refreshToken } = authRes.data.authenticate;

  return accessToken;
}
}

module.exports = new ApolloClientHelper();

