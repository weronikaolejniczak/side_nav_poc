import { RefObject, useCallback, useEffect } from "react";

import { useFocusTrap } from "./use_focus_management";

/**
 * Hook for keyboard event handling
 */
export const useKeyboardManagement = (
  isOpen: boolean,
  onClose: () => void,
  triggerRef: RefObject<HTMLElement>,
  popoverRef: RefObject<HTMLElement>
) => {
  const trapFocus = useFocusTrap(popoverRef);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          triggerRef.current?.focus();
          break;
        case "Enter":
          onClose();
          break;
        default:
          trapFocus(e);
      }
    },
    [isOpen, onClose, triggerRef, trapFocus]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown, true);
      return () => document.removeEventListener("keydown", handleKeyDown, true);
    }
  }, [isOpen, handleKeyDown]);
};
