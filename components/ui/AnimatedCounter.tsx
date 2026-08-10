"use client";

import { useAnimatedCounter } from "@/lib/hooks";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export default function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2000,
}: AnimatedCounterProps) {
  const { count, ref } = useAnimatedCounter(end, duration);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
