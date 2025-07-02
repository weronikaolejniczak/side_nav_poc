/** @jsxImportSource @emotion/react */
import { forwardRef, ForwardedRef, ReactNode, MouseEvent } from "react";
import { css } from "@emotion/react";
import {
  EuiIcon,
  EuiScreenReaderOnly,
  EuiText,
  IconType,
  useEuiTheme,
} from "@elastic/eui";

export type SideNavPrimaryMenuItemProps = {
  isCollapsed: boolean;
  isCurrent: boolean;
  children: ReactNode;
  href?: string;
  iconType?: IconType;
  onClick?: () => void;
};

export const SideNavPrimaryMenuItem = forwardRef<
  HTMLAnchorElement,
  SideNavPrimaryMenuItemProps
>(
  (
    { isCurrent, iconType, children, isCollapsed, onClick, href, ...props },
    ref: ForwardedRef<HTMLAnchorElement>
  ): JSX.Element => {
    const { euiTheme } = useEuiTheme();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClick?.();
    };

    const label = (
      <EuiText className="label" size="xs" textAlign="center">
        {children}
      </EuiText>
    );

    const wrapperStyles = css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const buttonStyles = css`
      position: relative;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: column;
      // 3px is from Figma; there is no token
      gap: 3px;
      // We apply the outline to the icon wrapper
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

    return (
      <div css={wrapperStyles}>
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
      </div>
    );
  }
);
