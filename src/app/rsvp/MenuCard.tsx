import Image from "next/image";

type Props = {
  name: string;
  link: string;
};

export default function MenuCard({ name, link }: Props) {
  return (
    <div className="p-4 bg-slate-50 border border-slate-400 rounded-md w-44 dark:bg-slate-800 dark:border-slate-700 transition-colors duration-300 ease-out">
      <div className="rounded overflow-hidden w-full">
        <img className="w-full" src={link} alt={name}></img>
      </div>
      <div className="mt-1 w-fit">
        <div className="w-fit font-bold">{name}</div>
      </div>
    </div>
  );
}
