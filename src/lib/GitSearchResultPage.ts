export class GitSearchResultPage<T> {
    private _searchResults: Array<T>;
    private _hasMore: boolean;
    private _count: number;

    constructor(searchResults: Array<T>, hasMore: boolean, count: number, totalCount: number) {
        this._searchResults = searchResults;
        this._hasMore = hasMore;
        this._count = count;
    }

    get searchResults(): Array<T> {
        return this._searchResults;
    }
    get hasMore(): boolean {
        return this._hasMore;
    }
    get count(): number {
        return this._count;
    }
}