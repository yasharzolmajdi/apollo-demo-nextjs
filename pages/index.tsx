import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

import useApolloCache from "../hooks/useApolloCache";
import { BOOK_QUERY } from "./book/[id]";
import { AllBooks } from "../interfaces/AllBooks";
import { GetBook, GetBookVariables } from "../interfaces/GetBook";

export const ALL_BOOKS_QUERY = gql`
  query AllBooks {
    queryBook {
      id
      title
      author
    }
  }
`;

export default function Home() {
  const { data, loading } = useQuery<AllBooks>(ALL_BOOKS_QUERY);
  const { createGet } = useApolloCache<GetBook, GetBookVariables>(BOOK_QUERY);

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  data.queryBook.forEach((data) => {
    createGet({ getBook: data }, { id: data.id });
  });

  return (
    <div>
      <h1>Books</h1>
      <div>
        <Link href="/book/new">
          <button>+ book</button>
        </Link>
      </div>
      <ul>
        {data.queryBook.map((book) => (
          <li key={book.id}>
            <Link href={`/book/${book.id}`}>
              <a>{book.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
