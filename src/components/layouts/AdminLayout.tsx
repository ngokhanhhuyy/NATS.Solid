import type { RouteSectionProps } from "@solidjs/router";

export default function AdminLayout(props: RouteSectionProps) {
  return (
    <>
      <h1>AdminLayout</h1>
      {props.children}
    </>
  );
}