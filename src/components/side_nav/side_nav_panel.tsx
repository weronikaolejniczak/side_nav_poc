/** @jsxImportSource @emotion/react */
import { EuiPanel, useEuiOverflowScroll, useEuiTheme } from "@elastic/eui";
import { ReactNode } from "react";
import { css } from "@emotion/react";

export type SideNavPanelProps = {
  children: ReactNode;
};

/**
 * Side navigation panel that opens on mouse click if the page contains sub-pages.
 *
 * `paddingSize="m"` is already `16px`, so we have to manually set `12px` padding
 */
export const SideNavPanel = ({ children }: SideNavPanelProps): JSX.Element => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiPanel
      css={css`
        grid-area: secondary;
        ${useEuiOverflowScroll("y")}
        border-right: 1px ${euiTheme.colors.borderBaseSubdued} solid;
      `}
      color="subdued"
      // > For instance, only plain or transparent panels can have a border and/or shadow.
      // source: https://eui.elastic.co/docs/components/containers/panel/
      // hasBorder
      paddingSize="none"
      borderRadius="none"
    >
      {children}
    </EuiPanel>
  );
};
