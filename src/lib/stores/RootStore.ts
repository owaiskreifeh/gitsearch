import { makeAutoObservable } from "mobx";
import { GitSearchResultPage } from "../GitSearchResultPage";

class Store {
  searchResults = new Array<GitSearchResultPage<any>>();

  constructor() {
    makeAutoObservable(this);
  }

  append(page: GitSearchResultPage<any>) {
    this.searchResults.push(page);
  }

  set(pages: Array<GitSearchResultPage<any>>) {
    this.searchResults = pages;
  }

  clear() {
    this.searchResults = new Array<GitSearchResultPage<any>>();
  }

  get flatSearchResults() : Array<any> {
    return this.searchResults.map(page => page.searchResults).flat();
  }
  
}

const store = new Store();
export default store;