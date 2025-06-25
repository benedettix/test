"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchUsers({ initialUsers }: { initialUsers: any[] }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(initialUsers);

  useEffect(() => {
    setFiltered(initialUsers.filter((user) => user.login.toLowerCase().includes(search.toLowerCase())));
  }, [search, initialUsers]);

  return (
    <div className="bg-gray-400">
      <div className="flex justify-center items-center bg-gray-300">
        <input
          type="text"
          className="mb-4 text-black border-black p-2 border rounded mt-4 mx-auto w-[80%] placeholder-black"
          placeholder="Search GitHub users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="container mx-auto">
        <div className="flex justify-center items-center bg-gray-400 p-10 rounded-2xl rounded-t-none flex-wrap gap-6 min-h-[100vh]">
          {filtered.map((user) => (
            <div
              key={user.id}
              className="flex justify-center items-center flex-col bg-white p-4 rounded shadow w-100 sm:w-2/6 md:w-1/6"
            >
              <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
              <h2 className="text-lg font-bold mt-2 text-black">{user.login}</h2>
              <a href={user.html_url} className="text-sm text-blue-600" target="_blank" rel="noreferrer">
                GitHub Profile
              </a>
              <Link className="block mt-2 text-blue-500 underline" href={`/users/${user.login}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
