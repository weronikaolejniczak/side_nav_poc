/** @jsxImportSource @emotion/react */
import { EuiButtonIcon, EuiTitle, useEuiTheme } from "@elastic/eui";
import { FC } from "react";
import { css } from "@emotion/react";

import { useNestedMenu } from "./use_nested_menu";

export type BackButtonProps = {
  title?: string;
};

export const BackButton: FC<BackButtonProps> = ({ title }) => {
  const { goBack } = useNestedMenu();
  const { euiTheme } = useEuiTheme();

  const titleStyle = css`
    position: sticky;
    top: 0;
    z-index: 1;
    background: ${euiTheme.colors.backgroundBasePlain};
    border-radius: ${euiTheme.border.radius.medium};
    padding: ${euiTheme.size.base} 20px;
    padding-bottom: ${euiTheme.size.xs};
    display: flex;
    align-items: center;
    gap: ${euiTheme.size.xs};
  `;

  const backButtonStyle = css`
    color: currentColor;
  `;

  return (
    <div css={titleStyle}>
      <EuiButtonIcon
        css={backButtonStyle}
        aria-label="Go back"
        iconType="arrowLeft"
        onClick={goBack}
        display="empty"
        size="xs"
      />
      {title && (
        <EuiTitle size="xs">
          <h4>{title}</h4>
        </EuiTitle>
      )}
    </div>
  );
};
