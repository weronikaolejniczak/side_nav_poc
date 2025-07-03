/** @jsxImportSource @emotion/react */
import { EuiPopover, useEuiOverflowScroll } from "@elastic/eui";
import { css } from "@emotion/react";
import {
  useRef,
  useMemo,
  useCallback,
  cloneElement,
  ReactNode,
  ReactElement,
} from "react";
import { usePopoverOpen, useSidePanelEffect } from "./use_popover";
import { useFocusBlur, useFocusFirst } from "./use_focus_management";
import { useKeyboardManagement } from "./use_keyboard_management";
import {
  useClickOutside,
  useClickToggle,
  useHover,
} from "./use_mouse_management";

const TOP_BAR_HEIGHT = 48;
const TOP_BAR_POPOVER_GAP = 8;
const BOTTOM_POPOVER_GAP = 4;
const POPOVER_OFFSET = 5;

export type SideNavPopoverProps = {
  container: HTMLElement;
  children?: ReactNode | ((closePopover: () => void) => ReactNode);
  hasContent: boolean;
  isSidePanelOpen: boolean;
  trigger: ReactElement<{
    ref?: React.Ref<HTMLElement>;
    onClick?: (e: React.MouseEvent) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    tabIndex?: number;
    "aria-haspopup"?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
    "aria-expanded"?: boolean;
  }>;
  persistent?: boolean;
};

export const SideNavPopover = ({
  container,
  children,
  hasContent,
  isSidePanelOpen,
  trigger,
  persistent = false,
}: SideNavPopoverProps): JSX.Element => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  const { isOpen, open, close } = usePopoverOpen();
  const { isOpenedByClick, setClickOpened, clearClickOpened } =
    useClickToggle();

  const handleClose = useCallback(() => {
    close();
    clearClickOpened();
  }, [close, clearClickOpened]);

  const focusFirst = useFocusFirst(popoverRef);

  const { handleMouseEnter, handleMouseLeave, clearTimeout } = useHover(
    persistent,
    isOpenedByClick,
    isSidePanelOpen,
    { open, close: handleClose }
  );

  const handleTriggerClick = useCallback(() => {
    if (persistent) {
      if (isOpen && isOpenedByClick) {
        handleClose();
      } else {
        clearTimeout();
        open();
        setClickOpened();
      }
    }
  }, [
    persistent,
    isOpen,
    isOpenedByClick,
    handleClose,
    clearTimeout,
    open,
    setClickOpened,
  ]);

  const handleBlur = useFocusBlur(triggerRef, popoverRef, handleClose);

  useKeyboardManagement(isOpen, handleClose, triggerRef, popoverRef);
  useClickOutside(isOpen, persistent, popoverRef, triggerRef, handleClose);
  useSidePanelEffect(isSidePanelOpen, handleClose, clearTimeout);

  const enhancedTrigger = useMemo(
    () =>
      cloneElement(trigger, {
        ref: triggerRef,
        tabIndex: 0,
        "aria-haspopup": hasContent,
        "aria-expanded": hasContent ? isOpen : undefined,
        onClick: (e: React.MouseEvent) => {
          trigger.props.onClick?.(e);
          handleTriggerClick();
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            trigger.props.onKeyDown?.(e);
            if (hasContent && !e.defaultPrevented) {
              e.preventDefault();
              open();
              setTimeout(() => focusFirst(), 0);
            }
          } else {
            trigger.props.onKeyDown?.(e);
          }
        },
      }),
    [trigger, hasContent, isOpen, handleTriggerClick, open, focusFirst]
  );

  return (
    <div
      css={css`
        width: 100%;
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleBlur}
    >
      <EuiPopover
        anchorPosition="rightUp"
        buffer={[
          TOP_BAR_HEIGHT + TOP_BAR_POPOVER_GAP,
          0,
          BOTTOM_POPOVER_GAP,
          POPOVER_OFFSET,
        ]}
        button={enhancedTrigger}
        closePopover={handleClose}
        container={container}
        display="block"
        hasArrow={false}
        isOpen={hasContent && !isSidePanelOpen && isOpen}
        offset={POPOVER_OFFSET}
        ownFocus={false}
        panelPaddingSize="none"
      >
        <div
          ref={popoverRef}
          css={css`
            max-height: 500px;
            ${useEuiOverflowScroll("y")}
          `}
        >
          {typeof children === "function" ? children(handleClose) : children}
        </div>
      </EuiPopover>
    </div>
  );
};
