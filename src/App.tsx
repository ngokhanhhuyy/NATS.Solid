import { lazy } from "solid-js";
import { Router, Route } from "@solidjs/router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/main.css";

// Layout component.
import RootLayout from "@/components/layouts/RootLayout";
import FrontPagesLayout from "./components/layouts/FrontPagesLayout";
import AdminLayout from "./components/layouts/AdminLayout";

// Page components.
const HomePage = lazy(() => import("@/pages/frontPages/home/HomePage"));
const AboutUsIntroductionPage = lazy(() => import("@/pages/frontPages/aboutUsIntroduction/AboutUsIntroductionPage"));

const App = () => {
  return (
    <Router root={RootLayout}>
      <Route path="/" component={FrontPagesLayout}>
        <Route path="/" component={HomePage} />
        <Route path="/ve-chung-toi" component={AboutUsIntroductionPage} />
        <Route path="/summaryItems" component={() => "Summary items"} />
      </Route>

      <Route path="/admin" component={AdminLayout}>
        <Route path="/" component={() => "Dashboard"} />
        <Route path="/aboutUs" component={() => "About us"} />
        <Route path="/summaryItems" component={() => "Summary items"} />
      </Route>
    </Router>
  );
};

export default App;