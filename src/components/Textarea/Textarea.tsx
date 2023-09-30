"use client";

import { useEffect, useState } from "react";

type Props = {
  placeholder: string;
  defaultValue?: string;
  className?: string;
  name?: string;
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  preventSubmit?: boolean;
  ref?: any;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
};

export default function Textarea({
  placeholder,
  defaultValue,
  className,
  name,
  maxLength,
  disabled,
  required,
  preventSubmit,
  ref,
  onChange,
  onEnter,
}: Props) {
  const [value, setValue] = useState(defaultValue ?? "");

  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue]);

  return (
    <div className={`relative ${className || ""}`}>
      <textarea
        className={`w-full py-2 px-4 font-sans bg-slate-50 border border-slate-400 rounded-md outline-none focus:outline-2 focus:outline-offset-0 dark:bg-slate-800 focus:outline-slate-600 dark:border-slate-600 transition-all duration-300 ease-out peer ${
          disabled && "text-slate-500"
        }`}
        name={name}
        maxLength={maxLength}
        onChange={(e) => {
          setValue(e.target.value);
          onChange && onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            preventSubmit && e.preventDefault();
            onEnter?.(value);
          }
        }}
        value={value}
        disabled={disabled}
        required={required}
        spellCheck={true}
        ref={ref}
      ></textarea>

      <span
        className={`absolute font-display my-2  text-slate-400  pointer-events-none transition-all duration-300 ease-in-out z-20 peer-focus:mx-2 peer-focus:px-2 peer-focus:left-1 peer-focus:-top-[1.2rem]  peer-focus:text-sm peer-focus:text-slate-700 dark:peer-focus:text-slate-400 before:content-[''] before:w-full before:h-1 before:absolute before:top-1/2 before:-translate-y-[1px] before:left-0 before:bg-slate-50 before:z-[-1] dark:before:bg-slate-800 before:transition-colors before:duration-300 before:ease-out ${
          value !== "" || disabled
            ? `mx-2 px-2 left-1 -top-5  text-sm text-slate-700 dark:text-slate-500 ${
                disabled
                  ? "text-slate-600 "
                  : "text-slate-950 dark:text-slate-400"
              }`
            : "mx-2 px-2 left-0 top-0  text-slate-400"
        } `}
      >
        {placeholder}
      </span>

      {disabled && defaultValue && (
        <input type="hidden" value={defaultValue} name={name} />
      )}
    </div>
  );
}
