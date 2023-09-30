type IconProps = {
  className?: string;
  pathClassName?: string;
};

export default function IconEdit({ className, pathClassName }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="30"
      viewBox="0 -960 960 960"
      width="30"
      className={className}
    >
      <path
        className={pathClassName}
        d="M180-180h44l471-471-22-22-22-22-471 471v44Zm-30 60q-13 0-21.5-8.5T120-150v-73q0-12 5-23.5t13-19.5l556-556q9-9 20-13t22-4q11 0 22.5 4t19.5 13l44 44q9 8 13 19.5t4 22.5q0 11-4 22t-13 20L266-138q-8 8-19.5 13t-23.5 5h-73Zm626-617-41-41 41 41Zm-81 86-22-22-22-22 44 44Z"
      />
    </svg>
  );
}
