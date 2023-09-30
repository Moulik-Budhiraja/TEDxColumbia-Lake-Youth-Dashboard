type HeaderProps = {
  title: string;
  description?: string;
};

export default function Header({ title, description }: HeaderProps) {
  return (
    <div className="w-full bg-slate-200 border-b border-slate-400 dark:bg-slate-800 dark:border-slate-700 p-4 flex flex-col gap-2 transition-colors duration-300 ease-out">
      <h1 className="text-3xl font-di">{title}</h1>
      {description && <div>{description}</div>}
    </div>
  );
}
