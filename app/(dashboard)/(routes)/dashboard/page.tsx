import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const Dashboard = () => {
  return (
    <div>
      <p> The Dashboard (protected)</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Dashboard;
