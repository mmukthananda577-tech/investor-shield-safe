import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Search, BookOpen, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-security.jpg";
import { scamAlerts } from "@/data/mock-data";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Investment Security Shield" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative p-6 pt-12 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-10 w-10 text-white animate-pulse-safe" />
            <h1 className="text-3xl font-bold">InvestorSafe</h1>
          </div>
          
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold leading-tight">
              Protect Your Investments
            </h2>
            <p className="text-lg opacity-90">
              Detect fake investment apps and learn to stay safe from financial scams
            </p>
          </div>

          {/* Main Action Buttons */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/scan')}
              className="h-16 text-lg font-semibold bg-success hover:bg-success/90 text-success-foreground shadow-lg"
            >
              <Search className="h-6 w-6 mr-3" />
              Scan App / Website
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/learn')}
              className="h-16 text-lg font-semibold bg-white/95 hover:bg-white text-secondary border-2 border-white/50 shadow-lg"
            >
              <BookOpen className="h-6 w-6 mr-3" />
              Learn & Play
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 -mt-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center bg-card shadow-lg animate-fade-in">
            <div className="text-2xl font-bold text-success">98%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </Card>
          <Card className="p-4 text-center bg-card shadow-lg animate-fade-in">
            <div className="text-2xl font-bold text-secondary">50K+</div>
            <div className="text-sm text-muted-foreground">Users Protected</div>
          </Card>
          <Card className="p-4 text-center bg-card shadow-lg animate-fade-in">
            <div className="text-2xl font-bold text-caution">1000+</div>
            <div className="text-sm text-muted-foreground">Scams Detected</div>
          </Card>
        </div>

        {/* Recent Alerts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-destructive animate-bounce-warning" />
            <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
          </div>
          
          {scamAlerts.slice(0, 2).map((alert) => (
            <Card key={alert.id} className="p-4 border-l-4 border-l-destructive bg-destructive/5 animate-fade-in">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-destructive text-sm">{alert.title}</h4>
                <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
            </Card>
          ))}
        </div>

        {/* Features Preview */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">How It Works</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-semibold text-foreground">Scan & Verify</h4>
                <p className="text-sm text-muted-foreground">Enter app URL or name to check authenticity</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-semibold text-foreground">Learn & Practice</h4>
                <p className="text-sm text-muted-foreground">Complete lessons and quizzes to stay informed</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-caution text-caution-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-semibold text-foreground">Stay Protected</h4>
                <p className="text-sm text-muted-foreground">Get real-time alerts about emerging scams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}