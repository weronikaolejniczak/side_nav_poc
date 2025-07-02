import { MenuItem, SecondaryMenuItem } from "../types/navigation";

export interface NavigationState {
  currentPage: string;
  currentSubpage: string | null;
  sidePanelContent: MenuItem | null;
  isCollapsed: boolean;
}

export interface NavigationAction {
  type: "NAVIGATE_TO" | "TOGGLE_COLLAPSED" | "SET_COLLAPSED";
  payload?: {
    primaryMenuItem?: MenuItem;
    secondaryMenuItem?: SecondaryMenuItem;
    isCollapsed?: boolean;
  };
}

/**
 * Pure function to handle navigation state transitions
 */
export function navigationReducer(
  state: NavigationState,
  action: NavigationAction
): NavigationState {
  switch (action.type) {
    case "NAVIGATE_TO": {
      const { primaryMenuItem, secondaryMenuItem } = action.payload || {};

      if (!primaryMenuItem) return state;

      return {
        ...state,
        currentPage: primaryMenuItem.href,
        currentSubpage: secondaryMenuItem?.href || null,
        sidePanelContent: primaryMenuItem,
      };
    }

    case "TOGGLE_COLLAPSED":
      return {
        ...state,
        isCollapsed: !state.isCollapsed,
      };

    case "SET_COLLAPSED":
      return {
        ...state,
        isCollapsed: action.payload?.isCollapsed ?? state.isCollapsed,
      };

    default:
      return state;
  }
}

/**
 * Service for navigation-related business logic
 */
export class NavigationService {
  /**
   * Determines if a side panel should be open
   */
  static shouldShowSidePanel(state: NavigationState): boolean {
    return !state.isCollapsed && !!state.sidePanelContent?.sections;
  }

  /**
   * Checks if a menu item is currently active
   */
  static isMenuItemActive(
    item: MenuItem | SecondaryMenuItem,
    state: NavigationState
  ): boolean {
    if ("href" in item && item.href) {
      return (
        item.href === state.currentPage || item.href === state.currentSubpage
      );
    }
    return false;
  }

  /**
   * Gets the default navigation state
   */
  static getInitialState(defaultMenuItem: MenuItem): NavigationState {
    return {
      currentPage: defaultMenuItem.href,
      currentSubpage: null,
      sidePanelContent: defaultMenuItem,
      isCollapsed: false,
    };
  }
}
