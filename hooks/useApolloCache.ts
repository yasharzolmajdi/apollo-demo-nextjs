import { useApolloClient, DocumentNode } from "@apollo/client";
import _merge from "lodash/merge";

export default function useApolloCache<D, V = undefined>(query: DocumentNode) {
  const client = useApolloClient();

  function updateList(newData: (currentData: D | null) => D, variables?: V) {
    const data = client.readQuery<D>({ query, variables });

    client.writeQuery({
      query,
      data: newData(data),
    });
  }

  return {
    updateList,
  };
}
