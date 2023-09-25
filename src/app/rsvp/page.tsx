import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import { getSessionUser } from "@/serverFunctions/user/getSessionUser";
import RsvpForm from "./RsvpForm";

export default async function Home() {
  const user = await getSessionUser();
  console.log(!!user);

  return (
    <div className="h-screen w-full">
      <Header
        title="RSVP"
        description="Please fill out this form to let us know you'll be there"
      ></Header>
      <RsvpForm></RsvpForm>
    </div>
  );
}
