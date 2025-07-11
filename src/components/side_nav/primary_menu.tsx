/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { forwardRef, ForwardedRef, ReactNode } from "react";
import { useEuiTheme } from "@elastic/eui";
import { useNavigation } from "../navigation";

export type SideNavPrimaryMenuProps = {
  children: ReactNode;
};

export const SideNavPrimaryMenu = forwardRef<
  HTMLElement,
  SideNavPrimaryMenuProps
>(({ children }, ref: ForwardedRef<HTMLElement>): JSX.Element => {
  const { euiTheme } = useEuiTheme();
  const { isCollapsed } = useNavigation();

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
