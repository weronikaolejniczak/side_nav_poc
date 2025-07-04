import { createRoot } from "react-dom/client";

import { appendIconComponentCache } from "@elastic/eui/es/components/icon/icon";
import { icon as EuiApps } from "@elastic/eui/es/components/icon/assets/apps";
import { icon as EuiArrowRight } from "@elastic/eui/es/components/icon/assets/arrow_right";
import { icon as EuiBell } from "@elastic/eui/es/components/icon/assets/bell";
import { icon as EuiCases } from "@elastic/eui/es/components/icon/assets/app_cases";
import { icon as EuiCode } from "@elastic/eui/es/components/icon/assets/code";
import { icon as EuiDashboards } from "@elastic/eui/es/components/icon/assets/app_dashboard";
import { icon as EuiDevTools } from "@elastic/eui/es/components/icon/assets/app_devtools";
import { icon as EuiDiscover } from "@elastic/eui/es/components/icon/assets/app_discover";
import { icon as EuiEllipsis } from "@elastic/eui/es/components/icon/assets/boxes_horizontal";
import { icon as EuiGear } from "@elastic/eui/es/components/icon/assets/gear";
import { icon as EuiGis } from "@elastic/eui/es/components/icon/assets/app_gis";
import { icon as EuiHome } from "@elastic/eui/es/components/icon/assets/home";
import { icon as EuiIndexManagement } from "@elastic/eui/es/components/icon/assets/app_index_management";
import { icon as EuiIndexPattern } from "@elastic/eui/es/components/icon/assets/app_index_pattern";
import { icon as EuiInfo } from "@elastic/eui/es/components/icon/assets/info";
import { icon as EuiLaunch } from "@elastic/eui/es/components/icon/assets/launch";
import { icon as EuiLens } from "@elastic/eui/es/components/icon/assets/app_lens";
import { icon as EuiLogoElasticsearch } from "@elastic/eui/es/components/icon/assets/logo_elasticsearch";
import { icon as EuiLogoKibana } from "@elastic/eui/es/components/icon/assets/logo_kibana";
import { icon as EuiLogoObservability } from "@elastic/eui/es/components/icon/assets/logo_observability";
import { icon as EuiLogoSecurity } from "@elastic/eui/es/components/icon/assets/logo_security";
import { icon as EuiML } from "@elastic/eui/es/components/icon/assets/app_ml";
import { icon as EuiManagement } from "@elastic/eui/es/components/icon/assets/app_management";
import { icon as EuiReporting } from "@elastic/eui/es/components/icon/assets/app_reporting";
import { icon as EuiSearch } from "@elastic/eui/es/components/icon/assets/search";
import { icon as EuiSecurityAnalytics } from "@elastic/eui/es/components/icon/assets/app_security_analytics";
import { icon as EuiTransitionLeftIn } from "@elastic/eui/es/components/icon/assets/transitionLeftIn";
import { icon as EuiTransitionLeftOut } from "@elastic/eui/es/components/icon/assets/transitionLeftOut";
import { icon as EuiVisGauge } from "@elastic/eui/es/components/icon/assets/vis_gauge";
import { icon as EuiStorage } from "@elastic/eui/es/components/icon/assets/storage";
import { icon as EuiLogstashQueue } from "@elastic/eui/es/components/icon/assets/logstash_queue";

import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

appendIconComponentCache({
  apps: EuiApps,
  arrowRight: EuiArrowRight, // semantically it's chevron right
  bell: EuiBell,
  boxesHorizontal: EuiEllipsis, // in Figma the icon is `ellipsis` and with circles, not boxes
  casesApp: EuiCases,
  code: EuiCode,
  dashboardApp: EuiDashboards,
  devToolsApp: EuiDevTools,
  discoverApp: EuiDiscover,
  gear: EuiGear,
  gisApp: EuiGis,
  home: EuiHome,
  indexManagementApp: EuiIndexManagement,
  indexPatternApp: EuiIndexPattern,
  info: EuiInfo,
  launch: EuiLaunch,
  lensApp: EuiLens,
  logoElasticsearch: EuiLogoElasticsearch,
  logoKibana: EuiLogoKibana,
  logoObservability: EuiLogoObservability,
  logoSecurity: EuiLogoSecurity,
  machineLearningApp: EuiML,
  managementApp: EuiManagement,
  reportingApp: EuiReporting,
  search: EuiSearch,
  securityAnalyticsApp: EuiSecurityAnalytics,
  storage: EuiStorage,
  transitionLeftIn: EuiTransitionLeftIn,
  transitionLeftOut: EuiTransitionLeftOut,
  visGauge: EuiVisGauge,
  logstashQueue: EuiLogstashQueue,
});

root.render(<App />);
