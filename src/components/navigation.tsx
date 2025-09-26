import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
}

export function Navigation({ title, onBack, showBack = false }: NavigationProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-card border-b">
      {showBack && onBack && (
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
    </div>
  );
}