import { makeAutoObservable } from "mobx";
import { GitSearchResultPage } from "../GitSearchResultPage";

class Store {
  searchResults = new Array<GitSearchResultPage<any>>();
  flatSearchResults = new Array<any>();

  constructor() {
    makeAutoObservable(this);
  }

  append(page: GitSearchResultPage<any>) {
    this.searchResults.push(page);
    this.flatSearchResults = this.flatSearchResults.concat(page.searchResults)
  }

  set(pages: Array<GitSearchResultPage<any>>) {
    this.searchResults = pages;
    this.flatSearchResults = this.searchResults.map(page => page.searchResults).flat();
  }

  clear() {
    this.searchResults = new Array<GitSearchResultPage<any>>();
    this.flatSearchResults = [];
  }

}

const store = new Store();
export default store;