import SearchUsers from "./users/SearchUsers";

async function fetchUsers() {
  const res = await fetch("https://api.github.com/users", { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function Home() {
  const users = await fetchUsers();

  return <SearchUsers initialUsers={users} />;
}
