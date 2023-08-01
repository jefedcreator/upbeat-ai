import { SignInButton } from "@/components/buttons";

const Header = () => {
  return (
    <div className="flex w-full justify-between h-[15%] items-center">
      <h1 className="text-white">Upbeat AI</h1>
      <SignInButton />
    </div>
  );
};

export default Header;
