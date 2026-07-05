import { LayoutGrid, Users, Activity, FileText } from "lucide-react";
import ExecutiveFeedScreen from "./screens/ExecutiveFeedScreen";
import CustomerIntelligenceScreen from "./screens/CustomerIntelligenceScreen";
import BehaviorIntelligenceScreen from "./screens/BehaviorIntelligenceScreen";
import AIBriefingScreen from "./screens/AIBriefingScreen";

export type PulseTabId = "overview" | "customers" | "usage" | "brief";

export type PulseTab = {
  id: PulseTabId;
  label: string;
  shortLabel: string;
  icon: typeof LayoutGrid;
  screen: () => React.JSX.Element;
};

export const pulseTabs: PulseTab[] = [
  { id: "overview", label: "Executive Overview", shortLabel: "Overview", icon: LayoutGrid, screen: ExecutiveFeedScreen },
  { id: "customers", label: "Customer & Account Activity", shortLabel: "Customers", icon: Users, screen: CustomerIntelligenceScreen },
  { id: "usage", label: "Adoption & Usage Metrics", shortLabel: "Usage", icon: Activity, screen: BehaviorIntelligenceScreen },
  { id: "brief", label: "Executive Brief", shortLabel: "Brief", icon: FileText, screen: AIBriefingScreen },
];
