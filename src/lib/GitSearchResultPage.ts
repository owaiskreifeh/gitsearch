import { GitRepo } from "./Model/GitRepoModel";
import { GitUser } from "./Model/GitUserModel";
import { Serializable } from "./Serializable";

export class GitSearchResultPage<T extends Serializable> implements Serializable{
    private _searchResults: Array<T>;
    private _hasMore: boolean;
    private _count: number;
    private _totalCount: number;

    constructor(searchResults: Array<T>, hasMore: boolean, count: number, totalCount: number) {
        this._searchResults = searchResults;
        this._hasMore = hasMore;
        this._count = count;
        this._totalCount = totalCount;
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

    get totalCount(): number {
        return this._totalCount;
    }

    static deserialize<T extends Serializable>(serializedObject: any) : GitSearchResultPage<T> {

        function deserializeItem(item: any): Serializable {
            switch (item.__TYPE) {
                case "GitRepo":
                    return GitRepo.deserialize(item);

                case "GitUser":
                    return GitUser.deserialize(item);

                default:
                    throw new Error("Unknown type: " + item.__TYPE);
            }
        }

        return new GitSearchResultPage<T>(
            serializedObject.searchResults.map(deserializeItem),
            serializedObject.hasMore,
            serializedObject.count,
            serializedObject.totalCount,
        )
    }

    public serialize() {
        return {
            hasMore: this.hasMore,
            count: this.count,
            totalCount: this.totalCount,
            searchResults: this.searchResults.map(result => result.serialize()),
        }
    }
}