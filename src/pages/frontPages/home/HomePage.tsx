import { createResource, Show } from "solid-js";
import { getSliderItemListAsync } from "@/services/sliderItemService";
import { getSummaryItemListAsync } from "@/services/summaryItemService";
import { getAboutUsIntroductionAsync } from "@/services/aboutUsIntroductionService";
import { getCatalogItemListAsync } from "@/services/catalogItemService";
import { getContactListAsync } from "@/services/contactService";
import { getGeneralSettingsAsync } from "@/services/generalSettingsService";
import { CatalogItemType } from "@/enums/catalogItemType";
import { createSliderItemDetailModel } from "@/models/sliderItemModels";
import { createSummaryItemDetailModel } from "@/models/summaryItemModels";
import { createAboutUsIntroductionDetailModel } from "@/models/aboutUsIntroductionModels";
import { createCatalogItemBasicModel } from "@/models/catalogItemModels";
import { createContactDetailModel } from "@/models/contactModels";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";
import styles from "./HomePage.module.css";

// Child components.
import SliderItemList from "./SliderItemList";
import SummaryItemList from "./SummaryItemList";
import CatalogItemList from "./CatalogItemList";
// import EnquiryForm from "@/components/layout/frontPages/enquiryFormComponent";

// Props.
type Model = {
  sliderItems: SliderItemDetailModel[];
  summaryItems: SummaryItemDetailModel[];
  aboutUsIntroduction: AboutUsIntroductionDetailModel;
  services: CatalogItemBasicModel[];
  courses: CatalogItemBasicModel[];
  products: CatalogItemBasicModel[];
  contacts: ContactDetailModel[];
  generalSettings: GeneralSettingsDetailModel;
};

async function initializeModelAsync() {
	const [
		sliderItemResponseDtos,
		summaryItemResponseDtos,
		aboutUsIntroductionResponseDto,
		catalogItemResponseDtos,
		contactResponseDtos,
		generalSettingsResponseDto,
	] = await Promise.all([
		getSliderItemListAsync(),
		getSummaryItemListAsync(),
		getAboutUsIntroductionAsync(),
		getCatalogItemListAsync(),
		getContactListAsync(),
		getGeneralSettingsAsync(),
	]);

	return {
		sliderItems: sliderItemResponseDtos.map((dto) => createSliderItemDetailModel(dto)),
		summaryItems: summaryItemResponseDtos.map((dto) => createSummaryItemDetailModel(dto)),
		aboutUsIntroduction: createAboutUsIntroductionDetailModel(aboutUsIntroductionResponseDto),
		services: catalogItemResponseDtos
			.filter((dto) => dto.type === CatalogItemType.Service)
			.map((dto) => createCatalogItemBasicModel(dto)),
		courses: catalogItemResponseDtos
			.filter((dto) => dto.type === CatalogItemType.Course)
			.map((dto) => createCatalogItemBasicModel(dto)),
		products: catalogItemResponseDtos
			.filter((dto) => dto.type === CatalogItemType.Product)
			.map((dto) => createCatalogItemBasicModel(dto)),
		contacts: contactResponseDtos.map((dto) => createContactDetailModel(dto)),
		generalSettings: createGeneralSettingsDetailModel(generalSettingsResponseDto),
	};
}

// Component.
export default function HomePage() {
  const [model] = createResource<Model>(initializeModelAsync);
  console.log(model == null);

	return (
    <Show when={model()}>
      {(model) => (
        <div class="container-fluid p-0">
          <SliderItemList model={model().sliderItems} />

          {/* ApplicationName */}
          <div
            class={[
              "container-fluid text-center text-white fw-bold p-2 mb-3 shadow",
              styles.applicationNameContainer
            ].join(" ")}
          >
            {model().generalSettings.applicationName}
          </div>

          {/* SummaryItems */}
          <SummaryItemList model={model().summaryItems} />

          {/* AboutUsIntroduction */}
          <div class="container-fluid bg-success text-white fs-5 mb-5 shadow">
            <div class="container">
              <div class="row justify-content-center align-items-stretch">
                <div
                  class={[
                    "col col-xl-6 col-lg-8 col-12 overflow-hidden",
                    "d-flex align-items-center p-4",
                  ].join(" ")}
                >
                  <img
                    src={model().aboutUsIntroduction.thumbnailUrl}
                    class="w-100 h-auto rounded-3"
                    alt="Về chúng tôi"
                  />
                </div>
                <div
                  class={[
                    "col-xl col-lg-8 col p-4 pt-3 d-flex flex-column",
                    "justify-content-center align-items-start",
                  ].join(" ")}
                >
                  <h2 class="mb-2">Về chúng tôi</h2>
                  <p>{model().aboutUsIntroduction.aboutUsContent}</p>
                  <a
                    asp-area="FrontPages"
                    asp-controller="AboutUs"
                    asp-action="Index"
                    class="btn btn-outline-light mt-3"
                  >
                    Tìm hiểu thêm
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CatalogItems */}
          <CatalogItemList title="Dịch vụ" model={model().services} />
          <CatalogItemList title="Khoá học" model={model().courses} />
          {/* <CatalogItemList title="Sản phẩm" model={props.model.products} /> */}

          {/* Enquiry */}
          {/* <EnquiryForm /> */}
        </div>
      )}
    </Show>
		
	);
}