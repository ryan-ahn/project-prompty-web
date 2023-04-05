/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePrompts = /* GraphQL */ `
  subscription OnCreatePrompts($filter: ModelSubscriptionPromptsFilterInput) {
    onCreatePrompts(filter: $filter) {
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
export const onUpdatePrompts = /* GraphQL */ `
  subscription OnUpdatePrompts($filter: ModelSubscriptionPromptsFilterInput) {
    onUpdatePrompts(filter: $filter) {
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
export const onDeletePrompts = /* GraphQL */ `
  subscription OnDeletePrompts($filter: ModelSubscriptionPromptsFilterInput) {
    onDeletePrompts(filter: $filter) {
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
