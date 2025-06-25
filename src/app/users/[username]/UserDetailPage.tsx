// app/users/[username]/UserDetailPage.tsx
import Link from "next/link";
import { notFound } from "next/navigation";

async function fetchUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function UserDetailPage({ username }: { username: string }) {
  const user = await fetchUser(username);
  if (!user) return notFound();

  return (
    <div className="flex items-center justify-center bg-gray-400 min-h-[100vh]">
      <div className="bg-white p-6 rounded shadow max-w-lg  flex justify-center items-center flex-col mx-6 ">
        <Link href="/" className="flex items-center mb-4 hover:text-blue-600 transition-colors absolute top-6 left-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </Link>
        <img src={user.avatar_url} className="w-24 h-24 rounded-full mb-4" />
        <div className="flex items-center justify-center gap-10 pb-6">
          <div className="flex justify-center items-start flex-col  mx-auto">
            <div className="mb-2">
              <span className="font-semibold text-black">Name: </span>
              <span className="text-black">{user.name || user.login}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-black">Bio: </span>
              <span className="text-black">{user.bio || "No bio provided"}</span>
            </div>
          </div>
          <div className="flex justify-center items-start flex-col  mx-auto">
            <div className="mb-2">
              <span className="font-semibold text-black">Location: </span>
              <span className="text-black">{user.location || "Unknown"}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-black">Followers: </span>
              <span className="text-black">{user.followers}</span>
            </div>
            <div>
              <span className="font-semibold text-black">Following: </span>
              <span className="text-black">{user.following}</span>
            </div>
          </div>
        </div>
        <a href={user.html_url} className="text-blue-600 underline mt-3 block" target="_blank">
          Visit GitHub Profile
        </a>
      </div>
    </div>
  );
}
