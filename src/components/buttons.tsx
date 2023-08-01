"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "./Avatar";

export const SignInButton = () => {
  const { data: session, status } = useSession() as any;
  console.log(status, session);

  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-2 text-white">
        <p>Welcome {session.user?.name ?? session.name}</p>
        {/* <Image src={""} width={32} height={32} alt="User Avatar" /> */}
        <Avatar />
        <button
          className="bg-[#1DB954] text-white px-4 py-2"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    );
  }

  if (!session) {
    return (
      <button
        className="bg-[#1DB954] text-white px-4 py-2"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    );
  }
};

export const SignOutButton = () => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};
