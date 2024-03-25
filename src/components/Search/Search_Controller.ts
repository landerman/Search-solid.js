import SearchModel from "./Search_Model";

class SearchController {
  private _model: SearchModel;

  constructor(model: SearchModel) {
    this._model = model;
  }

  search(query: string, isDown: boolean): string[] {
    return this._model.getFilteredCities(query, isDown);
  }
}

export default SearchController;
