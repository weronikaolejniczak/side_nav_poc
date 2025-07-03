/** @jsxImportSource @emotion/react */
import { forwardRef, ForwardedRef, ReactNode, MouseEvent } from "react";
import { css } from "@emotion/react";
import {
  EuiIcon,
  EuiScreenReaderOnly,
  EuiText,
  EuiToolTip,
  IconType,
  useEuiTheme,
} from "@elastic/eui";

export type SideNavPrimaryMenuItemProps = {
  children: ReactNode;
  hasContent?: boolean;
  horizontal?: boolean;
  href?: string;
  iconType?: IconType;
  isCollapsed?: boolean;
  isCurrent: boolean;
  onClick?: () => void;
};

export const SideNavPrimaryMenuItem = forwardRef<
  HTMLAnchorElement,
  SideNavPrimaryMenuItemProps
>(
  (
    {
      children,
      hasContent,
      horizontal,
      href,
      iconType,
      isCollapsed,
      isCurrent,
      onClick,
      ...props
    },
    ref: ForwardedRef<HTMLAnchorElement>
  ): JSX.Element => {
    const { euiTheme } = useEuiTheme();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClick?.();
    };

    const label = (
      <EuiText
        className="label"
        size={horizontal ? "s" : "xs"}
        textAlign="center"
      >
        {children}
      </EuiText>
    );

    const wrapperStyles = css`
      display: flex;
      justify-content: center;
      width: 100%;
    `;

    const buttonStyles = css`
      position: relative;
      overflow: hidden;
      align-items: center;
      justify-content: ${horizontal ? "initial" : "center"};
      display: flex;
      flex-direction: ${horizontal ? "row" : "column"};
      // 3px is from Figma; there is no token
      gap: ${horizontal ? euiTheme.size.s : "3px"};
      outline: none !important;
      color: ${isCurrent
        ? euiTheme.components.buttons.textColorPrimary
        : euiTheme.components.buttons.textColorText};

      .iconWrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: ${euiTheme.size.xl};
        width: ${euiTheme.size.xl};
        border-radius: ${euiTheme.border.radius.medium};
        background-color: ${isCurrent
          ? euiTheme.components.buttons.backgroundPrimary
          : horizontal
          ? euiTheme.colors.backgroundBaseSubdued
          : euiTheme.components.buttons.backgroundText};
        z-index: 1;
      }

      .iconWrapper::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: ${euiTheme.border.radius.medium};
        background-color: transparent;
        z-index: 0;
      }

      // source: https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
      &:focus-visible .iconWrapper {
        border: 2px solid
          ${isCurrent
            ? euiTheme.colors.textPrimary
            : euiTheme.colors.textParagraph};
      }

      &:hover .iconWrapper::before {
        background-color: ${isCurrent
          ? euiTheme.components.buttons.backgroundPrimaryHover
          : euiTheme.components.buttons.backgroundTextHover};
      }

      &:active .iconWrapper::before {
        background-color: ${isCurrent
          ? euiTheme.components.buttons.backgroundPrimaryActive
          : euiTheme.components.buttons.backgroundTextActive};
      }

      &:hover,
      &:active {
        color: ${isCurrent
          ? euiTheme.components.buttons.textColorPrimary
          : euiTheme.components.buttons.textColorText};
      }
    `;

    const menuItem = (
      <a
        ref={ref}
        aria-pressed={isCurrent}
        css={buttonStyles}
        role="menuitem"
        href={href}
        onClick={handleClick}
        {...props}
      >
        <div className="iconWrapper">
          <EuiIcon
            aria-hidden
            color="currentColor"
            type={iconType || "empty"}
          />
        </div>
        {isCollapsed ? (
          <EuiScreenReaderOnly>{label}</EuiScreenReaderOnly>
        ) : (
          label
        )}
      </a>
    );

    // Show tooltip when collapsed and item doesn't have a submenu
    if (!horizontal && isCollapsed && !hasContent) {
      return (
        <EuiToolTip
          anchorProps={{
            css: wrapperStyles,
          }}
          content={children}
          position="right"
          disableScreenReaderOutput
        >
          {menuItem}
        </EuiToolTip>
      );
    }

    return menuItem;
  }
);
