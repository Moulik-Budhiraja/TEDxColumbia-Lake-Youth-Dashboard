type IconProps = {
  className?: string;
  pathClassName?: string;
};

export default function IconLinkedin({ className, pathClassName }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 72 72"
      className={className}
    >
      <path
        className={pathClassName}
        d="M64 0H8C3.6 0 0 3.6 0 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V8c0-4.4-3.6-8-8-8zM21.8 62H11V27.3h10.7V62zm-5.5-39.2c-3.5 0-6.3-2.9-6.3-6.4 0-3.5 2.8-6.4 6.3-6.4s6.3 2.9 6.3 6.4c.1 3.5-2.7 6.4-6.3 6.4zM62 62H51.3V43.8c0-5-1.9-7.8-5.8-7.8-4.3 0-6.5 2.9-6.5 7.8V62H28.6V27.3h10.3V32s3.1-5.7 10.5-5.7S62 30.8 62 40.1V62z"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
        }}
      />
    </svg>
  );
}
