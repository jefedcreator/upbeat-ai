import React from "react";
import Interaction from "@/components/interaction";
import { Upbeat } from "@/utils/hooks/useChat";
import { SignInButton } from "@/components/buttons";
import Test from "@/components/test";
const page = () => {
  return (
    <main>
      <div className="flex w-full justify-between">
        <h1>Upbeat AI</h1>
        <SignInButton />
      </div>
      <Upbeat>
        <Interaction />
        <Test />
      </Upbeat>
    </main>
  );
};

export default page;
