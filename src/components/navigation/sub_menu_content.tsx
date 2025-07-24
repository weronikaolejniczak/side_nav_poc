/** @jsxImportSource @emotion/react */
import { useRef } from "react";

import { SecondaryMenu } from "../secondary_menu";
import { MenuItem, SecondaryMenuItem } from "../../types/navigation";
import { hasSubmenu } from "../../utils/has_submenu";

interface SubMenuContentProps {
  closePopover?: () => void;
  isPanel?: boolean;
  item: MenuItem;
  currentPage: string;
  currentSubpage: string | null;
  navigateTo: (primaryMenuItem: MenuItem, secondaryMenuItem?: SecondaryMenuItem) => void;
}

export const SubMenuContent = ({
  closePopover,
  isPanel = false,
  item,
  currentPage,
  currentSubpage,
  navigateTo,
}: SubMenuContentProps): JSX.Element | null => {
  const mainRef = useRef<HTMLDivElement>(null);

  const handleClick = (item: MenuItem, subItem: MenuItem) => {
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
      : undefined;
  };

  if (!hasSubmenu(item)) return null;
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
              onClick={() => handleClick(item, subItem)}
            >
              {subItem.label}
            </SecondaryMenu.Item>
          ))}
        </SecondaryMenu.Section>
      ))}
    </SecondaryMenu>
  );
};
