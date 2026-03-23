import { cn } from "@/lib/utils";

interface Props { className?: string; }

export default function GoldDivider({ className }: Props) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <div className="flex-1 h-px bg-gold opacity-30" />
      <div className="flex gap-1.5">
        <span className="w-1 h-1 rounded-full bg-gold opacity-60" />
        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
        <span className="w-1 h-1 rounded-full bg-gold opacity-60" />
      </div>
      <div className="flex-1 h-px bg-gold opacity-30" />
    </div>
  );
}
