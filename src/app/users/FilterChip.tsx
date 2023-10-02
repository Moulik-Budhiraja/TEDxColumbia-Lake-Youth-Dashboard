type Props = {
  children: React.ReactNode;
  selected: boolean;
  onClick?: () => void;
};

export default function FilterChip({ selected, children, onClick }: Props) {
  return (
    <button
      onClick={() => {
        onClick?.();
      }}
      className={`py-1 px-2 border border-slate-400 rounded-md hover:bg-slate-700 hover:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-600 transition-all duration-300 ease-out whitespace-nowrap ${
        selected
          ? "bg-slate-700 text-slate-100 dark:bg-slate-500"
          : "dark:bg-slate-800"
      }`}
    >
      {children}
    </button>
  );
}
