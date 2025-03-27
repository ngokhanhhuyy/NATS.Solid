import { Index } from "solid-js";
import { A } from "@solidjs/router";
import styles from "./SummaryItemList.module.css";

// Props.
type SummaryItemListProps = {
	model: SummaryItemDetailModel[];
};

export default function SummaryItemList(props: SummaryItemListProps) {
	// Computed.
	function computeLinkClassName(): string {
		return `col col-xl-3 col-md-6 col-12 d-flex flex-column\
		 				align-items-center ${styles.link}`;
	}

	return (
		<div class="container mb-3 p-4">
			<div class="row g-3">
        <Index each={props.model}>
          {(getItem) => (
            <A href={getItem().detailRoute} class={computeLinkClassName()}>
              <img
                class={`rounded-circle mb-3 ${styles.thumbnail}`}
                style={{ "object-fit": "cover" }}
                src={getItem().thumbnailUrl}
                width={150}
                height={150}
                alt={getItem().name}
              />

              <h2 class="text-center text-success mb-2">{getItem().name}</h2>

              <p>{getItem().summaryContent}</p>
            </A>
          )}
        </Index>
			</div>
		</div>
	);
}