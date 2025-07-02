/** @jsxImportSource @emotion/react */
import { useEuiTheme } from "@elastic/eui";
import { css } from "@emotion/react";
import { ReactNode } from "react";

export type LayoutProps = {
  isSidePanelOpen: boolean;
  isCollapsed: boolean;
  children: ReactNode;
};

/**
 * Grid layout with:
 * - a side navigation,
 * - a conditionally rendered panel,
 * - a top bar
 * - and a content area.
 *
 * Larger values like `86px` and `260px` don't use `euiTheme`.
 * That's because they are not multiples of 4.
 */
export const Layout = ({
  isSidePanelOpen,
  isCollapsed,
  children,
}: LayoutProps): JSX.Element => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        background: ${euiTheme.colors.backgroundBasePlain};
        box-sizing: border-box;
        overflow: hidden;

        --sidenav-width: ${isCollapsed ? euiTheme.size.xxxl : "86px"};
        --top-bar-height: ${euiTheme.size.xxxl};
        --side-panel-width: 260px;

        height: 100vh;
        display: grid;
        grid-template-columns:
          var(--sidenav-width)
          ${isSidePanelOpen ? "var(--side-panel-width)" : "0px"} 1fr;
        grid-template-rows: var(--top-bar-height) 1fr;
        grid-template-areas:
          "topbar topbar topbar"
          "sidenav ${isSidePanelOpen ? "secondary" : "."} content";
        transition: grid-template-columns 0.3s;
      `}
    >
      {children}
    </div>
  );
};
