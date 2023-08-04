import { Upbeat } from "@/utils/hooks/useChat";
import Interaction from "@/components/Interaction";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <Upbeat>
      <Interaction />
    </Upbeat>
  );
};

export default page;
