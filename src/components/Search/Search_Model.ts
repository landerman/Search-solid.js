import { createSignal } from "solid-js";

class SearchModel {
  private _getStoreItems: () => string[];
  private _setStoreItems: (value: string[]) => void;

  constructor(items: string[]) {
    [this._getStoreItems, this._setStoreItems] = createSignal(items);
  }

  setItems(items: string[]): void {
    this._setStoreItems(items);
  }
  getItems(): string[] {
    return this._getStoreItems();
  }

  getFilteredCities(query: string, isDown: boolean): string[] {
    const sanitizedQuery = query
      .replace(/[^\p{L}\p{N}\s]/gu, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    const filteredCities = this._getStoreItems().filter((city) =>
      city.toLowerCase().includes(sanitizedQuery),
    );

    return this._sortCities(filteredCities, isDown);
  }

  private _sortCities(cities: string[], isDown: boolean): string[] {
    return [...cities].sort((a: string, b: string) =>
      isDown ? a.localeCompare(b) : b.localeCompare(a),
    );
  }
}

export default SearchModel;
