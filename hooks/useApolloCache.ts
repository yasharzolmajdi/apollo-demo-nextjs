import { useApolloClient, DocumentNode } from "@apollo/client";
import _merge from "lodash/merge";

export default function useApolloCache<D, V = undefined>(query: DocumentNode) {
  const client = useApolloClient();

  function updateList(newData: (currentData: D | null) => D, variables?: V) {
    const data = client.readQuery<D>({ query, variables });

    createGet(newData(data), variables);
  }

  function createGet(data: D, variables?: V) {
    client.writeQuery({
      query,
      variables,
      data,
    });
  }

  return {
    updateList,
    createGet,
  };
}
