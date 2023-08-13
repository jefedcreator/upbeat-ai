"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";
import Loader from "./Loader";

export const SignInButton = () => {
  const { data: session, status } = useSession() as any;

  console.log("session", session);
  console.log("status", status);
  

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-2 text-white">
        <p>Welcome, {session.user?.name ?? session.name}</p>
        <Avatar />
        <button
          className="bg-[#1DB954] text-white md:px-4 md:py-2 px-2 py-1"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
      // <Loader/>
    );
  }

  if (!session) {
    return (
      <button
        className="bg-[#1DB954] text-white px-4 py-2"
        onClick={() => signIn("spotify", { callbackUrl: "/chat" })}
      >
        Sign In
      </button>
    );
  }
};

export const SignOutButton = () => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};
