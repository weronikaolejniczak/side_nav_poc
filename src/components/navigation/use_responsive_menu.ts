import { useCallback, useRef, useState, RefObject, useEffect } from "react";

import { MenuItem } from "../../types/navigation";
import { PRIMARY_MENU_ITEMS } from "../../constants";

const EXPANDED_MENU_ITEM_HEIGHT = 51;
const COLLAPSED_MENU_ITEM_HEIGHT = 32;
const MAX_MENU_ITEMS = 9;

interface ResponsiveMenuState {
  primaryMenuRef: RefObject<HTMLElement>;
  visibleMenuItems: MenuItem[];
  overflowMenuItems: MenuItem[];
}

interface MenuCalculations {
  availableHeight: number;
  itemHeight: number;
  itemGap: number;
  maxVisibleItems: number;
}

/**
 * Calculates how many menu items can fit in the available space
 */
function calculateVisibleItemCount(calculations: MenuCalculations): number {
  const { availableHeight, itemHeight, itemGap, maxVisibleItems } =
    calculations;

  const availableSlots = Math.floor(availableHeight / (itemHeight + itemGap));
  return Math.min(availableSlots, maxVisibleItems);
}

/**
 * Splits menu items into visible and overflow based on available space
 */
function partitionMenuItems(
  allItems: MenuItem[],
  maxVisibleCount: number
): { visible: MenuItem[]; overflow: MenuItem[] } {
  if (allItems.length <= MAX_MENU_ITEMS) {
    return { visible: allItems, overflow: [] };
  }

  // Reserve one slot for "More" button when we have overflow
  const visibleCount = maxVisibleCount - 1;

  return {
    visible: allItems.slice(0, visibleCount),
    overflow: allItems.slice(visibleCount),
  };
}

/**
 * Custom hook for handling responsive menu behavior with clearer separation of concerns
 * @param isCollapsed - Whether the side nav is collapsed
 * @returns Object with menu ref and partitioned menu items
 */
export function useResponsiveMenu(isCollapsed: boolean): ResponsiveMenuState {
  const primaryMenuRef = useRef<HTMLElement>(null);
  const [visibleMenuItems, setVisibleMenuItems] = useState<MenuItem[]>([]);
  const [overflowMenuItems, setOverflowMenuItems] = useState<MenuItem[]>([]);

  const recalculateMenuLayout = useCallback(() => {
    const menuElement = primaryMenuRef.current;
    if (!menuElement) return;

    const menuRect = menuElement.getBoundingClientRect();
    const itemHeight = isCollapsed
      ? COLLAPSED_MENU_ITEM_HEIGHT
      : EXPANDED_MENU_ITEM_HEIGHT;

    const computedStyle = window.getComputedStyle(menuElement);
    const itemGap = parseFloat(computedStyle.getPropertyValue("gap")) || 0;

    const calculations: MenuCalculations = {
      availableHeight: menuRect.height,
      itemHeight,
      itemGap,
      maxVisibleItems: MAX_MENU_ITEMS,
    };

    const maxVisibleItems = calculateVisibleItemCount(calculations);
    const { visible, overflow } = partitionMenuItems(
      PRIMARY_MENU_ITEMS,
      maxVisibleItems
    );

    setVisibleMenuItems(visible);
    setOverflowMenuItems(overflow);
  }, [isCollapsed]);

  useEffect(() => {
    const observer = new ResizeObserver(recalculateMenuLayout);

    if (primaryMenuRef.current) {
      observer.observe(primaryMenuRef.current);
    }

    // Initial calculation
    recalculateMenuLayout();

    return () => observer.disconnect();
  }, [recalculateMenuLayout]);

  return {
    primaryMenuRef,
    visibleMenuItems,
    overflowMenuItems,
  };
}
