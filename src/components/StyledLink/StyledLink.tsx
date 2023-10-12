"use client";

import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  onClick?: () => void;
};

export default function StyledLink({
  href,
  children,
  className,
  target,
  onClick,
}: Props) {
  return (
    <Link
      href={href}
      target={target}
      onClick={onClick}
      className={`text-sky-600 underline hover:text-sky-400 dark:text-sky-500 dark:hover:text-sky-300 transition-colors duration-200 ease-out ${className}`}
    >
      {children}
    </Link>
  );
}
