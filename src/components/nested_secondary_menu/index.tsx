/** @jsxImportSource @emotion/react */
import { useState, useCallback, ReactNode, FC } from "react";

import { SecondaryMenu } from "../secondary_menu";
import { NestedMenuContext } from "./use_nested_menu";
import { Panel } from "./menu_panel";
import { BackButton } from "./back_button";
import { Item } from "./menu_item";
import { PrimaryMenuItem } from "./primary_menu_item";

type NestedSecondaryMenuProps = {
  children: ReactNode;
  initialPanel?: string;
};

const NestedSecondaryMenuRoot: FC<NestedSecondaryMenuProps> = ({
  children,
  initialPanel = "main",
}) => {
  const [currentPanel, setCurrentPanel] = useState(initialPanel);
  const [panelStack, setPanelStack] = useState<string[]>([]);

  const goToPanel = useCallback(
    (panelId: string) => {
      setPanelStack((prev) => [...prev, currentPanel]);
      setCurrentPanel(panelId);
    },
    [currentPanel]
  );

  const goBack = useCallback(() => {
    const previousPanel = panelStack[panelStack.length - 1];
    if (previousPanel) {
      setCurrentPanel(previousPanel);
      setPanelStack((prev) => prev.slice(0, -1));
    }
  }, [panelStack]);

  const contextValue = {
    currentPanel,
    goToPanel,
    goBack,
    canGoBack: panelStack.length > 0,
  };

  return (
    <NestedMenuContext.Provider value={contextValue}>
      {children}
    </NestedMenuContext.Provider>
  );
};

interface NestedSecondaryMenuComponent extends FC<NestedSecondaryMenuProps> {
  Panel: typeof Panel;
  BackButton: typeof BackButton;
  Item: typeof Item;
  PrimaryMenuItem: typeof PrimaryMenuItem;
  Section: typeof SecondaryMenu.Section;
}

export const NestedSecondaryMenu: NestedSecondaryMenuComponent =
  NestedSecondaryMenuRoot as NestedSecondaryMenuComponent;

NestedSecondaryMenu.Panel = Panel;
NestedSecondaryMenu.BackButton = BackButton;
NestedSecondaryMenu.Item = Item;
NestedSecondaryMenu.PrimaryMenuItem = PrimaryMenuItem;
NestedSecondaryMenu.Section = SecondaryMenu.Section;
