/** @jsxImportSource @emotion/react */
import { EuiButtonIcon, useEuiTheme, IconType } from "@elastic/eui";
import { FC, ReactNode, useCallback } from "react";
import { css } from "@emotion/react";

import { SecondaryMenu } from "../secondary_menu";
import { useNestedMenu } from "./use_nested_menu";

export type ItemProps = {
  children: ReactNode;
  iconType?: IconType;
  isCurrent?: boolean;
  href?: string;
  onClick?: () => void;
  hasSubmenu?: boolean;
  submenuPanelId?: string;
};

export const Item: FC<ItemProps> = ({
  children,
  iconType,
  isCurrent = false,
  href,
  onClick,
  hasSubmenu = false,
  submenuPanelId,
}) => {
  const { goToPanel } = useNestedMenu();
  const { euiTheme } = useEuiTheme();

  const itemStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `;

  const arrowStyle = css`
    margin-left: ${euiTheme.size.xs};
    opacity: 0.6;
    pointer-events: none;
  `;

  const handleClick = useCallback(() => {
    onClick?.();
    if (hasSubmenu && submenuPanelId) {
      goToPanel(submenuPanelId);
    }
  }, [onClick, hasSubmenu, submenuPanelId, goToPanel]);

  return (
    <SecondaryMenu.Item
      key={`nested-item-${href || Math.random()}`}
      iconType={iconType}
      isCurrent={isCurrent}
      href={href || ""}
      onClick={handleClick}
    >
      <div css={itemStyle}>
        <span>{children}</span>
        {hasSubmenu && (
          <EuiButtonIcon
            css={arrowStyle}
            aria-label={`${children} has submenu`}
            iconType="arrowRight"
            size="xs"
            color="text"
            display="empty"
          />
        )}
      </div>
    </SecondaryMenu.Item>
  );
};
