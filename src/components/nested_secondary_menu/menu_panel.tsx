/** @jsxImportSource @emotion/react */
import { FC, ReactNode } from "react";

import { SecondaryMenu } from "../secondary_menu";
import { useNestedMenu } from "./use_nested_menu";

export type PanelProps = {
  id: string;
  title?: string;
  children: ReactNode;
};

export const Panel: FC<PanelProps> = ({ id, title, children }) => {
  const { currentPanel } = useNestedMenu();

  if (currentPanel !== id) {
    return null;
  }

  if (title) {
    return (
      <SecondaryMenu title={title} isPanel={false}>
        {children}
      </SecondaryMenu>
    );
  }

  return <div>{children}</div>;
};
