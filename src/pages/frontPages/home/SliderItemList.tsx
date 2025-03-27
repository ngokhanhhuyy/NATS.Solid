import { createSignal, onMount, onCleanup, Index } from "solid-js";
import styles from "./SliderItemList.module.css";
import { Carousel } from "bootstrap";

// Props.
type SliderItemListProps = {
	model: SliderItemDetailModel[];
}

// Component.
export default function SliderItemList(props: SliderItemListProps) {
	// States.
	let carouselElement: HTMLDivElement = null!;
	let carousel: Carousel;
	const [getCurrentIndex, setCurrentIndex] = createSignal<number | null>(null);

	// Effect.
	onMount(() => {
    if (carouselElement != null) {
      carousel = new Carousel(carouselElement, { interval: 3000 });
      carouselElement.addEventListener("slide.bs.carousel", handleCarouselIndexChange);
    }
	});

  onCleanup(() => {
			carousel?.dispose();
			carouselElement?.removeEventListener("slider.bs.carousel", handleCarouselIndexChange);
  });

	// Computed.
	function computeItemClassName(index: number): string {
		return index === 0 ? "active" : "";
	}

	function computeBlurredBackgroundStyle() {
    const currentIndex = getCurrentIndex();
		if (currentIndex != null) {
			return { backgroundImage: `url(${props.model[currentIndex].thumbnailUrl})` };
		}

		return { };
	}

	// Callback.
	function handleCarouselIndexChange(event: Event): void {
		const currentIndex: number = (event as Event & { to: number }).to;
		setCurrentIndex(currentIndex);
	}

	return (
		<div class="container-fluid p-0 position-relative overflow-hidden bg-success">
			{/* Blurred background */}
			<div
				class={styles.blurredBackground}
				style={computeBlurredBackgroundStyle()}
			/>

			{/* Carousel */}
			<div
				class={`carousel slide ${styles.carousel}`}
				data-bs-ride="carousel"
				ref={carouselElement}
				id="sliderItemList"
			>
				{/* Photos */}
				<div class="carousel-inner">
          <Index each={props.model}>
            {(getSliderItem, index) => (
              <div class={`carousel-item ${computeItemClassName(index)}`}>
                <img
                  src={getSliderItem().thumbnailUrl}
                  class={`carousel-img d-block w-100 ${styles.thumbnail}`}
                  alt={getSliderItem().title}
                />
              </div>
            )}
          </Index>
				</div>

				{/* IndicatorButtons */}
				<div class="carousel-indicators">
          <Index each={props.model}>
            {(_, index) => (
              <button
                type="button"
                class={computeItemClassName(index)}
                data-bs-target="#sliderItemList"
                data-bs-slide-to={index}
                aria-current={index == 0}
                aria-label={`Slider ${index + 1}`}
              />
            )}
          </Index>
				</div>

				{/* CarouoselControlButtons */}
				<button
					class="carousel-control-prev"
					type="button"
					data-bs-target="#sliderItemList"
					data-bs-slide="prev"
				>
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button
					class="carousel-control-next"
					type="button"
					data-bs-target="#sliderItemList"
					data-bs-slide="next"
				>
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>
		</div>
	);
}