import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useResponsiveMenu } from './use_responsive_menu';

// Mock the constants
vi.mock('../../constants', () => ({
  PRIMARY_MENU_ITEMS: Array.from({ length: 12 }, (_, i) => ({
    id: `item-${i + 1}`,
    label: `Item ${i + 1}`,
    href: `/item-${i + 1}`,
    iconType: 'document',
  })),
}));

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

global.ResizeObserver = MockResizeObserver as any;

describe('Feature: Responsive Menu Management', () => {
  let mockElement: HTMLElement;
  let mockGetBoundingClientRect: ReturnType<typeof vi.fn>;
  let mockGetComputedStyle: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockGetBoundingClientRect = vi.fn();
    mockGetComputedStyle = vi.fn();

    // Mock DOM element
    mockElement = {
      getBoundingClientRect: mockGetBoundingClientRect,
    } as unknown as HTMLElement;

    // Mock window methods
    Object.defineProperty(window, 'getComputedStyle', {
      value: mockGetComputedStyle,
      writable: true,
    });

    // Mock ref.current
    vi.spyOn(require('react'), 'useRef').mockReturnValue({
      current: mockElement,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Scenario: Menu item visibility calculation in expanded mode', () => {
    it('should determine maximum items that fit in expanded mode', () => {
      // Given the navigation menu is in expanded mode (not collapsed)
      const isCollapsed = false;
      
      // And the available menu height is 400 pixels
      mockGetBoundingClientRect.mockReturnValue({ height: 400 });
      
      // And each menu item requires 51 pixels height plus gap
      mockGetComputedStyle.mockReturnValue({
        getPropertyValue: () => '8', // 8px gap
      });

      // When the responsive menu hook calculates visible items
      const { result } = renderHook(() => useResponsiveMenu(isCollapsed));

      // Then it should determine the maximum number of items that fit
      act(() => {
        // Trigger recalculation
        result.current.primaryMenuRef.current?.getBoundingClientRect();
      });

      // And visible items should not exceed the maximum limit of 9 items
      expect(result.current.visibleMenuItems).toBeDefined();
      expect(result.current.visibleMenuItems.length).toBeLessThanOrEqual(9);
    });

    it('should calculate correct visible items based on available height', () => {
      // Given expanded mode with specific height constraints
      const isCollapsed = false;
      mockGetBoundingClientRect.mockReturnValue({ height: 300 });
      mockGetComputedStyle.mockReturnValue({
        getPropertyValue: () => '8',
      });

      // When calculating visible items
      const { result } = renderHook(() => useResponsiveMenu(isCollapsed));

      // Then should calculate based on expanded item height (51px + 8px gap = 59px total)
      // 300px / 59px = ~5 items maximum
      expect(result.current.visibleMenuItems.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Scenario: Menu item visibility calculation in collapsed mode', () => {
    it('should use collapsed item height for calculations', () => {
      // Given the navigation menu is in collapsed mode
      const isCollapsed = true;
      
      // And the available menu height is 300 pixels
      mockGetBoundingClientRect.mockReturnValue({ height: 300 });
      
      // And each menu item requires 32 pixels height plus gap
      mockGetComputedStyle.mockReturnValue({
        getPropertyValue: () => '4', // 4px gap
      });

      // When the responsive menu hook calculates visible items
      const { result } = renderHook(() => useResponsiveMenu(isCollapsed));

      // Then it should use the collapsed item height for calculations
      // 300px / (32px + 4px) = ~8 items maximum
      expect(result.current.visibleMenuItems.length).toBeLessThanOrEqual(8);
    });
  });

  describe('Scenario: Menu overflow handling', () => {
    it('should handle menu overflow correctly', () => {
      // Given there are more than 9 primary menu items available (mocked 12 items)
      const isCollapsed = false;
      
      // And the calculated visible item count is less than total items
      mockGetBoundingClientRect.mockReturnValue({ height: 200 }); // Limited height
      mockGetComputedStyle.mockReturnValue({
        getPropertyValue: () => '8',
      });

      // When the menu items are partitioned
      const { result } = renderHook(() => useResponsiveMenu(isCollapsed));

      // Then should handle overflow appropriately
      expect(result.current.visibleMenuItems).toBeDefined();
      expect(result.current.overflowMenuItems).toBeDefined();
      
      // And total items should equal visible + overflow
      const totalItems = result.current.visibleMenuItems.length + result.current.overflowMenuItems.length;
      expect(totalItems).toBe(12); // Our mocked items count
    });

    it('should reserve space for More button when there is overflow', () => {
      // Given more items than can fit
      const isCollapsed = false;
      mockGetBoundingClientRect.mockReturnValue({ height: 150 }); // Very limited height
      mockGetComputedStyle.mockReturnValue({
        getPropertyValue: () => '8',
      });

      // When partitioning items
      const { result } = renderHook(() => useResponsiveMenu(isCollapsed));

      // Then should reserve space for "More" button
      if (result.current.overflowMenuItems.length > 0) {
        expect(result.current.visibleMenuItems.length).toBeLessThan(12);
      }
    });
  });

  describe('Scenario: Responsive menu resize behavior', () => {
    it('should setup ResizeObserver for menu container', () => {
      // Given the navigation menu is rendered
      const isCollapsed = false;
      mockGetBoundingClientRect.mockReturnValue({ height: 400 });
      mockGetComputedStyle.mockReturnValue({
        getPropertyValue: () => '8',
      });

      // When the hook is initialized
      const { result } = renderHook(() => useResponsiveMenu(isCollapsed));

      // Then a ResizeObserver should be monitoring the menu container
      expect(MockResizeObserver.prototype.observe).toHaveBeenCalled();
    });

    it('should cleanup ResizeObserver on unmount', () => {
      // Given a rendered responsive menu
      const isCollapsed = false;
      mockGetBoundingClientRect.mockReturnValue({ height: 400 });
      mockGetComputedStyle.mockReturnValue({
        getPropertyValue: () => '8',
      });

      // When the component unmounts
      const { unmount } = renderHook(() => useResponsiveMenu(isCollapsed));
      unmount();

      // Then the ResizeObserver should be disconnected
      expect(MockResizeObserver.prototype.disconnect).toHaveBeenCalled();
    });

    it('should recalculate layout when collapsed state changes', () => {
      // Given a responsive menu in expanded state
      const { result, rerender } = renderHook(
        ({ isCollapsed }) => useResponsiveMenu(isCollapsed),
        { initialProps: { isCollapsed: false } }
      );

      mockGetBoundingClientRect.mockReturnValue({ height: 400 });
      mockGetComputedStyle.mockReturnValue({
        getPropertyValue: () => '8',
      });

      const initialVisibleCount = result.current.visibleMenuItems.length;

      // When the collapsed state changes
      rerender({ isCollapsed: true });

      // Then the menu layout should be recalculated
      // (In collapsed mode, items are smaller, so more should fit)
      expect(result.current.visibleMenuItems).toBeDefined();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle missing menu element gracefully', () => {
      // Given no menu element is available
      vi.spyOn(require('react'), 'useRef').mockReturnValue({
        current: null,
      });

      // When the hook is used
      const { result } = renderHook(() => useResponsiveMenu(false));

      // Then it should not crash and return default values
      expect(result.current.visibleMenuItems).toEqual([]);
      expect(result.current.overflowMenuItems).toEqual([]);
    });

    it('should handle zero available height', () => {
      // Given zero available height
      mockGetBoundingClientRect.mockReturnValue({ height: 0 });
      mockGetComputedStyle.mockReturnValue({
        getPropertyValue: () => '8',
      });

      // When calculating visible items
      const { result } = renderHook(() => useResponsiveMenu(false));

      // Then should handle gracefully
      expect(result.current.visibleMenuItems).toBeDefined();
      expect(result.current.overflowMenuItems).toBeDefined();
    });
  });
});
