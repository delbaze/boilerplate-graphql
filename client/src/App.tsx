import React from "react";
import "./App.css";
import { useQuery } from "@apollo/client";

import { LIST_BOOKS } from "./graphql/book.query";
import DemoLazyQuery from "./components/DemoLazyQuery";
import DemoMutation from "./components/DemoMutation";
import { useBooksQuery } from "./generated";

interface IBook {
  title: string;
}
function App() {
  const { loading, error, data } = useBooksQuery();
  // const { loading, error, data } = useQuery(LIST_BOOKS);

  return (
    <div className="App">
      {loading ? (
        <p>Chargement en cours</p>
      ) : (
        data?.books?.map((b, index: number) => (
          <p key={index}>{b?.title}</p>
        ))
      )}

      <DemoLazyQuery />
      <DemoMutation/>
    </div>
  );
}

export default App;
