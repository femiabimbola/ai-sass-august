import {Button} from "@/components/ui/button";
import Link from "next/link";
import LandingHeader from "./_components/header";

const Home = () => {
  return (
    <div>
      <LandingHeader />
      <p> Landing page (unprotected) </p>
      {/* <div>
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div> */}
    </div>
  );
};

export default Home;
