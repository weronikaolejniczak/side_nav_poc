/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { forwardRef, ForwardedRef, ReactNode } from "react";
import { useEuiTheme } from "@elastic/eui";

export type SideNavPrimaryMenuProps = {
  isCollapsed: boolean;
  children: ReactNode;
};

export const SideNavPrimaryMenu = forwardRef<
  HTMLElement,
  SideNavPrimaryMenuProps
>(({ isCollapsed, children }, ref: ForwardedRef<HTMLElement>): JSX.Element => {
  const { euiTheme } = useEuiTheme();

  return (
    <nav
      ref={ref}
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: ${isCollapsed ? euiTheme.size.xs : euiTheme.size.base};
      `}
    >
      {children}
    </nav>
  );
});
