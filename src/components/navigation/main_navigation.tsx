/** @jsxImportSource @emotion/react */
import { EuiButtonIcon, EuiText, useIsWithinBreakpoints } from "@elastic/eui";
import { useRef, KeyboardEvent } from "react";

import { Content } from "../content";
import { Layout } from "../layout";
import { Main } from "../main";
import { SideNav } from "../side_nav";
import { TopBar } from "../top_bar";
import { LOGO, PRIMARY_MENU_FOOTER_ITEMS } from "../../constants";
import { useResponsiveMenu } from "./use_responsive_menu";
import { MenuItem, SecondaryMenuItem } from "../../types/navigation";
import { hasSubmenu } from "../../utils/has_submenu";
import { SubMenuContent } from "./sub_menu_content";
import { MoreMenu } from "./more_menu";

const FOOTER_ITEM_LIMIT = 5;

export interface MainNavigationProps {
  currentPage: string;
  currentSubpage: string | null;
  sidePanelContent: MenuItem | null;
  isCollapsed: boolean;
  isSidePanelOpen: boolean;
  toggleCollapsed: () => void;
  navigateTo: (primaryMenuItem: MenuItem, secondaryMenuItem?: SecondaryMenuItem) => void;
}

export const MainNavigation = ({
  currentPage,
  currentSubpage,
  sidePanelContent,
  isCollapsed: isCollapsedProp,
  isSidePanelOpen,
  toggleCollapsed,
  navigateTo,
}: MainNavigationProps): JSX.Element => {
  const mainRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsWithinBreakpoints(["xs", "s"]);
  const isCollapsed = isMobile || isCollapsedProp;

  const { primaryMenuRef, visibleMenuItems, overflowMenuItems } =
    useResponsiveMenu(isCollapsed);

  const handleMainItemClick = (item: MenuItem) => {
    navigateTo(item);
    mainRef.current?.focus();
  };

  return (
    <Layout isSidePanelOpen={isSidePanelOpen} isCollapsed={isCollapsed}>
      <TopBar>
        {!isMobile && (
          <EuiButtonIcon
            aria-label={
              isCollapsed
                ? "Expand navigation menu"
                : "Collapse navigation menu"
            }
            aria-controls="primary-navigation"
            aria-expanded={!isCollapsed}
            color="text"
            iconType={isCollapsed ? "transitionLeftIn" : "transitionLeftOut"}
            onClick={toggleCollapsed}
            size="s"
          />
        )}
      </TopBar>
      <SideNav isCollapsed={isCollapsed}>
        <SideNav.Logo label={LOGO.label} logoType={LOGO.logoType} isCollapsed={isCollapsed} />
        <SideNav.PrimaryMenu ref={primaryMenuRef} isCollapsed={isCollapsed}>
          {visibleMenuItems.map((item) => (
            <SideNav.Popover
              key={item.id}
              container={document.documentElement}
              hasContent={hasSubmenu(item)}
              isSidePanelOpen={!isCollapsed && item.id === sidePanelContent?.id}
              trigger={
                <SideNav.PrimaryMenuItem
                  href={item.href}
                  iconType={item.iconType}
                  isCurrent={item.id === sidePanelContent?.id}
                  hasContent={hasSubmenu(item)}
                  onClick={() => handleMainItemClick(item)}
                  isCollapsed={isCollapsed}
                >
                  {item.label}
                </SideNav.PrimaryMenuItem>
              }
            >
              {(closePopover) => (
                <SubMenuContent 
                  item={item} 
                  closePopover={closePopover}
                  currentPage={currentPage}
                  currentSubpage={currentSubpage}
                  navigateTo={navigateTo}
                />
              )}
            </SideNav.Popover>
          ))}
          <MoreMenu
            overflowMenuItems={overflowMenuItems}
            sidePanelContent={sidePanelContent}
            currentPage={currentPage}
            currentSubpage={currentSubpage}
            isCollapsed={isCollapsed}
            navigateTo={navigateTo}
          />
        </SideNav.PrimaryMenu>
        <SideNav.Footer isCollapsed={isCollapsed}>
          {PRIMARY_MENU_FOOTER_ITEMS.slice(0, FOOTER_ITEM_LIMIT).map((item) => (
            <SideNav.Popover
              key={item.id}
              isSidePanelOpen={!isCollapsed && item.id === sidePanelContent?.id}
              hasContent={hasSubmenu(item)}
              persistent={false}
              container={document.documentElement}
              trigger={
                <SideNav.FooterItem
                  isCurrent={item.id === sidePanelContent?.id}
                  onClick={() => navigateTo(item)}
                  hasContent={hasSubmenu(item)}
                  onKeyDown={(e: KeyboardEvent) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      navigateTo(item);
                    }
                  }}
                  label={item.label}
                  iconType={item.iconType}
                />
              }
            >
              {(closePopover) => (
                <SubMenuContent 
                  item={item} 
                  closePopover={closePopover}
                  currentPage={currentPage}
                  currentSubpage={currentSubpage}
                  navigateTo={navigateTo}
                />
              )}
            </SideNav.Popover>
          ))}
        </SideNav.Footer>
      </SideNav>
      {isSidePanelOpen && sidePanelContent && (
        <SideNav.Panel>
          <SubMenuContent 
            item={sidePanelContent} 
            isPanel
            currentPage={currentPage}
            currentSubpage={currentSubpage}
            navigateTo={navigateTo}
          />
        </SideNav.Panel>
      )}
      <Main ref={mainRef}>
        <Content>
          <EuiText color="subdued">
            Page content for {currentPage && <span>href: {currentPage}</span>}
            {currentSubpage && <span> &mdash; Subpage: {currentSubpage}</span>}
          </EuiText>
        </Content>
      </Main>
    </Layout>
  );
};
