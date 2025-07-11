/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { css } from "@emotion/react";
import { useEuiTheme } from "@elastic/eui";

import { useNavigation } from "../navigation";

export type SideNavFooterProps = {
  children: ReactNode;
};

export const SideNavFooter = ({
  children,
}: SideNavFooterProps): JSX.Element => {
  const { euiTheme } = useEuiTheme();
  const { isCollapsed } = useNavigation();

  return (
    <footer
      css={css`
        align-items: center;
        border-top: 1px solid ${euiTheme.colors.borderBaseSubdued};
        display: flex;
        flex-direction: column;
        gap: ${euiTheme.size.xs};
        justify-content: center;
        padding-top: ${isCollapsed ? euiTheme.size.s : euiTheme.size.m};
      `}
    >
      {children}
    </footer>
  );
};
