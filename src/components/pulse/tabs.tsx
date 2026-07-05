import { LayoutGrid, Users, Radio, Package, FileText } from "lucide-react";
import ExecutiveFeedScreen from "./screens/ExecutiveFeedScreen";
import CustomerIntelligenceScreen from "./screens/CustomerIntelligenceScreen";
import SignalsScreen from "./screens/SignalsScreen";
import ProductIntelligenceScreen from "./screens/ProductIntelligenceScreen";
import AIBriefingScreen from "./screens/AIBriefingScreen";

export type PulseTab = {
  id: string;
  label: string;
  shortLabel: string;
  icon: typeof LayoutGrid;
  screen: () => React.JSX.Element;
};

export const pulseTabs: PulseTab[] = [
  { id: "overview", label: "Executive Overview", shortLabel: "Overview", icon: LayoutGrid, screen: ExecutiveFeedScreen },
  { id: "customers", label: "Customer & Account Activity", shortLabel: "Customers", icon: Users, screen: CustomerIntelligenceScreen },
  { id: "signals", label: "Web Behavioral Signals", shortLabel: "Signals", icon: Radio, screen: SignalsScreen },
  { id: "product", label: "Product Intelligence", shortLabel: "Product", icon: Package, screen: ProductIntelligenceScreen },
  { id: "brief", label: "Executive Brief", shortLabel: "Brief", icon: FileText, screen: AIBriefingScreen },
];
