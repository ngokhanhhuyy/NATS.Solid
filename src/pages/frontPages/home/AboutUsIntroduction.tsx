import { A } from "@solidjs/router";
import { getAboutUsIntroductionRoutePath } from "@/utils/routeUtils";

// Props.
type AboutUsIntroductionProps = {
  model: AboutUsIntroductionDetailModel;
};

export default function AboutUsIntroduction(props: AboutUsIntroductionProps) {
  // Computed.
  const columnClassName = "col-xl col-lg-8 col p-4 pt-3 d-flex flex-column\
                          justify-content-center align-items-start";

  return (
    <div class="container-fluid bg-success text-white fs-5 mb-5 shadow">
      <div class="container">
        <div class="row justify-content-center align-items-stretch">
          {/* Thumbnail */}
          <div class={columnClassName}>
            <img
              src={props.model.thumbnailUrl}
              class="w-100 h-auto rounded-3"
              alt="Về chúng tôi"
            />
          </div>

          {/* AboutUsContent */}
          <div class={columnClassName}>
            <h2 class="mb-2">Về chúng tôi</h2>
            <p>{props.model.aboutUsContent}</p>
            <A href={getAboutUsIntroductionRoutePath()} class="btn btn-outline-light mt-3">
              Tìm hiểu thêm
            </A>
          </div>
        </div>
      </div>
    </div>
  );
}