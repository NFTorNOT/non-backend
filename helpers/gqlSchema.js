class GqlSchema {

get challenge() {
  return `query($request: ChallengeRequest!) {
    challenge(request: $request) {
          text
      }
    }
  `;
}

get authentication() {
  return `mutation($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
  `;
}

get postViaDispatcher() {
  return `mutation CreatePostViaDispatcher($postDataCID: Url!) {
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
  }`;
}

get publicationIdByTx() {
  return `query GetPublication($postTxHash: TxHash){
    publication(request:{txHash: $postTxHash}){
      ... on Post{
        id
      }
    }
  }`;
}

get publicationMetadataStatus() {
  return `query newPublicationMetadataStatus($postTxHash: TxHash) {
    publicationMetadataStatus(request: { txHash: $postTxHash}) {
      status
      reason
    }
  }`;
}

get commentsData() {
  return  `query CommentFeed($request: PublicationsQueryRequest!, $reactionRequest: ReactionFieldResolverRequest, $profileId: ProfileId)  {
    publications(request: $request) {
      items {
        ... on Comment {
          ...CommentFields
          __typename
        }
        __typename
      }
      pageInfo {
        totalCount
        next
        __typename
      }
      __typename
    }
  }
  
  fragment CommentFields on Comment {
    id
    profile {
      ...ProfileFields
      __typename
    }
    reaction(request: $reactionRequest)
    mirrors(by: $profileId)
    canComment(profileId: $profileId) {
      result
      __typename
    }
    canMirror(profileId: $profileId) {
      result
      __typename
    }
    hasCollectedByMe
    collectedBy {
      address
      defaultProfile {
        ...ProfileFields
        __typename
      }
      __typename
    }
    collectModule {
      ...CollectModuleFields
      __typename
    }
    stats {
      ...StatsFields
      __typename
    }
    metadata {
      ...MetadataFields
      __typename
    }
    hidden
    createdAt
    appId
    commentOn {
      ... on Post {
        ...PostFields
        __typename
      }
      ... on Comment {
        id
        profile {
          ...ProfileFields
          __typename
        }
        reaction(request: $reactionRequest)
        mirrors(by: $profileId)
        canComment(profileId: $profileId) {
          result
          __typename
        }
        canMirror(profileId: $profileId) {
          result
          __typename
        }
        hasCollectedByMe
        collectedBy {
          address
          defaultProfile {
            handle
            __typename
          }
          __typename
        }
        collectModule {
          ...CollectModuleFields
          __typename
        }
        metadata {
          ...MetadataFields
          __typename
        }
        stats {
          ...StatsFields
          __typename
        }
        mainPost {
          ... on Post {
            ...PostFields
            __typename
          }
          ... on Mirror {
            ...MirrorFields
            __typename
          }
          __typename
        }
        hidden
        createdAt
        __typename
      }
      ... on Mirror {
        ...MirrorFields
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment ProfileFields on Profile {
    id
    name
    handle
    bio
    ownedBy
    isFollowedByMe
    stats {
      totalFollowers
      totalFollowing
      __typename
    }
    attributes {
      key
      value
      __typename
    }
    picture {
      ... on MediaSet {
        original {
          url
          __typename
        }
        __typename
      }
      ... on NftImage {
        uri
        __typename
      }
      __typename
    }
    followModule {
      __typename
    }
    __typename
  }
  
  fragment CollectModuleFields on CollectModule {
    ... on FreeCollectModuleSettings {
      type
      contractAddress
      followerOnly
      __typename
    }
    ... on FeeCollectModuleSettings {
      type
      referralFee
      contractAddress
      followerOnly
      amount {
        asset {
          symbol
          decimals
          address
          __typename
        }
        value
        __typename
      }
      __typename
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      collectLimit
      referralFee
      contractAddress
      followerOnly
      amount {
        asset {
          symbol
          decimals
          address
          __typename
        }
        value
        __typename
      }
      __typename
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      collectLimit
      endTimestamp
      referralFee
      contractAddress
      followerOnly
      amount {
        asset {
          symbol
          decimals
          address
          __typename
        }
        value
        __typename
      }
      __typename
    }
    ... on TimedFeeCollectModuleSettings {
      type
      endTimestamp
      referralFee
      contractAddress
      followerOnly
      amount {
        asset {
          symbol
          decimals
          address
          __typename
        }
        value
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment StatsFields on PublicationStats {
    totalUpvotes
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
    __typename
  }
  
  fragment MetadataFields on MetadataOutput {
    name
    description
    content
    image
    attributes {
      traitType
      value
      __typename
    }
    cover {
      original {
        url
        __typename
      }
      __typename
    }
    media {
      original {
        url
        mimeType
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
      __typename
    }
    reaction(request: $reactionRequest)
    mirrors(by: $profileId)
    canComment(profileId: $profileId) {
      result
      __typename
    }
    canMirror(profileId: $profileId) {
      result
      __typename
    }
    hasCollectedByMe
    collectedBy {
      address
      defaultProfile {
        ...ProfileFields
        __typename
      }
      __typename
    }
    collectModule {
      ...CollectModuleFields
      __typename
    }
    stats {
      ...StatsFields
      __typename
    }
    metadata {
      ...MetadataFields
      __typename
    }
    hidden
    createdAt
    appId
    __typename
  }
  
  fragment MirrorFields on Mirror {
    id
    profile {
      ...ProfileFields
      __typename
    }
    reaction(request: $reactionRequest)
    canComment(profileId: $profileId) {
      result
      __typename
    }
    canMirror(profileId: $profileId) {
      result
      __typename
    }
    collectModule {
      ...CollectModuleFields
      __typename
    }
    stats {
      ...StatsFields
      __typename
    }
    metadata {
      ...MetadataFields
      __typename
    }
    hidden
    mirrorOf {
      ... on Post {
        ...PostFields
        __typename
      }
      ... on Comment {
        id
        profile {
          ...ProfileFields
          __typename
        }
        reaction(request: $reactionRequest)
        mirrors(by: $profileId)
        canComment(profileId: $profileId) {
          result
          __typename
        }
        canMirror(profileId: $profileId) {
          result
          __typename
        }
        stats {
          ...StatsFields
          __typename
        }
        createdAt
        __typename
      }
      __typename
    }
    createdAt
    appId
    __typename
  }`;
}

get usernameFromId() {
  return `query Profile($profileId: ProfileId) {
    profile(request: { profileId: $profileId}) {
      handle
    }
  }`;  
}

}
module.exports = new GqlSchema();