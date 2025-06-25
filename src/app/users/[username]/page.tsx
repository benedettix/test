// app/users/[username]/page.tsx
import { notFound } from "next/navigation";
import UserDetailPage from "./UserDetailPage";

type Props = {
  params: { username: string };
};

export default async function Page({ params }: Props) {
  const { username } = await params;
  return <UserDetailPage username={username} />;
}
