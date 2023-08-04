import { SignInButton } from "@/components/Buttons";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex w-full justify-between md:h-[15%] h-[10%] items-center">
      <Link href="/" className="text-white">
        Upbeat
      </Link>
      <SignInButton />
    </div>
  );
};

export default Header;
