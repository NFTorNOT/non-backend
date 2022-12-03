const GET_CHALLENGE = `query($request: ChallengeRequest!) {
  challenge(request: $request) {
        text
    }
  }
`;

const AUTHENTICATION = `
mutation($request: SignedAuthChallenge!) {
  authenticate(request: $request) {
    accessToken
    refreshToken
  }
}
`;

const CREATE_POST_VIA_DISPATCHER = `mutation CreatePostViaDispatcher($postDataCID: Url!) {
  createPostViaDispatcher(
    request: {
      profileId: "${process.env.PROFILE_ID}"
      contentURI: $postDataCID
      collectModule: { freeCollectModule: { followerOnly: true } }
      referenceModule: { followerOnlyReferenceModule: false }
    }
  ) {
    ... on RelayerResult {
      txHash
      txId
    }
    ... on RelayError {
      reason
    }
  }
}`

const GET_PUBLICATION_ID_BY_TX = `query GetPublication($postTxHash: TxHash){
  publication(request:{txHash: $postTxHash}){
    ... on Post{
      id
    }
  }
}`

const GET_TXHASH_BY_TXID = `query GetTxHash($postTxId: TxHash){
  txIdToTxHash(txId: postTxId){
  }
}`



module.exports = {GET_CHALLENGE, AUTHENTICATION, CREATE_POST_VIA_DISPATCHER, GET_PUBLICATION_ID_BY_TX, GET_TXHASH_BY_TXID}