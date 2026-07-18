"use client";

import { Pill } from "@/components/ui/pill";

export function SinglePillGroup({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => (
        <Pill
          key={option}
          selected={value === option}
          onClick={() => onChange(option)}
        >
          {option}
        </Pill>
      ))}
    </div>
  );
}

export function MultiChipGroup({
  options,
  values,
  onChange,
}: {
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
}) {
  function toggle(option: string) {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...values, option]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => (
        <Pill
          key={option}
          selected={values.includes(option)}
          onClick={() => toggle(option)}
        >
          {option}
        </Pill>
      ))}
    </div>
  );
}
