/** @jsxImportSource @emotion/react */
import { EuiProvider } from "@elastic/eui";

import { MainNavigation, NavigationProvider } from "./components/navigation";

/**
 * Main application component that serves as the entry point for the side navigation UI.
 * This component uses a context-based architecture for state management.
 *
 * It implements:
 * - A responsive side navigation that can be collapsed or expanded
 * - Dynamic primary and secondary navigation menus
 * - Responsive menu item folding based on available space
 *
 * @returns {JSX.Element} The root application component wrapped in the NavigationProvider
 */
export default function App(): JSX.Element {
  return (
    <NavigationProvider>
      <EuiProvider>
        <MainNavigation />
      </EuiProvider>
    </NavigationProvider>
  );
}
