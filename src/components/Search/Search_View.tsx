import { Component, For, Show, createSignal, createMemo } from "solid-js";
import SearchController from "./Search_Controller";
import { BsSortDownAlt } from "solid-icons/bs";
import { BsSortDown } from "solid-icons/bs";
import { TItems } from "../../state/state_types";
import styles from "./Search.module.scss";

interface Props {
  controller: SearchController;
  items: TItems;
}
const SearchView: Component<Props> = ({ controller }) => {
  const [inputValue, setInputValue] = createSignal("");
  const [isBtnAlt, setIsBtnAlt] = createSignal<boolean>(true);

  const cities = createMemo(() => controller.search(inputValue(), isBtnAlt()));

  const onInputChange = (query: string): void => {
    setInputValue(query);
  };

  const onClickHandler = (): void => {
    setIsBtnAlt((val) => !val);
  };

  return (
    <div class={styles.container}>
      <input
        type="text"
        value={inputValue()}
        onInput={(e) => onInputChange(e.currentTarget.value)}
        class={styles.input}
      />
      <button onClick={onClickHandler} class={styles.button}>
        {isBtnAlt() ? <BsSortDownAlt size={20} /> : <BsSortDown size={20} />}
      </button>
      <ul class={styles.list}>
        <Show
          when={cities().length !== 0}
          fallback={<div class={styles.notFound}>Не найдено</div>}
        >
          <For each={cities()}>
            {(city) => <li class={styles.list_item}>{city}</li>}
          </For>
        </Show>
      </ul>
    </div>
  );
};
export default SearchView;
