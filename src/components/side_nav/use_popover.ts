import { useCallback, useEffect, useState } from "react";

/**
 * Hook for managing popover open state
 */
export const usePopoverOpen = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
};

/**
 * Hook for side panel effects
 * This hook is used to handle the popover state when the side panel is open.
 */
export const useSidePanelEffect = (
  isSidePanelOpen: boolean,
  onClose: () => void,
  clearTimeout: () => void
) => {
  useEffect(() => {
    if (isSidePanelOpen) {
      clearTimeout();
      onClose();
    }
  }, [isSidePanelOpen, onClose, clearTimeout]);
};
