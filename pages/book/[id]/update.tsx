import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";

import { BOOK_QUERY } from ".";
import {
  GetBook as BookQuery,
  GetBookVariables as BookQueryVariables,
} from "../../../interfaces/GetBook";

interface FormFields {
  title: string;
  author: string;
}

const DEFAULT_FROM_VALUES: FormFields = {
  title: "",
  author: "",
};

export default function NewBook() {
  const router = useRouter();

  const [getBook, { data, loading }] = useLazyQuery<
    BookQuery,
    BookQueryVariables
  >(BOOK_QUERY);
  const { register, handleSubmit, setValue } = useForm<FormFields>({
    defaultValues: DEFAULT_FROM_VALUES,
  });

  const onSubmit = useCallback(async (data: FormFields) => {}, []);

  useEffect(() => {
    if (!router.query.id) {
      return;
    }

    getBook({ variables: { id: router.query.id as string } });
  }, [router.query.id]);

  useEffect(() => {
    if (!data) {
      return;
    }

    Object.keys(DEFAULT_FROM_VALUES).forEach((key) => {
      const fieldName = key as keyof FormFields;
      setValue(fieldName, data.getBook[fieldName]);
    });
  }, [data]);

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>New Book</h1>
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
