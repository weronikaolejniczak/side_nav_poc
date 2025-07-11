/** @jsxImportSource @emotion/react */
import { useRef } from "react";

import { SecondaryMenu } from "../secondary_menu";
import { MenuItem } from "../../types/navigation";
import { hasSubmenu } from "../../utils/has_submenu";
import { useNavigation } from "./use_navigation";

interface SubMenuContentProps {
  closePopover?: () => void;
  isPanel?: boolean;
  item: MenuItem;
}

export const SubMenuContent = ({
  closePopover,
  isPanel = false,
  item,
}: SubMenuContentProps): JSX.Element | null => {
  const mainRef = useRef<HTMLDivElement>(null);

  const { navigateTo, currentPage, currentSubpage } = useNavigation();

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
