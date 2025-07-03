import { useCallback } from 'react';

/**
 * Custom hook for handling menu item clicks with CMD + Click support
 * 
 * @param onClick - Optional callback function to execute on regular clicks
 * @returns Click handler that supports CMD + Click to open in new tab
 */
export const useMenuItemClick = (onClick?: () => void) => {
  return useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    // Check for CMD + Click (Mac) or Ctrl + Click (Windows/Linux)
    // Let the browser handle these cases naturally for new tab opening
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    
    // Only prevent default for regular clicks
    event.preventDefault();
    onClick?.();
  }, [onClick]);
};
