export function Search() {
  return (
    <div data-testid="test" className="relative mt-6 max-w-lg mx-auto">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
          <path></path>
        </svg>
      </span>

      <input
        className="w-full border rounded-md pl-10 pr-4 py-2 
              focus:border-blue-500 focus:outline-none"
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
