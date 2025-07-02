/** @jsxImportSource @emotion/react */
import { EuiButton, EuiButtonEmpty, IconType, useEuiTheme } from "@elastic/eui";
import { ReactNode } from "react";
import { css } from "@emotion/react";

export type SecondaryMenuItemProps = {
  key: string;
  iconType?: IconType;
  isCurrent: boolean;
  children: ReactNode;
  href: string;
  onClick?: () => void;
};

/**
 * `EuiButton` and `EuiButtonEmpty` are used in this PoC for the sake of simplicity.
 * In a real application, we should consider writing a custom component
 * reusing button styles and applying appropriate semantics (`menuitem` role).
 *
 * The only style overrides are making the button labels left-aligned.
 */
export const SecondaryMenuItem = ({
  iconType,
  isCurrent,
  children,
  href,
  onClick,
}: SecondaryMenuItemProps): JSX.Element => {
  const { euiTheme } = useEuiTheme();

  const iconSide = iconType ? "left" : "right";

  const iconProps = {
    iconSide: iconSide as "left" | "right",
    iconType,
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick?.();
  };

  return (
    <li>
      {isCurrent ? (
        <EuiButton
          css={css`
            // 6px comes from Figma, no token
            padding: 6px ${euiTheme.size.s};

            > span {
              justify-content: ${iconSide === "left"
                ? "flex-start"
                : "space-between"};
            }
          `}
          fullWidth
          href={href}
          onClick={handleClick}
          role="menuitem"
          size="s"
          tabIndex={0}
          textProps={false}
          {...iconProps}
        >
          {children}
        </EuiButton>
      ) : (
        <EuiButtonEmpty
          css={css`
            padding: 6px ${euiTheme.size.s};
            width: 100%;

            > span {
              justify-content: ${iconSide === "left"
                ? "flex-start"
                : "space-between"};
            }
          `}
          color="text"
          href={href}
          onClick={handleClick}
          role="menuitem"
          size="s"
          tabIndex={0}
          textProps={false}
          {...iconProps}
        >
          {children}
        </EuiButtonEmpty>
      )}
    </li>
  );
};
