import { createResource, Index } from "solid-js";
import { A } from "@solidjs/router";
import { getContactListAsync } from "@/services/contactService";
import { getGeneralSettingsAsync } from "@/services/generalSettingsService";
import { ContactType } from "@/enums/contactType";
import { createContactDetailModel } from "@/models/contactModels";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";
import * as routeUtils from "@/utils/routeUtils";
import styles from "./Footer.module.css";

// Props.
type Model = {
  contacts: ContactDetailModel[];
  generalSettings: GeneralSettingsDetailModel;
}

export default function Footer() {
  const [model] = createResource<Model>(async () => {
    const [contactResponseDtos, generalSettingsResponseDto] = await Promise.all([
      getContactListAsync(),
      getGeneralSettingsAsync()
    ]);

    return {
      contacts: contactResponseDtos.map(dto => createContactDetailModel(dto)),
      generalSettings: createGeneralSettingsDetailModel(generalSettingsResponseDto)
    };
  });

  return (
    <footer class={`container-fluid bg-dark position-relative h-auto flex-shrink-0 ${styles.footer}`}>
      <div class="container text-white">
        <div class="row g-4 m-4 justify-content-center align-items-stretch">
          {/* As - Left/Top column */}
          <div class={`col col-xl-2 col-lg-3 col-sm-6 col-12 ${styles.linksColumn}`}>
            <span class="fw-bold fs-5 opacity-75">
              Công ty
            </span>

            {/* SummaryItems */}
            <A href={routeUtils.getSummaryItemsRoutePath()}>
              Giới thiệu
            </A>

            {/* AboutUs */}
            <A href={routeUtils.getAboutUsIntroductionRoutePath()}>
              Về chúng tôi
            </A>

            {/* News */}
            <A href="#" type="button">
              Tin tức
            </A>

            {/* Contacts */}
            <A href={routeUtils.getContactsRoutePath()}>
              Liên hệ
            </A>
          </div>

          {/* As - Right/Bottom column */}
          <div class={`col col-xl-2 col-lg-3 col-sm-6 col-12 ${styles.linksColumn}`}>
            <span class="fw-bold fs-5 opacity-75">
              Lĩnh vực
            </span>

            {/* Services */}
            <A href={routeUtils.getServiceListRoutePath()}>
              Dịch vụ
            </A>

            {/* Courses */}
            <A href={routeUtils.getCourseListRoutePath()}>
              Khóa học
            </A>
          </div>

          {/* Contacts */}
          <div class="col col-xl-5 col-lg-6 col-12">
            <span class="fw-bold fs-5 opacity-75">
              Liên hệ
            </span>

            <Index each={model()?.contacts}>
              {(getContact) => <Contact model={getContact()} />}
            </Index>
          </div>


          {/* Logo */}
          <div class="col d-flex flex-column justify-content-center align-items-center">
            <div
              class={
                "border border-4 rounded-circle d-flex justify-content-center " +
                `align-items-center ${styles.logoContainer}`
              }
            >
              <img src="/images/main-logo-transparent-white.png" alt="Logo" />
            </div>

            <h5 class="text-center mt-3 text-white">
              {model()?.generalSettings.applicationName}
            </h5>
          </div>

          {/* Copyright */}
          <div class="col col-12 text-center">
            Bản quyền ©2025&nbsp;
            <a
              href="https://facebook.com/huy.nino.97"
              class="fw-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ngô Khánh Huy
            </a>.
          </div>
        </div>
      </div>
    </footer>
  );
}

function Contact(props: { model: ContactDetailModel }) {
  // Computed.
  function computeZaloUrl(): string {
    return "https://zalo.me/" + props.model.content
      .replaceAll(" ", "")
      .replaceAll("+84", "0");
  }

  function ContactLink() {
    switch (props.model.type) {
      case ContactType.PhoneNumber:
        return (
          <a href={`tel:${props.model.content}`}>
            {props.model.content}
          </a>
        );
      case ContactType.ZaloNumber:
        return (
          <a href={computeZaloUrl()} target="_blank" rel="noopener noreferrer">
            {props.model.content}
          </a>
        );
      case ContactType.Email:
        return (
          <a href={`mailto:${props.model.content}`}>
            {props.model.content}
          </a>
        );
      case ContactType.Address:
        return (
          <a
            href={`https://maps.google.com/?q=${props.model.encodedContent}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.model.content}
          </a>
        );
      default:
        return null;
    }
  }

  return (
    <div class="my-2">
      {/* Label */}
      <i class={`bi ${props.model.iconClassName} me-2`}></i>

      {/* Content */}
      <ContactLink />
    </div>
  );
}