import { createSignal, type JSX } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import * as routeUtils from "@/utils/routeUtils";
import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  // States.
  const [getContentVisible, setContentVisible] = createSignal<boolean>(false);

  // Computed.
  function computeNavBarCollapseClassName(): string {
    let classNames = styles.navBarCollapse;
    if (getContentVisible()) {
      classNames += " show";
    }
    
    return classNames;
  }

  return (
    <nav
      class={`navbar navbar-expand-xl fixed-top shadow fs-5 p-0 ${styles.nav}`}
      data-bs-theme="light"
    >
      <div class="container">
        {/* Main logo */}
        <A
          href={routeUtils.getHomeRoutePath()}
          class="navbar-brand d-flex align-items-center text-decoration-none"
        >
          <img
            src="/images/main-logo-transparent-white-without-text.png"
            class={`me-2 flex-shrink-0 ${styles.logo}`}
            alt="Main Logo"
          />
          <span class={`fs-2 ${styles.applicationShortName}`}>
            NATS
          </span>
        </A>

        <button
          class={`navbar-toggler fs-3 me-2 my-0 py-2 ${styles.togglerButton}`}
          id="navbar-toggler-button"
          type="button"
          data-bs-toggle="collapse"
          aria-controls="navbar-content"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setContentVisible(isVisible => !isVisible)}
        >
          <i class="bi bi-list"></i>
        </button>
        
        <div class={`collapse navbar-collapse ${computeNavBarCollapseClassName()}`}>
          <ul class={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.itemListContainer}`}>
            {/* Home */}
            <NavigationItem path={routeUtils.getHomeRoutePath()}>
              Trang chủ
            </NavigationItem>

            {/* SummaryItem */}
            <NavigationItem path={routeUtils.getSummaryItemsRoutePath()}>
              Giới thiệu
            </NavigationItem>

            {/* AboutUsIntroduction */}
            <NavigationItem path={routeUtils.getAboutUsIntroductionRoutePath()}>
              Về chúng tôi
            </NavigationItem>

            {/* CatalogItem - Services */}
            <NavigationItem path={routeUtils.getServiceListRoutePath()}>
              Dịch vụ
            </NavigationItem>

            {/* CatalogItem - Course */}
            <NavigationItem path={routeUtils.getCourseListRoutePath()}>
              Khoá học
            </NavigationItem>

            {/* CatalogItem - Product */}
            <NavigationItem path={routeUtils.getProductListRoutePath()}>
              Sản phẩm
            </NavigationItem>

            {/* Contacts */}
            <NavigationItem path={routeUtils.getContactsRoutePath()}>
              Liên hệ
            </NavigationItem>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function NavigationItem(props: { path: string, children: JSX.Element }) {
  // Dependencies.
  const location = useLocation();

  // Computed.
  const computeItemClassName = (): string => {
    const classNames = [styles.link];
    const pathName = location.pathname;
    if ((pathName === "/" && props.path === "/") ||
      (props.path !== "/" && pathName.startsWith(props.path))) {
      classNames.push("active");
    }

    return classNames.join(" ");
  };

  return (
    <li class="nav-item">
      <A href={props.path} class={`nav-link ${computeItemClassName()}`}>
        {props.children}
      </A>
    </li>
  );
}