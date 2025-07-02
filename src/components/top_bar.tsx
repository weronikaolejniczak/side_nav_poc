/** @jsxImportSource @emotion/react */
import { useEuiTheme } from "@elastic/eui";
import { css } from "@emotion/react";
import { ReactNode } from "react";

export type TopBarProps = {
  children: ReactNode;
};

export const TopBar = ({ children }: TopBarProps): JSX.Element => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        border-bottom: 1px solid ${euiTheme.colors.borderBaseSubdued};
        display: flex;
        grid-area: topbar;
        height: var(--top-bar-height);
        align-items: center;
        width: 100%;
        padding: 0 ${euiTheme.size.s};
      `}
    >
      {children}
    </div>
  );
};
