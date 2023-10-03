type Props = {
  children: string;
  start: number;
  length: number;
  className?: string;
};

export default function Underline({
  children,
  start,
  length,
  className,
}: Props) {
  if (start < 0) return <>{children}</>;

  if (length < 0)
    throw new Error(
      `Invalid start or length: ${start}, ${length} for string length ${children.length}: ${children}`
    );
  if (start + length > children.length)
    throw new Error(
      `Invalid start or length: ${start}, ${length} for string length ${children.length}: ${children}`
    );

  const pre = children.slice(0, start);
  const mid = children.slice(start, start + length);
  const post = children.slice(start + length);

  return (
    <>
      {pre}
      <span className={`underline decoration-[0.5px] ${className ?? ""}`}>
        {mid}
      </span>
      {post}
    </>
  );
}
