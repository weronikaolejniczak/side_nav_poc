/**
 * Type definitions for the navigation menu items
 */

import { IconType } from "@elastic/eui";

export type MenuItem = {
  id: string;
  label: string;
  href: string;
  iconType?: IconType;
  sections?: Section[];
};

export type Section = {
  id: string;
  label: string | null;
  items: SecondaryMenuItem[];
};

export type SecondaryMenuItem = {
  id: string;
  label: string;
  href: string;
  iconType?: IconType;
  external?: boolean;
};
