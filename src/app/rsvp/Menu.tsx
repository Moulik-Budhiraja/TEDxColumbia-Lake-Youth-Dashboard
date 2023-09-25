import MenuCard from "./MenuCard";
import { menuOptions } from "./menuOptions";

export default function Menu() {
  return (
    <div className="w-full overflow-x-scroll grid grid-flow-col gap-4">
      {menuOptions.map((option) => (
        <MenuCard name={option.name} link={option.link}></MenuCard>
      ))}
    </div>
  );
}
