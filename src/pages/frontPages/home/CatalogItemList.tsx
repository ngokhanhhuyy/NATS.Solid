import { Index } from "solid-js";
import { A } from "@solidjs/router";
import styles from "./CatalogItemList.module.css";

// Props.
type Props = {
	title: string;
	model: CatalogItemBasicModel[];
};

export default function CatalogItemList(props: Props) {
	return (
		<div class="container mt-4 mb-3">
			<h2 class="text-success text-center">
				{props.title}
			</h2>

			<div class={`row g-3 p-3 align-items-stretch ${styles.catalogItemRow}`}>
        <Index each={props.model}>
          {(getItem) => (
            <div
              class={[
                "col col-xl-3 col-lg-4 col-md-6 col-sm-10 col-12",
                "justify-self-md-start justify-self-sm-center"
              ].join(" ")}
            >
              <div class="card h-100 shadow-sm">
                <img
                  src={getItem().thumbnailUrl}
                  class={`card-img-top ${styles.catalogItemThumbnail}`}
                  style={{ "aspect-ratio": 1 }}
                  alt={getItem().name}
                />

                <div class={[
                    "card-body d-flex flex-column flex-fill",
                    "justify-content-between align-items-start"
                  ].join(" ")}
                >
                  <h5 class="card-title">
                    {getItem().name}
                  </h5>

                  <A href={getItem().detailRoute} class="btn btn-outline-success mt-2">
                    Chi tiết
                  </A>
                </div>
              </div>
            </div>
          )}
        </Index>
			</div>
		</div>
	);
}