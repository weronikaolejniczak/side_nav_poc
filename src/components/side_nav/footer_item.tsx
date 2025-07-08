/** @jsxImportSource @emotion/react */
import { forwardRef, ForwardedRef } from "react";
import { css } from "@emotion/react";
import {
  EuiButtonIcon,
  EuiButtonIconProps,
  EuiToolTip,
  IconType,
} from "@elastic/eui";

export interface SideNavFooterItemProps
  extends Omit<EuiButtonIconProps, "iconType"> {
  isCurrent: boolean;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  label: string;
  iconType?: IconType;
  hasContent?: boolean;
}

/**
 * Toggle button pattern: https://eui.elastic.co/docs/components/navigation/buttons/button/#toggle-button
 */
export const SideNavFooterItem = forwardRef<
  HTMLDivElement,
  SideNavFooterItemProps
>(
  (
    { isCurrent, label, iconType, hasContent, ...props },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const wrapperStyles = css`
      display: flex;
      justify-content: center;
      width: 100%;
    `;

    const menuItem = (
      <EuiButtonIcon
        aria-label={label}
        aria-pressed={isCurrent}
        color={isCurrent ? "primary" : "text"}
        display={isCurrent ? "base" : "empty"}
        iconType={iconType || "empty"}
        size="s"
        {...props}
      />
    );

    if (!hasContent)
      return (
        <EuiToolTip
          anchorProps={{
            css: wrapperStyles,
          }}
          disableScreenReaderOutput
          content={label}
          position="right"
        >
          {menuItem}
        </EuiToolTip>
      );

    return (
      <div ref={ref} css={wrapperStyles}>
        {menuItem}
      </div>
    );
  }
);
