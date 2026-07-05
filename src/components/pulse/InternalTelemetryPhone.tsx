"use client";

import PhoneApp from "./PhoneApp";
import { internalTelemetryTabs } from "./telemetryTabs";

export default function InternalTelemetryPhone() {
  return <PhoneApp tabs={internalTelemetryTabs} initialTabId="overview" />;
}
