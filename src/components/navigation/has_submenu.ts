import { MenuItem } from "../../types/navigation";

/**
 * Checks if a menu item has submenu content
 */
export const hasSubmenu = (item: MenuItem): boolean => {
  return !!item.sections && item.sections.length > 0;
};
