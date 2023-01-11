import { useState } from "react";

interface SearchProps {
  doSearch(term: string): void;
}

export function Search({ doSearch }: SearchProps) {
  const [term, setTerm] = useState("");

  function submitHandler(event: any) {
    event.preventDefault();
    doSearch(term);
  }

  return (
    <form
      onSubmit={submitHandler}
      name="search-form"
      className="relative mt-6 max-w-lg mx-auto"
    >
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </span>

      <input
        className="w-full border rounded-md pl-10 pr-4 py-2 
              focus:border-blue-500 focus:outline-none focus:shadow-outline"
        type="search"
        placeholder="Search"
        value={term}
        onChange={(ev) => setTerm(ev.target.value)}
      />
    </form>
  );
}
