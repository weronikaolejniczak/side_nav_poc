/** @jsxImportSource @emotion/react */
import { FC, ReactNode, useCallback } from "react";
import { css } from "@emotion/react";
import {
  EuiButtonIcon,
  IconType,
  useEuiTheme,
} from "@elastic/eui";

import { SideNav } from "../side_nav";
import { useNestedMenu } from "./use_nested_menu";

export type PrimaryMenuItemProps = {
  children: ReactNode;
  iconType?: IconType;
  isCurrent?: boolean;
  href?: string;
  onClick?: () => void;
  hasSubmenu?: boolean;
  submenuPanelId?: string;
};

export const PrimaryMenuItem: FC<PrimaryMenuItemProps> = ({
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

  const handleClick = useCallback(() => {
    onClick?.();
    if (hasSubmenu && submenuPanelId) {
      goToPanel(submenuPanelId);
    }
  }, [onClick, hasSubmenu, submenuPanelId, goToPanel]);

  const arrowStyle = css`
    position: absolute;
    right: ${euiTheme.size.s};
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.6;
    pointer-events: none;
  `;

  const wrapperStyle = css`
    position: relative;
    display: block;
    width: 100%;
  `;

  return (
    <div css={wrapperStyle}>
      <SideNav.PrimaryMenuItem
        iconType={iconType}
        isCurrent={isCurrent}
        href={href}
        onClick={handleClick}
        horizontal
      >
        {children}
      </SideNav.PrimaryMenuItem>
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
  );
};
