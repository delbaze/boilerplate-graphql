import { useBooksQuery } from "../generated";

function BooksList() {
  const { data } = useBooksQuery();
  return (
    <div>
      BooksList
      <ul>
        {data?.books?.map((b, index: number) => (
          <li key={b?.id}>
            <p key={index}>{b?.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksList;
