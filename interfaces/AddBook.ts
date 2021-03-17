/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddBook
// ====================================================

export interface AddBook_addBook_book {
  __typename: "Book";
  id: string;
  title: string;
  author: string;
}

export interface AddBook_addBook {
  __typename: "AddBookPayload";
  book: AddBook_addBook_book[];
}

export interface AddBook {
  addBook: AddBook_addBook;
}

export interface AddBookVariables {
  title: string;
  author: string;
}
