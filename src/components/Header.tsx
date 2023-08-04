import { SignInButton } from "@/components/buttons";

const Header = () => {
  return (
    <div className="flex w-full justify-between md:h-[15%] h-[10%] items-center">
      <h1 className="text-white">Upbeat</h1>
      <SignInButton />
    </div>
  );
};

export default Header;
