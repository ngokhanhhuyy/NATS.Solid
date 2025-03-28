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
import AboutUsIntroduction from "./AboutUsIntroduction";
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
  const [getModel] = createResource<Model>(initializeModelAsync);

  // Computed.
  const applicationNameContainerClassName = [
    "container-fluid text-center text-white fw-bold p-2 mb-3 shadow",
    styles.applicationNameContainer
  ].join(" ");

	return (
    <Show when={getModel()}>
      {getModel => (
        <div class="container-fluid p-0">
          <SliderItemList model={getModel().sliderItems} />

          {/* ApplicationName */}
          <div class={applicationNameContainerClassName}>
            {getModel().generalSettings.applicationName}
          </div>

          {/* SummaryItems */}
          <SummaryItemList model={getModel().summaryItems} />

          {/* AboutUsIntroduction */}
          <AboutUsIntroduction model={getModel().aboutUsIntroduction} />

          {/* CatalogItems */}
          <CatalogItemList title="Dịch vụ" model={getModel().services} />
          <CatalogItemList title="Khoá học" model={getModel().courses} />
          {/* <CatalogItemList title="Sản phẩm" model={props.model.products} /> */}

          {/* Enquiry */}
          {/* <EnquiryForm /> */}
        </div>
      )}
    </Show>
	);
}