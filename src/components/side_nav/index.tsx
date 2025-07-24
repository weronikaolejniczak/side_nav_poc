/** @jsxImportSource @emotion/react */
import { useEuiTheme } from "@elastic/eui";
import { css } from "@emotion/react";
import { FC, ReactNode } from "react";

import { SideNavFooter } from "./footer";
import { SideNavFooterItem } from "./footer_item";
import { SideNavLogo } from "./logo";
import { SideNavPanel } from "./panel";
import { SideNavPopover } from "./popover";
import { SideNavPrimaryMenu } from "./primary_menu";
import { SideNavPrimaryMenuItem } from "./primary_menu_item";

export type SideNavProps = {
  children: ReactNode;
  isCollapsed: boolean;
};

interface SideNavComponent extends FC<SideNavProps> {
  Logo: typeof SideNavLogo;
  PrimaryMenu: typeof SideNavPrimaryMenu;
  PrimaryMenuItem: typeof SideNavPrimaryMenuItem;
  Popover: typeof SideNavPopover;
  Footer: typeof SideNavFooter;
  FooterItem: typeof SideNavFooterItem;
  Panel: typeof SideNavPanel;
}

export const SideNav: SideNavComponent = ({ children, isCollapsed }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <aside
      css={css`
        border-right: 1px solid ${euiTheme.colors.borderBaseSubdued};
        display: flex;
        flex-direction: column;
        gap: ${isCollapsed ? euiTheme.size.s : euiTheme.size.m};
        grid-area: sidenav;
        height: 100%;
        padding-bottom: ${euiTheme.size.base};
        width: var(--sidenav-width);
      `}
    >
      {children}
    </aside>
  );
};

SideNav.Logo = SideNavLogo;
SideNav.PrimaryMenu = SideNavPrimaryMenu;
SideNav.PrimaryMenuItem = SideNavPrimaryMenuItem;
SideNav.Popover = SideNavPopover;
SideNav.Footer = SideNavFooter;
SideNav.FooterItem = SideNavFooterItem;
SideNav.Panel = SideNavPanel;
