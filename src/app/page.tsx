import React from "react";
import Interaction from "@/components/interaction";
import { Upbeat } from "@/utils/hooks/useChat";
const page = () => {
  return (
    <main>
      <div>Upbeat AI</div>
      <Upbeat>
        <Interaction />
      </Upbeat>
    </main>
  );
};

export default page;
