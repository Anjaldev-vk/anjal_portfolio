"use client";

interface LineNumbersProps {
  count: number;
  startAt?: number;
  className?: string;
}

export default function LineNumbers({ count, startAt = 1, className = "" }: LineNumbersProps) {
  return (
    <div className={`flex flex-col select-none ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="line-number text-right pr-6 font-mono text-xs leading-6">
          {startAt + i}
        </span>
      ))}
    </div>
  );
}
