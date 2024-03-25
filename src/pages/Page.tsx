import { unwrap } from "solid-js/store";
import { Component, createSignal, createEffect, onCleanup } from "solid-js";
import SearchView from "../components/Search/Search_View";
import SearchModel from "../components/Search/Search_Model";
import SearchController from "../components/Search/Search_Controller";
import { items } from "../data";
import { State } from "../state/state";
import styles from "./Page.module.scss";

const state = new State(items);
window.s_state = state;

export const Page: Component = () => {
  const searchModel = new SearchModel(state.get_items());
  const searchController = new SearchController(searchModel);

  createEffect(() => {
    searchModel.setItems(state.get_items());
  });

  return (
    <section class={styles.container}>
      <div class={styles.page_container}>
        <SearchView
          controller={searchController}
          items={searchModel.getItems()}
        />
      </div>
    </section>
  );
};
