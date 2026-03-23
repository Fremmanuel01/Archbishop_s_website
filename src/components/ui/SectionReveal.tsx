"use client";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}

export default function SectionReveal({ children, className, stagger = true }: Props) {
  const ref = useGsapReveal(stagger);
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
