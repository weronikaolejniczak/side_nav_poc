/** @jsxImportSource @emotion/react */
import { EuiTitle, useEuiTheme } from "@elastic/eui";
import { FC, ReactNode } from "react";
import { css } from "@emotion/react";

import { SecondaryMenuItem } from "./item";
import { SecondaryMenuSection } from "./section";
import { useMenuHeaderStyle } from "../../hooks/use_menu_header_style";

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
  const headerStyle = useMenuHeaderStyle();

  return (
    <div>
      <EuiTitle
        css={css`
          ${headerStyle}
          background: ${isPanel
            ? euiTheme.colors.backgroundBaseSubdued
            : euiTheme.colors.backgroundBasePlain};
          border-radius: ${euiTheme.border.radius.medium};
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
