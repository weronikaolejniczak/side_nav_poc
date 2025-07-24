/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { forwardRef, ForwardedRef, ReactNode } from "react";
import { useEuiTheme } from "@elastic/eui";

export type SideNavPrimaryMenuProps = {
  children: ReactNode;
  isCollapsed: boolean;
};

export const SideNavPrimaryMenu = forwardRef<
  HTMLElement,
  SideNavPrimaryMenuProps
>(({ children, isCollapsed }, ref: ForwardedRef<HTMLElement>): JSX.Element => {
  const { euiTheme } = useEuiTheme();

  return (
    <nav
      id="primary-navigation"
      aria-label="Main navigation"
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
