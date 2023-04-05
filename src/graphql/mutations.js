/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPrompts = /* GraphQL */ `
  mutation CreatePrompts(
    $input: CreatePromptsInput!
    $condition: ModelPromptsConditionInput
  ) {
    createPrompts(input: $input, condition: $condition) {
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
export const updatePrompts = /* GraphQL */ `
  mutation UpdatePrompts(
    $input: UpdatePromptsInput!
    $condition: ModelPromptsConditionInput
  ) {
    updatePrompts(input: $input, condition: $condition) {
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
export const deletePrompts = /* GraphQL */ `
  mutation DeletePrompts(
    $input: DeletePromptsInput!
    $condition: ModelPromptsConditionInput
  ) {
    deletePrompts(input: $input, condition: $condition) {
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
