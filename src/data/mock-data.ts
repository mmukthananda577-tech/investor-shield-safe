import { RiskLevel } from "@/components/ui/safety-card";

export interface ScanResult {
  url: string;
  appName: string;
  riskLevel: RiskLevel;
  title: string;
  description: string;
  reasons: string[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
  completed?: boolean;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface ScamAlert {
  id: string;
  title: string;
  message: string;
  riskLevel: RiskLevel;
  timestamp: string;
}

// Mock scanning results
export const mockScanResults: ScanResult[] = [
  {
    url: "groww.in",
    appName: "Groww",
    riskLevel: "safe",
    title: "✅ Safe Investment Platform",
    description: "This is a legitimate, SEBI-registered investment platform.",
    reasons: [
      "SEBI registered broker",
      "Official app store listing",
      "Verified developer certificate",
      "Positive user reviews (4.2/5)",
      "Established company since 2016"
    ]
  },
  {
    url: "zerodha.com",
    appName: "Zerodha Kite",
    riskLevel: "safe",
    title: "✅ Trusted Broker Platform",
    description: "Legitimate trading platform with proper regulations.",
    reasons: [
      "SEBI registered",
      "NSE & BSE member",
      "Official developer",
      "Strong security measures",
      "Transparent fee structure"
    ]
  },
  {
    url: "fake-groww-app.tk",
    appName: "Groww Pro",
    riskLevel: "scam",
    title: "🚨 Fake Investment App",
    description: "This is a fraudulent copy of the legitimate Groww app.",
    reasons: [
      "Not SEBI registered",
      "Suspicious domain (.tk)",
      "Unverified developer",
      "No official app store listing",
      "Reports of fund theft"
    ]
  },
  {
    url: "quick-profit-trade.com",
    appName: "QuickProfit",
    riskLevel: "scam",
    title: "🚨 Investment Scam",
    description: "Fraudulent platform promising unrealistic returns.",
    reasons: [
      "Promises guaranteed returns",
      "No regulatory compliance",
      "Anonymous operators",
      "Fake testimonials",
      "No physical address"
    ]
  },
  {
    url: "crypto-moon-invest.net",
    appName: "CryptoMoon",
    riskLevel: "suspicious",
    title: "⚠️ Suspicious Platform",
    description: "Lacks proper verification and regulatory compliance.",
    reasons: [
      "No SEBI registration",
      "Limited company information",
      "Aggressive marketing",
      "Unclear fee structure",
      "New domain registration"
    ]
  }
];

// Educational lessons
export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Always Download from Official Stores",
    content: "Only download investment apps from Google Play Store or Apple App Store. Avoid APK files from unknown sources.",
    duration: "2 min"
  },
  {
    id: "2",
    title: "Verify SEBI Registration",
    content: "Check if the broker is registered with SEBI (Securities and Exchange Board of India) before investing.",
    duration: "2 min"
  },
  {
    id: "3",
    title: "Watch for Red Flags",
    content: "Be cautious of promises of guaranteed returns, pressure to invest quickly, or requests for personal banking details.",
    duration: "1 min"
  },
  {
    id: "4",
    title: "Research Company Background",
    content: "Verify the company's address, contact information, and read user reviews before trusting them with your money.",
    duration: "2 min"
  }
];

// Quiz questions
export const quizzes: Quiz[] = [
  {
    id: "1",
    question: "Where should you download investment apps from?",
    options: [
      "Any website offering the app",
      "Official app stores only",
      "Telegram links",
      "Email attachments"
    ],
    correctAnswer: 1,
    explanation: "Always download apps from official stores like Google Play or Apple App Store to ensure authenticity.",
    points: 10
  },
  {
    id: "2",
    question: "What is a major red flag for investment scams?",
    options: [
      "Transparent fee structure",
      "SEBI registration",
      "Guaranteed high returns",
      "Customer support availability"
    ],
    correctAnswer: 2,
    explanation: "Legitimate investments always carry risk. Guaranteed high returns are a classic sign of fraud.",
    points: 15
  },
  {
    id: "3",
    question: "Before investing, you should verify:",
    options: [
      "Company's social media followers",
      "SEBI registration status",
      "App download count",
      "Celebrity endorsements"
    ],
    correctAnswer: 1,
    explanation: "SEBI registration ensures the broker follows regulatory guidelines and investor protection measures.",
    points: 10
  }
];

// Scam alerts
export const scamAlerts: ScamAlert[] = [
  {
    id: "1",
    title: "Fake Groww App Alert",
    message: "Fraudulent Groww app circulating on Telegram. Always download from official stores!",
    riskLevel: "scam",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    title: "Crypto Investment Scam",
    message: "New cryptocurrency investment scheme promising 300% returns. Avoid immediately!",
    riskLevel: "scam",
    timestamp: "1 day ago"
  }
];