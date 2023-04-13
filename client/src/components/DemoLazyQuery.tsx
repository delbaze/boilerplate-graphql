import { useLazyQuery } from "@apollo/client";
import { LIST_BOOKS } from "../graphql/book.query";
import { useEffect } from "react";

function DemoLazyQuery() {
  const [getList, { loading, error }] = useLazyQuery(LIST_BOOKS, {
    onCompleted(data) {
      console.log("%c⧭", "color: #733d00", data);
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleClick = () => {
    getList();
  };
  return (
    <div>
      <button onClick={handleClick}>Récupérer les livres sur demande</button>
    </div>
  );
}

export default DemoLazyQuery;
