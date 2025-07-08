/** @jsxImportSource @emotion/react */
import { createContext, useContext } from "react";

interface NestedMenuContextValue {
  currentPanel: string;
  goToPanel: (panelId: string) => void;
  goBack: () => void;
  canGoBack: boolean;
}

export const NestedMenuContext = createContext<NestedMenuContextValue | null>(
  null
);

export const useNestedMenu = () => {
  const context = useContext(NestedMenuContext);
  if (!context) {
    throw new Error("useNestedMenu must be used within a NestedSecondaryMenu");
  }
  return context;
};
