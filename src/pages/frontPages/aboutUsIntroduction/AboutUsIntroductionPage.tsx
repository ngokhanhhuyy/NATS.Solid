import { createSignal, createMemo, For, Show } from "solid-js";

export default function AboutUsIntroductionPage() {
  const [getItems, setItems] = createSignal<number[]>([]);
  const getLargestItem = createMemo<number>(() => Math.max(...getItems()));
  const getDesiredItem = createMemo<number | null>(() => {
    const largestItem = getLargestItem();
    if (isFinite(largestItem) && largestItem % 2 === 0) {
      return largestItem;
    }

    return null;
  });

  return (
    <div class="container">
      <button
        class="btn btn-primary"
        onClick={() => setItems(items => [...items, getLargestItem() + 1])}
      >
        Add
      </button>
      
      <Show when={getDesiredItem()} fallback={<>null</>}>
        {<>{getDesiredItem()}</>}
      </Show>
    </div>
  )
}