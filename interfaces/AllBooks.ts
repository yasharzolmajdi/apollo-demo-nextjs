/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllBooks
// ====================================================

export interface AllBooks_queryBook {
  __typename: "Book";
  id: string;
  title: string;
  author: string;
}

export interface AllBooks {
  queryBook: AllBooks_queryBook[];
}
