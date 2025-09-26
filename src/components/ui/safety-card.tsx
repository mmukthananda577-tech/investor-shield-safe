import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export type RiskLevel = "safe" | "suspicious" | "scam";

interface SafetyCardProps {
  riskLevel: RiskLevel;
  title: string;
  description: string;
  reasons?: string[];
  className?: string;
}

const riskConfig = {
  safe: {
    gradient: "bg-gradient-safe",
    icon: CheckCircle,
    textColor: "text-success-foreground",
    iconColor: "text-success-foreground",
    animation: "animate-pulse-safe"
  },
  suspicious: {
    gradient: "bg-gradient-caution",
    icon: AlertTriangle,
    textColor: "text-caution-foreground",
    iconColor: "text-caution-foreground",
    animation: "animate-bounce-warning"
  },
  scam: {
    gradient: "bg-gradient-danger",
    icon: XCircle,
    textColor: "text-destructive-foreground",
    iconColor: "text-destructive-foreground",
    animation: "animate-bounce-warning"
  }
};

export function SafetyCard({ riskLevel, title, description, reasons, className }: SafetyCardProps) {
  const config = riskConfig[riskLevel];
  const Icon = config.icon;

  return (
    <div className={cn(
      "rounded-lg p-6 shadow-lg animate-fade-in",
      config.gradient,
      className
    )}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className={cn("h-8 w-8", config.iconColor, config.animation)} />
        <h3 className={cn("text-xl font-bold", config.textColor)}>
          {title}
        </h3>
      </div>
      
      <p className={cn("text-sm mb-4", config.textColor)}>
        {description}
      </p>
      
      {reasons && reasons.length > 0 && (
        <div className="space-y-2">
          <h4 className={cn("font-semibold text-sm", config.textColor)}>
            Reasons:
          </h4>
          <ul className="space-y-1">
            {reasons.map((reason, index) => (
              <li key={index} className={cn("text-xs flex items-center gap-2", config.textColor)}>
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}