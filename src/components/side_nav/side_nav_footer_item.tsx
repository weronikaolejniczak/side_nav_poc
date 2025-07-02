/** @jsxImportSource @emotion/react */
import { forwardRef, ForwardedRef } from "react";
import { css } from "@emotion/react";
import { EuiButtonIcon, EuiButtonIconProps, IconType } from "@elastic/eui";

export interface SideNavFooterItemProps
  extends Omit<EuiButtonIconProps, "iconType"> {
  isCurrent: boolean;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  label: string;
  iconType?: IconType;
}

/**
 * Toggle button pattern: https://eui.elastic.co/docs/components/navigation/buttons/button/#toggle-button
 */
export const SideNavFooterItem = forwardRef<
  HTMLDivElement,
  SideNavFooterItemProps
>(
  (
    { isCurrent, label, iconType, ...props },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        css={css`
          display: flex;
          justify-content: center;
          width: 100%;
        `}
      >
        <EuiButtonIcon
          aria-label={label}
          aria-pressed={isCurrent}
          color={isCurrent ? "primary" : "text"}
          display={isCurrent ? "base" : "empty"}
          iconType={iconType || "empty"}
          size="s"
          {...props}
        />
      </div>
    );
  }
);
