/** @jsxImportSource @emotion/react */
import { EuiTitle, useEuiTheme } from "@elastic/eui";
import { FC, ReactNode } from "react";
import { css } from "@emotion/react";

import { SecondaryMenuItem } from "./secondary_menu_item";
import { SecondaryMenuSection } from "./secondary_menu_section";

export type SecondaryMenuProps = {
  title: string;
  children: ReactNode;
  isPanel: boolean;
};

interface SecondaryMenuComponent extends FC<SecondaryMenuProps> {
  Item: typeof SecondaryMenuItem;
  Section: typeof SecondaryMenuSection;
}

/**
 * This menu is reused between the side nav panel and the side nav popover.
 */
export const SecondaryMenu: SecondaryMenuComponent = ({
  title,
  children,
  isPanel,
}) => {
  const { euiTheme } = useEuiTheme();

  return (
    <div>
      <EuiTitle
        css={css`
          position: sticky;
          top: 0;
          z-index: 1;
          background: ${isPanel
            ? euiTheme.colors.backgroundBaseSubdued
            : euiTheme.colors.backgroundBasePlain};
          border-radius: ${euiTheme.border.radius.medium};
          // move into one declaration; 20px is forced by dividers
          padding: ${euiTheme.size.base} 20px;
          padding-bottom: ${euiTheme.size.xs};
        `}
        size="xs"
      >
        <h4>{title}</h4>
      </EuiTitle>
      {children}
    </div>
  );
};

SecondaryMenu.Item = SecondaryMenuItem;
SecondaryMenu.Section = SecondaryMenuSection;
