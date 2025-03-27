import { Suspense } from "solid-js";
import type { RouteSectionProps } from "@solidjs/router";

export default function RootLayout(props: RouteSectionProps) {
  return (
    <Suspense>
      {props.children}
    </Suspense>
  );
}