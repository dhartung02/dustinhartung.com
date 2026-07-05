import { LayoutGrid, Smartphone, Monitor } from "lucide-react";
import InternalOverviewScreen from "./screens/InternalOverviewScreen";
import InternalMobileScreen from "./screens/InternalMobileScreen";
import InternalWebScreen from "./screens/InternalWebScreen";
import type { PulseTab } from "./tabs";

export const internalTelemetryTabs: PulseTab[] = [
  { id: "overview", label: "Telemetry Overview", shortLabel: "Overview", icon: LayoutGrid, screen: InternalOverviewScreen },
  { id: "mobile", label: "Mobile App Usage", shortLabel: "Mobile", icon: Smartphone, screen: InternalMobileScreen },
  { id: "web", label: "Web Platform Usage", shortLabel: "Web", icon: Monitor, screen: InternalWebScreen },
];
