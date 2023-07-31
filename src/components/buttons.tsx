"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export const SignInButton = () => {
  const { data: session, status } = useSession() as any;
  console.log(status, session);

  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <Link href={"/"}>
          <p>Welcome {session.user?.name ?? session.name}</p>
          <Image src={""} width={32} height={32} alt="User Avatar" />
        </Link>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return <button onClick={() => signIn("spotify")}>Sign In</button>;
};

export const SignOutButton = () => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};
