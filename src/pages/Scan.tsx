import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/navigation";
import { SafetyCard } from "@/components/ui/safety-card";
import { Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockScanResults, ScanResult } from "@/data/mock-data";

export default function Scan() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setResult(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Find matching result or default to suspicious
    const foundResult = mockScanResults.find(
      item => url.toLowerCase().includes(item.url.toLowerCase()) || 
              url.toLowerCase().includes(item.appName.toLowerCase())
    );

    if (foundResult) {
      setResult(foundResult);
    } else {
      // Default result for unknown URLs
      setResult({
        url: url,
        appName: "Unknown App",
        riskLevel: "suspicious",
        title: "⚠️ Cannot Verify",
        description: "We couldn't find enough information to verify this app or website.",
        reasons: [
          "Limited information available",
          "Not in our database",
          "Proceed with extreme caution",
          "Verify independently before investing"
        ]
      });
    }

    setLoading(false);
  };

  const handleNewScan = () => {
    setUrl("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        title="Scan App / Website" 
        onBack={() => navigate('/')} 
        showBack 
      />

      <div className="p-6 space-y-6">
        {/* Scan Input */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Verify Investment App Safety
            </h2>
            <p className="text-muted-foreground text-sm">
              Enter the app name, website URL, or Play Store link to check for authenticity
            </p>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="e.g. groww.in, Zerodha Kite, or play.google.com/store/apps/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              className="text-base"
            />
            
            <Button
              onClick={handleScan}
              disabled={!url.trim() || loading}
              className="w-full h-12 text-base font-semibold bg-success hover:bg-success/90"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Scan Now
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Scan Result */}
        {result && (
          <div className="space-y-4">
            <SafetyCard
              riskLevel={result.riskLevel}
              title={result.title}
              description={result.description}
              reasons={result.reasons}
            />

            <div className="flex gap-3">
              <Button 
                onClick={handleNewScan}
                variant="outline"
                className="flex-1"
              >
                Scan Another
              </Button>
              <Button 
                onClick={() => navigate('/learn')}
                className="flex-1 bg-secondary hover:bg-secondary/90"
              >
                Learn More
              </Button>
            </div>
          </div>
        )}

        {/* Example URLs */}
        {!result && !loading && (
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Try These Examples:</h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { text: "groww.in", type: "safe" },
                { text: "fake-groww-app.tk", type: "scam" },
                { text: "crypto-moon-invest.net", type: "suspicious" }
              ].map((example, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => setUrl(example.text)}
                  className={`justify-start text-sm ${
                    example.type === 'safe' ? 'text-success hover:bg-success/10' :
                    example.type === 'scam' ? 'text-destructive hover:bg-destructive/10' :
                    'text-caution hover:bg-caution/10'
                  }`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full mr-3 ${
                    example.type === 'safe' ? 'bg-success' :
                    example.type === 'scam' ? 'bg-destructive' :
                    'bg-caution'
                  }`} />
                  {example.text}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-accent/20 p-4 rounded-lg">
          <h3 className="font-semibold text-foreground mb-2">💡 Pro Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Always verify SEBI registration before investing</li>
            <li>• Download apps only from official app stores</li>
            <li>• Be wary of apps promising guaranteed returns</li>
            <li>• Check user reviews and ratings carefully</li>
          </ul>
        </div>
      </div>
    </div>
  );
}