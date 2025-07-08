/** @jsxImportSource @emotion/react */
import { EuiIcon, EuiTitle, useEuiTheme } from "@elastic/eui";
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
    gap: ${euiTheme.size.s};
  `;

  const backButtonStyle = css`
    background: none;
    border: none;
    color: currentColor;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: ${euiTheme.size.m};
  `;

  return (
    <div css={titleStyle}>
      <button
        css={backButtonStyle}
        aria-label="Go back"
        onClick={goBack}
        type="button"
      >
        <EuiIcon type="arrowLeft" />
      </button>
      {title && (
        <EuiTitle size="xs">
          <h4>{title}</h4>
        </EuiTitle>
      )}
    </div>
  );
};
