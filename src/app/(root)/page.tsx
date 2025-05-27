import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1>Home</h1>
      <Link className="text-blue-500" href="/about-us">About</Link>
      <Link className="text-blue-500" href="/tutors">Tutors</Link>
      <Link className="text-blue-500" href="/login">Login</Link>
    </div>
  );
}
