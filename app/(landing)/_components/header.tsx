import Link from "next/link";
import {Button} from "@/components/ui/button";

const LandingHeader = () => {
  return (
    <div className="sticky top-0 z-10 bg-gray-300 max-w-[1440px] py-3  border-none flex items-center justify-between px-16">
      <p>The Tush AI</p>
      <div className="flex gap-x-5">
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingHeader;
