import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

import { AllBooks } from "../interfaces/AllBooks";

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

  if (loading || !data) {
    return <div>Loading...</div>;
  }

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
