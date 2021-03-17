/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBook
// ====================================================

export interface GetBook_getBook {
  __typename: "Book";
  id: string;
  title: string;
  author: string;
}

export interface GetBook {
  getBook: GetBook_getBook;
}

export interface GetBookVariables {
  id: string;
}
