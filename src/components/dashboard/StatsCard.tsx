import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const variantStyles = {
  default: "bg-card border-border",
  success: "bg-gradient-to-br from-success/20 to-success/5 border-success/30",
  warning: "bg-gradient-to-br from-warning/20 to-warning/5 border-warning/30",
  danger: "bg-gradient-to-br from-destructive/20 to-destructive/5 border-destructive/30",
  info: "bg-gradient-to-br from-info/20 to-info/5 border-info/30",
};

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  variant = "default",
}: StatsCardProps) => {
  return (
    <Card className={cn("p-6 border", variantStyles[variant])}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {trendValue && (
          <span
            className={cn(
              "text-sm font-medium",
              trend === "up" ? "text-success" : "text-destructive"
            )}
          >
            {trend === "up" ? "↑" : "↓"} {trendValue}
          </span>
        )}
      </div>
    </Card>
  );
};
