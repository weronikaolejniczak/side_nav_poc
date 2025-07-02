// source: https://github.com/elastic/eui/blob/main/wiki/consuming-eui/README.md#usage-with-typescript

declare module "@elastic/eui/es/components/icon/assets/*" {
  import * as React from "react";
  import type { SVGProps } from "react";

  interface SVGRProps {
    title?: string;
    titleId?: string;
  }

  export const icon: ({
    title,
    titleId,
    ...props
  }: SVGProps<SVGSVGElement> & SVGRProps) => React.JSX.Element;
  export {};
}

declare module "@elastic/eui/es/components/icon/icon" {
  import * as React from "react";
  import type { SVGProps } from "react";

  interface SVGRProps {
    title?: string;
    titleId?: string;
  }

  export function appendIconComponentCache(
    cache: Record<
      string,
      ({
        title,
        titleId,
        ...props
      }: SVGProps<SVGSVGElement> & SVGRProps) => React.JSX.Element
    >
  ): void;
}
