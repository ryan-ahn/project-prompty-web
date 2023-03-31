/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPrompt = /* GraphQL */ `
  mutation CreatePrompt(
    $input: CreatePromptInput!
    $condition: ModelPromptConditionInput
  ) {
    createPrompt(input: $input, condition: $condition) {
      id
      prompt
      answer
      list
      category
      createdAt
      updatedAt
    }
  }
`;
export const updatePrompt = /* GraphQL */ `
  mutation UpdatePrompt(
    $input: UpdatePromptInput!
    $condition: ModelPromptConditionInput
  ) {
    updatePrompt(input: $input, condition: $condition) {
      id
      prompt
      answer
      list
      category
      createdAt
      updatedAt
    }
  }
`;
export const deletePrompt = /* GraphQL */ `
  mutation DeletePrompt(
    $input: DeletePromptInput!
    $condition: ModelPromptConditionInput
  ) {
    deletePrompt(input: $input, condition: $condition) {
      id
      prompt
      answer
      list
      category
      createdAt
      updatedAt
    }
  }
`;
