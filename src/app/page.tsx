import Image from "next/image";
import Sidebar from "./Sidebar";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className="h-screen">
      <Header
        title="Home"
        description="This is your home page where you do home page things"
      ></Header>
    </div>
  );
}
