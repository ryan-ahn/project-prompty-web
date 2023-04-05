/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPrompts = /* GraphQL */ `
  query GetPrompts($id: ID!) {
    getPrompts(id: $id) {
      id
      data {
        prompt
        answer
      }
      category
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listPrompts = /* GraphQL */ `
  query ListPrompts(
    $filter: ModelPromptsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrompts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        data {
          prompt
          answer
        }
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPrompts = /* GraphQL */ `
  query SyncPrompts(
    $filter: ModelPromptsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPrompts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        data {
          prompt
          answer
        }
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
