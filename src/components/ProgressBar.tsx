"use client";

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
  label?: string;
}

export default function ProgressBar({
  current,
  total,
  color = "bg-devil-red",
  label,
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-devil-muted text-xs uppercase tracking-wider">
            {label}
          </span>
          <span className="text-foreground text-xs font-medium">
            {percentage}%
          </span>
        </div>
      )}

      <div className="relative w-full h-2 rounded-full bg-devil-dim overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {!label && (
        <div className="flex justify-end mt-1">
          <span className="text-devil-muted text-[10px] font-medium">
            {percentage}%
          </span>
        </div>
      )}
    </div>
  );
}
