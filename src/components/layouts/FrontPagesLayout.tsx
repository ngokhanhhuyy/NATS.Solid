import type { RouteSectionProps } from "@solidjs/router";
import NavigationBar from "./frontPages/NavigationBar";
import Footer from "./frontPages/Footer";

export default function FrontPagesLayout(props: RouteSectionProps) {
  return (
    <>
      <NavigationBar />

      <main class="flex-shrink-0">
        {props.children}
      </main>

      <Footer />
    </>
  );
}