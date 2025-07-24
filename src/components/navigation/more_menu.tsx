/** @jsxImportSource @emotion/react */
import { SideNav } from "../side_nav";
import { SecondaryMenu } from "../secondary_menu";
import { NestedSecondaryMenu } from "../nested_secondary_menu";
import { MenuItem, SecondaryMenuItem } from "../../types/navigation";
import { hasSubmenu } from "../../utils/has_submenu";

type MoreMenuProps = {
  overflowMenuItems: MenuItem[];
  sidePanelContent?: MenuItem | null;
  currentPage: string;
  currentSubpage: string | null;
  isCollapsed: boolean;
  navigateTo: (primaryMenuItem: MenuItem, secondaryMenuItem?: SecondaryMenuItem) => void;
};

export const MoreMenu = ({
  overflowMenuItems,
  sidePanelContent,
  currentPage,
  currentSubpage,
  isCollapsed,
  navigateTo,
}: MoreMenuProps): JSX.Element | null => {

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
          hasContent
          isCollapsed={isCollapsed}
        >
          More
        </SideNav.PrimaryMenuItem>
      }
    >
      {(closePopover) =>
        isCollapsed ? (
          <NestedSecondaryMenu>
            <NestedSecondaryMenu.Panel id="main" title="More">
              <NestedSecondaryMenu.Section hasGap label={null}>
                {overflowMenuItems.map((item) => {
                  const isCurrent =
                    item.href === currentPage || item.href === currentSubpage;
                  const hasSubItems = hasSubmenu(item);

                  return (
                    <NestedSecondaryMenu.PrimaryMenuItem
                      key={item.id}
                      iconType={item.iconType}
                      isCurrent={isCurrent}
                      href={item.href}
                      hasSubmenu={hasSubItems}
                      submenuPanelId={
                        hasSubItems ? `submenu-${item.id}` : undefined
                      }
                      onClick={() => {
                        if (!hasSubItems) {
                          navigateTo(item);
                          closePopover();
                        }
                      }}
                    >
                      {item.label}
                    </NestedSecondaryMenu.PrimaryMenuItem>
                  );
                })}
              </NestedSecondaryMenu.Section>
            </NestedSecondaryMenu.Panel>
            {overflowMenuItems.filter(hasSubmenu).map((item) => (
              <NestedSecondaryMenu.Panel
                key={`submenu-${item.id}`}
                id={`submenu-${item.id}`}
              >
                <NestedSecondaryMenu.BackButton title={item.label} />
                {item.sections?.map((section) => (
                  <NestedSecondaryMenu.Section
                    key={section.id}
                    label={section.label}
                    hasGap={!!section.label}
                  >
                    {section.items.map((subItem) => (
                      <NestedSecondaryMenu.Item
                        key={subItem.id}
                        iconType={subItem.iconType}
                        isCurrent={
                          (subItem.href && currentSubpage === subItem.href) ||
                          (!currentSubpage && subItem.href === currentPage)
                        }
                        href={subItem.href}
                        onClick={() => {
                          navigateTo(item, subItem);
                          closePopover();
                        }}
                      >
                        {subItem.label}
                      </NestedSecondaryMenu.Item>
                    ))}
                  </NestedSecondaryMenu.Section>
                ))}
              </NestedSecondaryMenu.Panel>
            ))}
          </NestedSecondaryMenu>
        ) : (
          <SecondaryMenu title="More" isPanel={false}>
            <SecondaryMenu.Section hasGap label={null}>
              {overflowMenuItems.map((item) => {
                const isCurrent =
                  item.href === currentPage || item.href === currentSubpage;

                return (
                  <SideNav.PrimaryMenuItem
                    key={item.id}
                    iconType={item.iconType}
                    isCurrent={isCurrent}
                    href={item.href}
                    hasContent
                    onClick={() => {
                      navigateTo(item);
                      closePopover();
                    }}
                    horizontal
                    isCollapsed={isCollapsed}
                  >
                    {item.label}
                  </SideNav.PrimaryMenuItem>
                );
              })}
            </SecondaryMenu.Section>
          </SecondaryMenu>
        )
      }
    </SideNav.Popover>
  );
};
