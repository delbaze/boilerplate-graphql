import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOK } from "../graphql/book.mutation";

function DemoMutation() {
  const [title, setTitle] = useState<string>("");
  const [addBookInDb, { loading }] = useMutation(ADD_BOOK, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", data);
    },
    onError(error) {
      console.log("%c⧭", "color: #917399", error);
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const addBook = () => {
    addBookInDb({
      variables: {
        title,
      },
    });
  };
  return (
    <div>
      <input onChange={handleChange} />
      <button disabled={title.length === 0} onClick={addBook}>
        Ajouter le livre
      </button>
    </div>
  );
}

export default DemoMutation;
