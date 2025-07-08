/** @jsxImportSource @emotion/react */
import { EuiButtonIcon, EuiTitle, useEuiTheme } from "@elastic/eui";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  FC,
} from "react";
import { css } from "@emotion/react";
import { SecondaryMenu } from "./index";
import { IconType } from "@elastic/eui";

interface NestedMenuContextValue {
  currentPanel: string;
  goToPanel: (panelId: string) => void;
  goBack: () => void;
  canGoBack: boolean;
}

const NestedMenuContext = createContext<NestedMenuContextValue | null>(null);

const useNestedMenu = () => {
  const context = useContext(NestedMenuContext);
  if (!context) {
    throw new Error("useNestedMenu must be used within a NestedSecondaryMenu");
  }
  return context;
};

type NestedSecondaryMenuProps = {
  children: ReactNode;
  initialPanel?: string;
};

const NestedSecondaryMenuRoot: FC<NestedSecondaryMenuProps> = ({
  children,
  initialPanel = "main",
}) => {
  const [currentPanel, setCurrentPanel] = useState(initialPanel);
  const [panelStack, setPanelStack] = useState<string[]>([]);

  const goToPanel = useCallback(
    (panelId: string) => {
      setPanelStack((prev) => [...prev, currentPanel]);
      setCurrentPanel(panelId);
    },
    [currentPanel]
  );

  const goBack = useCallback(() => {
    const previousPanel = panelStack[panelStack.length - 1];
    if (previousPanel) {
      setCurrentPanel(previousPanel);
      setPanelStack((prev) => prev.slice(0, -1));
    }
  }, [panelStack]);

  const contextValue = {
    currentPanel,
    goToPanel,
    goBack,
    canGoBack: panelStack.length > 0,
  };

  return (
    <NestedMenuContext.Provider value={contextValue}>
      {children}
    </NestedMenuContext.Provider>
  );
};

type PanelProps = {
  id: string;
  title?: string;
  children: ReactNode;
};

const Panel: FC<PanelProps> = ({ id, title, children }) => {
  const { currentPanel } = useNestedMenu();

  if (currentPanel !== id) {
    return null;
  }

  if (title) {
    return (
      <SecondaryMenu title={title} isPanel={false}>
        {children}
      </SecondaryMenu>
    );
  }

  return <div>{children}</div>;
};

type BackButtonProps = {
  title?: string;
};

const BackButton: FC<BackButtonProps> = ({ title }) => {
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

type ItemProps = {
  children: ReactNode;
  iconType?: IconType;
  isCurrent?: boolean;
  href?: string;
  onClick?: () => void;
  hasSubmenu?: boolean;
  submenuPanelId?: string;
};

const Item: FC<ItemProps> = ({
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

  const itemStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `;

  const arrowStyle = css`
    margin-left: ${euiTheme.size.xs};
    opacity: 0.6;
    pointer-events: none;
  `;

  const handleClick = useCallback(() => {
    onClick?.();
    if (hasSubmenu && submenuPanelId) {
      goToPanel(submenuPanelId);
    }
  }, [onClick, hasSubmenu, submenuPanelId, goToPanel]);

  return (
    <SecondaryMenu.Item
      key={`nested-item-${href || Math.random()}`}
      iconType={iconType}
      isCurrent={isCurrent}
      href={href || ""}
      onClick={handleClick}
    >
      <div css={itemStyle}>
        <span>{children}</span>
        {hasSubmenu && (
          <EuiButtonIcon
            css={arrowStyle}
            aria-label="Has submenu"
            iconType="arrowRight"
            size="xs"
            color="text"
            display="empty"
          />
        )}
      </div>
    </SecondaryMenu.Item>
  );
};

interface NestedSecondaryMenuComponent extends FC<NestedSecondaryMenuProps> {
  Panel: typeof Panel;
  BackButton: typeof BackButton;
  Item: typeof Item;
  Section: typeof SecondaryMenu.Section;
}

export const NestedSecondaryMenu: NestedSecondaryMenuComponent =
  NestedSecondaryMenuRoot as NestedSecondaryMenuComponent;

NestedSecondaryMenu.Panel = Panel;
NestedSecondaryMenu.BackButton = BackButton;
NestedSecondaryMenu.Item = Item;
NestedSecondaryMenu.Section = SecondaryMenu.Section;
