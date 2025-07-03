/** @jsxImportSource @emotion/react */
import { EuiText, useEuiTheme } from "@elastic/eui";
import { ReactNode } from "react";
import { css } from "@emotion/react";

export type SecondaryMenuSectionProps = {
  children: ReactNode;
  hasGap?: boolean;
  label: string | null;
};

/**
 * To reflex the Figma pixel-perfect while maintaining a logical structure,
 * we need to use `6px` and `10px` which are not multiples of 4, hence why
 * `euiTheme` is not used for padding here.
 *
 * Furthermore, `236px` is not available in `euiTheme` as a constant,
 * so we use it directly.
 *
 * `EuiTitle` provides styles inconsistent with design, and `EuiText` doesn't allow
 * `h5` usage so semantically, the structure could use improvement.
 *
 * In a real application, we should always use `euiTheme` for consistency.
 */
export const SecondaryMenuSection = ({
  children,
  hasGap,
  label,
}: SecondaryMenuSectionProps): JSX.Element => {
  const { euiTheme } = useEuiTheme();

  const sectionId = label
    ? label.replace(/\s+/g, "-").toLowerCase()
    : undefined;

  return (
    <nav
      css={css`
        padding: ${euiTheme.size.m};

        &:not(:last-child) {
          border-bottom: 1px ${euiTheme.colors.borderBaseSubdued} solid;
        }
      `}
      role="menu"
      aria-labelledby={sectionId || undefined}
    >
      {label && (
        <EuiText
          id={sectionId}
          css={css`
            font-size: ${euiTheme.size.m};
            color: ${euiTheme.colors.subduedText};
            // 6px comes from Figma, no token
            padding: 6px ${euiTheme.size.s};
          `}
          component="span"
        >
          {label}
        </EuiText>
      )}
      <ul
        css={css`
          display: flex;
          flex-direction: column;
          width: 236px;
          ${hasGap ? `gap: ${euiTheme.size.xs};` : ""}
        `}
      >
        {children}
      </ul>
    </nav>
  );
};
