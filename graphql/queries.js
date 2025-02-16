/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecipe = /* GraphQL */ `
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
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
export const listRecipes = /* GraphQL */ `
  query ListRecipes(
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
