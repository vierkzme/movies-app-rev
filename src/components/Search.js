import { useState } from "react";

export default function Search({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center space-x-2 mb-6"
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-orange-500"
      />
      <button
        type="submit"
        className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
      >
        Search
      </button>
    </form>
  );
}
