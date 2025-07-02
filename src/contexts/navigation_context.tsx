import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useCallback,
} from "react";

import { MenuItem, SecondaryMenuItem } from "../types/navigation";
import { PRIMARY_MENU_ITEMS } from "../constants";
import {
  NavigationState,
  navigationReducer,
  NavigationService,
} from "../services/navigation_service";

interface NavigationContextValue extends NavigationState {
  isSidePanelOpen: boolean;
  toggleCollapsed: () => void;
  setCollapsed: (collapsed: boolean) => void;
  navigateTo: (
    primaryMenuItem: MenuItem,
    secondaryMenuItem?: SecondaryMenuItem | undefined
  ) => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(
  undefined
);

interface NavigationProviderProps {
  children: ReactNode;
  initialMenuItem?: MenuItem;
}

export const NavigationProvider = ({
  children,
  initialMenuItem = PRIMARY_MENU_ITEMS[0],
}: NavigationProviderProps) => {
  const [state, dispatch] = useReducer(
    navigationReducer,
    NavigationService.getInitialState(initialMenuItem)
  );

  const isSidePanelOpen = NavigationService.shouldShowSidePanel(state);

  const toggleCollapsed = useCallback(() => {
    dispatch({ type: "TOGGLE_COLLAPSED" });
  }, []);

  const setCollapsed = useCallback((collapsed: boolean) => {
    dispatch({
      type: "SET_COLLAPSED",
      payload: { isCollapsed: collapsed },
    });
  }, []);

  const navigateTo = useCallback(
    (
      primaryMenuItem: MenuItem,
      secondaryMenuItem: SecondaryMenuItem | undefined
    ) => {
      dispatch({
        type: "NAVIGATE_TO",
        payload: { primaryMenuItem, secondaryMenuItem },
      });
    },
    []
  );

  const contextValue: NavigationContextValue = {
    ...state,
    isSidePanelOpen,
    toggleCollapsed,
    setCollapsed,
    navigateTo,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextValue => {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error(
      "useNavigation must be used within a NavigationProvider. " +
        "Make sure your component is wrapped with NavigationProvider."
    );
  }

  return context;
};
