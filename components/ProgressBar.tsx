interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProgressBar({
  percentage,
  showLabel = true,
  size = "md",
  className = "",
}: ProgressBarProps) {
  const heights = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`flex-1 progress-bar ${heights[size]}`}>
        <div
          className="progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-muted min-w-[3rem] text-right">
          {percentage}%
        </span>
      )}
    </div>
  );
}
