/** @jsxImportSource @emotion/react */
import { EuiProvider } from "@elastic/eui";
import { useState, useCallback } from "react";

import { MainNavigation } from "./components/navigation";
import { MenuItem, SecondaryMenuItem } from "./types/navigation";
import { PRIMARY_MENU_ITEMS } from "./constants";

/**
 * Main application component that serves as the entry point for the side navigation UI.
 * This component manages navigation state locally and passes props down to child components.
 *
 * It implements:
 * - A responsive side navigation that can be collapsed or expanded
 * - Dynamic primary and secondary navigation menus
 * - Responsive menu item folding based on available space
 *
 * @returns {JSX.Element} The root application component
 */
export default function App(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(PRIMARY_MENU_ITEMS[0].href);
  const [currentSubpage, setCurrentSubpage] = useState<string | null>(null);
  const [sidePanelContent, setSidePanelContent] = useState<MenuItem | null>(PRIMARY_MENU_ITEMS[0]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isSidePanelOpen = !isCollapsed && !!sidePanelContent?.sections;

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const navigateTo = useCallback((
    primaryMenuItem: MenuItem,
    secondaryMenuItem?: SecondaryMenuItem
  ) => {
    setCurrentPage(primaryMenuItem.href);
    setCurrentSubpage(secondaryMenuItem?.href || null);
    setSidePanelContent(primaryMenuItem);
  }, []);

  return (
    <EuiProvider>
      <MainNavigation
        currentPage={currentPage}
        currentSubpage={currentSubpage}
        sidePanelContent={sidePanelContent}
        isCollapsed={isCollapsed}
        isSidePanelOpen={isSidePanelOpen}
        toggleCollapsed={toggleCollapsed}
        navigateTo={navigateTo}
      />
    </EuiProvider>
  );
}
