type HeaderProps = {
  title: string;
  description: string;
};

export default function Header({ title, description }: HeaderProps) {
  return (
    <div className="w-full bg-slate-400 border-b border-slate-500 p-4 flex flex-col gap-2">
      <h1 className="text-3xl">{title}</h1>
      <div>{description}</div>
    </div>
  );
}
