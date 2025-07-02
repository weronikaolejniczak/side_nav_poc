/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { forwardRef, ForwardedRef, ReactNode } from "react";
import { useEuiTheme } from "@elastic/eui";

export type MainProps = {
  children: ReactNode;
};

export const Main = forwardRef<HTMLDivElement, MainProps>(
  ({ children }, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const { euiTheme } = useEuiTheme();

    return (
      <main
        ref={ref}
        css={css`
          grid-area: content;
          overflow-y: scroll;
          width: 100%;
          outline: none;

          &:focus-visible {
            border: 2px solid ${euiTheme.colors.primary};
          }
        `}
        // We want to focus it manually but not allow tabbing into
        tabIndex={-1}
      >
        {children}
      </main>
    );
  }
);
