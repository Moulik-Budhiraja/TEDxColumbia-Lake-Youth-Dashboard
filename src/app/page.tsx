import Header from "@/components/Header/Header";
import { getSessionUser } from "@/serverFunctions/user/getSessionUser";

export default async function Home() {
  const user = await getSessionUser();
  console.log(!!user);

  return (
    <div className="h-screen w-full">
      <Header
        title="Home"
        description="This is your home page where you do home page things"
      ></Header>
    </div>
  );
}
