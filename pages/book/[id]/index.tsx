import { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  GetBook as BookQuery,
  GetBookVariables as BookQueryVariables,
} from "../../../interfaces/GetBook";

export const BOOK_QUERY = gql`
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      title
      author
    }
  }
`;

export default function Book() {
  const router = useRouter();
  const [getBook, { data, loading }] = useLazyQuery<
    BookQuery,
    BookQueryVariables
  >(BOOK_QUERY, {
    variables: { id: router.query.id as string },
  });

  useEffect(() => {
    if (!router.query.id) {
      return;
    }

    getBook({ variables: { id: router.query.id as string } });
  }, [router.query.id]);

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Book</h1>
      <div>
        <Link href="/">
          <button>Back</button>
        </Link>
      </div>
      <div>
        <Link href={`/book/${router.query.id}/update`}>
          <button>Update</button>
        </Link>
      </div>
      <ul>
        {Object.entries(data.getBook).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
