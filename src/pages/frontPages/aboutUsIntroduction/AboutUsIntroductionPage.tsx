export default function AboutUsIntroductionPage() {
  let [resource] = $resource<number>(async () => 0);
  let items = $signal<number[]>([]);
  let largestItem = $memo<number | null>(
    items.length > 0 ? Math.max(...items) : null
  );

  return (
    <div class="container">
      <button
        class="btn btn-primary"
        onClick={() =>
          (items = [...items, largestItem != null ? largestItem + 1 : 0])
        }
      >
        Add
      </button>

      <For each={items}>{(item) => <span class="mx-3">{item}</span>}</For>
    </div>
  );
}

function TestingChild(props: { model: number[] }) {
  return (
    <>
      {props.model}
      <For each={props.model}>{(item) => <span class="mx-3">{item}</span>}</For>
    </>
  );
}
