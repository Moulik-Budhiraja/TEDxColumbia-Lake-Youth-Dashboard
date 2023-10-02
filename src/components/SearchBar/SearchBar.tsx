"use client";

import { useState } from "react";
import Button from "@/components/Button/Button";
import Input from "../Input/Input";

type SearchBarProps = {
  placeholder: string;
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
};

export default function SearchBar({
  placeholder,
  defaultValue,
  className,
  onChange,
  onSearch,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div className={`mt-2 font-display flex gap-4 relative ${className || ""}`}>
      <Input
        className="w-full"
        onChange={(value) => {
          setValue(value);
          onChange && onChange(value);
        }}
        preventSubmit={true}
        onEnter={(value) => onSearch && onSearch(value)}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />

      <Button className="w-40" onClick={() => onSearch && onSearch(value)}>
        Search
      </Button>
    </div>
  );
}
