/** @jsxImportSource @emotion/react */
import { EuiButtonIcon, EuiText } from "@elastic/eui";
import { useCallback, useRef } from "react";

import { Content } from "../content";
import { Layout } from "../layout";
import { Main } from "../main";
import { SecondaryMenu } from "../secondary_menu";
import { SideNav } from "../side_nav";
import { TopBar } from "../top_bar";
import { LOGO, PRIMARY_MENU_FOOTER_ITEMS } from "../../constants";
import { useNavigation } from "../../contexts/navigation_context";
import { useResponsiveMenu } from "./use_responsive_menu";
import { MenuItem } from "../../types/navigation";
import { MenuUtils } from "../../utils/menu_utils";

export const MainNavigation = (): JSX.Element => {
  const mainRef = useRef<HTMLDivElement>(null);

  const {
    isCollapsed,
    toggleCollapsed,
    currentPage,
    currentSubpage,
    sidePanelContent,
    isSidePanelOpen,
    navigateTo,
  } = useNavigation();

  const { primaryMenuRef, visibleMenuItems, overflowMenuItems } =
    useResponsiveMenu(isCollapsed);

  const renderSubMenu = useCallback(
    (
      item: MenuItem,
      isPanel: boolean,
      closePopover?: () => void
    ): JSX.Element | null => {
      if (!MenuUtils.hasSubmenu(item)) return null;

      return (
        <SecondaryMenu title={item.label} isPanel={isPanel}>
          {item.sections!.map((section) => (
            <SecondaryMenu.Section key={section.id} label={section.label}>
              {section.items.map((subItem) => (
                <SecondaryMenu.Item
                  key={subItem.id}
                  isCurrent={
                    (subItem.href && currentSubpage === subItem.href) ||
                    (!currentSubpage && subItem.href === currentPage)
                  }
                  href={subItem.href}
                  onClick={
                    subItem.href
                      ? () => {
                          if (item.href && subItem.href === item.href) {
                            navigateTo(item);
                            closePopover?.();
                          } else {
                            navigateTo(item, subItem);
                            closePopover?.();
                            mainRef.current?.focus();
                          }
                        }
                      : undefined
                  }
                >
                  {subItem.label}
                </SecondaryMenu.Item>
              ))}
            </SecondaryMenu.Section>
          ))}
        </SecondaryMenu>
      );
    },
    [navigateTo, currentPage, currentSubpage]
  );

  const handleMainItemClick = useCallback(
    (item: MenuItem) => {
      navigateTo(item);
      mainRef.current?.focus();
    },
    [navigateTo]
  );

  const renderPrimaryMenuItem = useCallback(
    (item: MenuItem) => (
      <SideNav.Popover
        key={item.id}
        container={document.documentElement}
        hasContent={MenuUtils.hasSubmenu(item)}
        isSidePanelOpen={!isCollapsed && item.id === sidePanelContent?.id}
        trigger={
          <SideNav.PrimaryMenuItem
            href={item.href}
            iconType={item.iconType}
            isCollapsed={isCollapsed}
            isCurrent={item.id === sidePanelContent?.id}
            hasContent={MenuUtils.hasSubmenu(item)}
            onClick={() => handleMainItemClick(item)}
          >
            {item.label}
          </SideNav.PrimaryMenuItem>
        }
      >
        {(closePopover) => renderSubMenu(item, false, closePopover)}
      </SideNav.Popover>
    ),
    [isCollapsed, sidePanelContent, handleMainItemClick, renderSubMenu]
  );

  const renderMoreMenu = useCallback(() => {
    if (overflowMenuItems.length === 0) return null;

    return (
      <SideNav.Popover
        container={document.documentElement}
        hasContent
        isSidePanelOpen={false}
        persistent
        trigger={
          <SideNav.PrimaryMenuItem
            isCurrent={overflowMenuItems.some(
              (item) => item.id === sidePanelContent?.id
            )}
            iconType="boxesHorizontal"
            isCollapsed={isCollapsed}
            hasContent
          >
            More
          </SideNav.PrimaryMenuItem>
        }
      >
        {(closePopover) => (
          <SecondaryMenu title="More" isPanel={false}>
            <SecondaryMenu.Section hasGap label={null}>
              {overflowMenuItems.map((item) => (
                <SideNav.PrimaryMenuItem
                  key={item.id}
                  iconType={item.iconType}
                  isCurrent={
                    item.href === currentPage || item.href === currentSubpage
                  }
                  horizontal
                  href={item.href}
                  onClick={() => {
                    navigateTo(item);
                    closePopover();
                  }}
                >
                  {item.label}
                </SideNav.PrimaryMenuItem>
              ))}
            </SecondaryMenu.Section>
          </SecondaryMenu>
        )}
      </SideNav.Popover>
    );
  }, [
    overflowMenuItems,
    sidePanelContent,
    isCollapsed,
    currentPage,
    currentSubpage,
    navigateTo,
  ]);

  return (
    <Layout isSidePanelOpen={isSidePanelOpen} isCollapsed={isCollapsed}>
      <TopBar>
        <EuiButtonIcon
          aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
          color="text"
          iconType={isCollapsed ? "transitionLeftIn" : "transitionLeftOut"}
          onClick={toggleCollapsed}
          size="s"
        />
      </TopBar>

      <SideNav isCollapsed={isCollapsed}>
        <SideNav.Logo
          isCollapsed={isCollapsed}
          label={LOGO.label}
          logoType={LOGO.logoType}
        />

        <SideNav.PrimaryMenu ref={primaryMenuRef} isCollapsed={isCollapsed}>
          {visibleMenuItems.map(renderPrimaryMenuItem)}
          {renderMoreMenu()}
        </SideNav.PrimaryMenu>

        <SideNav.Footer isCollapsed={isCollapsed}>
          {PRIMARY_MENU_FOOTER_ITEMS.map((item) => (
            <SideNav.Popover
              key={item.id}
              isSidePanelOpen={!isCollapsed && item.id === sidePanelContent?.id}
              hasContent={MenuUtils.hasSubmenu(item)}
              persistent={false}
              container={document.documentElement}
              trigger={
                <SideNav.FooterItem
                  isCurrent={item.id === sidePanelContent?.id}
                  onClick={() => navigateTo(item)}
                  hasContent={MenuUtils.hasSubmenu(item)}
                  onKeyDown={(e: React.KeyboardEvent) => {
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
              {(closePopover) => renderSubMenu(item, false, closePopover)}
            </SideNav.Popover>
          ))}
        </SideNav.Footer>
      </SideNav>

      {isSidePanelOpen && sidePanelContent && (
        <SideNav.Panel>{renderSubMenu(sidePanelContent, true)}</SideNav.Panel>
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
