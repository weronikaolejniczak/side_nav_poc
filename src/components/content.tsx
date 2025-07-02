/** @jsxImportSource @emotion/react */
import { useEuiTheme } from "@elastic/eui";
import { css } from "@emotion/react";
import { ReactNode } from "react";

export type ContentProps = {
  children: ReactNode;
};

export const Content = ({ children }: ContentProps): JSX.Element => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        background: ${euiTheme.colors.lightestShade};
        border-radius: ${euiTheme.size.xs};
        border: 1px ${euiTheme.colors.lightShade} dashed;
        height: 150%;
        margin: ${euiTheme.size.l};
        padding: ${euiTheme.size.l};
      `}
    >
      {children}
    </div>
  );
};
