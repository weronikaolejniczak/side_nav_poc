import { MenuItem, SecondaryMenuItem } from "../types/navigation";

/**
 * Utility functions for menu-related operations
 */
export class MenuUtils {
  /**
   * Checks if a menu item has submenu content
   */
  static hasSubmenu(item: MenuItem): boolean {
    return !!item.sections && item.sections.length > 0;
  }

  /**
   * Finds a menu item by ID in a flat or nested structure
   */
  static findMenuItemById(
    items: MenuItem[],
    id: string
  ): MenuItem | SecondaryMenuItem | null {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }

      if (item.sections) {
        for (const section of item.sections) {
          const found = section.items.find((subItem) => subItem.id === id);
          if (found) {
            return found;
          }
        }
      }
    }

    return null;
  }

  /**
   * Gets all menu items in a flat array (including nested ones)
   */
  static flattenMenuItems(items: MenuItem[]): (MenuItem | SecondaryMenuItem)[] {
    const flattened: (MenuItem | SecondaryMenuItem)[] = [];

    for (const item of items) {
      flattened.push(item);

      if (item.sections) {
        for (const section of item.sections) {
          flattened.push(...section.items);
        }
      }
    }

    return flattened;
  }

  /**
   * Generates aria-label for menu items
   */
  static generateAriaLabel(
    item: MenuItem | SecondaryMenuItem,
    isCurrent: boolean = false
  ): string {
    const currentText = isCurrent ? ", current page" : "";
    return `${item.label}${currentText}`;
  }

  /**
   * Validates menu item structure
   */
  static validateMenuItem(item: MenuItem): boolean {
    if (!item.id || !item.label) {
      return false;
    }

    if (item.sections) {
      return item.sections.every((section) =>
        section.items.every((subItem) => subItem.id && subItem.label)
      );
    }

    return true;
  }
}
