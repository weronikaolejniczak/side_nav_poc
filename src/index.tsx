import { createRoot } from "react-dom/client";

import { appendIconComponentCache } from "@elastic/eui/es/components/icon/icon";
import { icon as EuiArrowRight } from "@elastic/eui/es/components/icon/assets/arrow_right";
import { icon as EuiCases } from "@elastic/eui/es/components/icon/assets/app_cases";
import { icon as EuiCode } from "@elastic/eui/es/components/icon/assets/code";
import { icon as EuiDashboards } from "@elastic/eui/es/components/icon/assets/app_dashboard";
import { icon as EuiDiscover } from "@elastic/eui/es/components/icon/assets/app_discover";
import { icon as EuiEllipsis } from "@elastic/eui/es/components/icon/assets/boxes_horizontal";
import { icon as EuiGear } from "@elastic/eui/es/components/icon/assets/gear";
import { icon as EuiHome } from "@elastic/eui/es/components/icon/assets/home";
import { icon as EuiInfo } from "@elastic/eui/es/components/icon/assets/info";
import { icon as EuiLaunch } from "@elastic/eui/es/components/icon/assets/launch";
import { icon as EuiLogoElasticsearch } from "@elastic/eui/es/components/icon/assets/logo_elasticsearch";
import { icon as EuiLogoKibana } from "@elastic/eui/es/components/icon/assets/logo_kibana";
import { icon as EuiLogoObservability } from "@elastic/eui/es/components/icon/assets/logo_observability";
import { icon as EuiLogoSecurity } from "@elastic/eui/es/components/icon/assets/logo_security";
import { icon as EuiTransitionLeftIn } from "@elastic/eui/es/components/icon/assets/transitionLeftIn";
import { icon as EuiTransitionLeftOut } from "@elastic/eui/es/components/icon/assets/transitionLeftOut";

import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

appendIconComponentCache({
  arrowRight: EuiArrowRight, // semantically it's chevron right
  boxesHorizontal: EuiEllipsis, // in Figma the icon is `ellipsis` and with circles, not boxes
  casesApp: EuiCases,
  code: EuiCode,
  dashboardApp: EuiDashboards,
  discoverApp: EuiDiscover,
  gear: EuiGear,
  home: EuiHome,
  info: EuiInfo,
  launch: EuiLaunch,
  logoElasticsearch: EuiLogoElasticsearch,
  logoKibana: EuiLogoKibana,
  logoObservability: EuiLogoObservability,
  logoSecurity: EuiLogoSecurity,
  transitionLeftIn: EuiTransitionLeftIn,
  transitionLeftOut: EuiTransitionLeftOut,
});

root.render(<App />);
