/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe($owner: String!) {
    onCreateRecipe(owner: $owner) {
      id
      name
      description
      category
      ingredients {
        recipeid
        name
        amount
      }
      instructions {
        recipeid
        step
        description
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe($owner: String!) {
    onUpdateRecipe(owner: $owner) {
      id
      name
      description
      category
      ingredients {
        recipeid
        name
        amount
      }
      instructions {
        recipeid
        step
        description
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe($owner: String!) {
    onDeleteRecipe(owner: $owner) {
      id
      name
      description
      category
      ingredients {
        recipeid
        name
        amount
      }
      instructions {
        recipeid
        step
        description
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
