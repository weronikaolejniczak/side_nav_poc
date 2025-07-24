/** @jsxImportSource @emotion/react */
import { EuiButtonIcon, EuiTitle, useEuiTheme } from "@elastic/eui";
import { FC } from "react";
import { css } from "@emotion/react";

import { useNestedMenu } from "./use_nested_menu";
import { useMenuHeaderStyle } from "../../hooks/use_menu_header_style";

export type BackButtonProps = {
  title?: string;
};

export const BackButton: FC<BackButtonProps> = ({ title }) => {
  const { goBack } = useNestedMenu();
  const { euiTheme } = useEuiTheme();
  const headerStyle = useMenuHeaderStyle();

  const titleStyle = css`
    ${headerStyle}
    background: ${euiTheme.colors.backgroundBasePlain};
    border-radius: ${euiTheme.border.radius.medium};
    display: flex;
    align-items: center;
    gap: ${euiTheme.size.s};
  `;

  return (
    <div css={titleStyle}>
      <EuiButtonIcon
        aria-label="Go back"
        color="text"
        iconType="arrowLeft"
        onClick={goBack}
      />
      {title && (
        <EuiTitle size="xs">
          <h4>{title}</h4>
        </EuiTitle>
      )}
    </div>
  );
};
