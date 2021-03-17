import { useCallback } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import useApolloCache from "../../hooks/useApolloCache";
import { ALL_BOOKS_QUERY } from "../index";
import { AllBooks } from "../../interfaces/AllBooks";
import {
  AddBook as AddBookMutation,
  AddBookVariables as AddBookVariablesMutation,
} from "../../interfaces/AddBook";

const NEW_BOOK_MUTATION = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(input: [{ title: $title, author: $author }]) {
      book {
        id
        title
        author
      }
    }
  }
`;

interface FormFields {
  title: string;
  author: string;
}

export default function NewBook() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormFields>();
  const { updateList } = useApolloCache<AllBooks>(ALL_BOOKS_QUERY);
  const [createNewBook] = useMutation<
    AddBookMutation,
    AddBookVariablesMutation
  >(NEW_BOOK_MUTATION);

  const onSubmit = useCallback(async (data: FormFields) => {
    const newBookResult = await createNewBook({
      variables: { ...data },
    });
    const books = newBookResult.data?.addBook;
    if (books) {
      updateList((currentData) => {
        if (!currentData) {
          return { queryBook: [...books.book] };
        }

        return { queryBook: [...currentData.queryBook, ...books.book] };
      });
      router.push(books.book[0].id);
    }
  }, []);

  return (
    <div>
      <h1>New Book</h1>
      <div>
        <Link href="/">
          <button>Back</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            name="title"
            placeholder="Title"
            ref={register({ required: true })}
          />
        </div>
        <div>
          <input
            name="author"
            placeholder="Author"
            ref={register({ required: true })}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
