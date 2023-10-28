import { Serializable } from "../Serializable";
import { GitUser } from "./GitUserModel";

export class GitRepo implements Serializable{
    constructor(
        public id: string,
        public name: string,
        public owner: GitUser,
        public contentUrl: string[],
        public forksUrl: string,
        public forksCount: number,
        public watchersCount: number,
        public topics: string[],
        public url: string,
        public description: string,
    ) {}


    static fromRawJSON(jsonData: any): GitRepo {
        return new GitRepo(
            jsonData.id,
            jsonData.full_name,
            GitUser.fromRawJSON(jsonData.owner),
            jsonData.contents_url,
            jsonData.forks_url,
            jsonData.forks_count,
            jsonData.watchers,
            jsonData.topics,
            jsonData.url,
            jsonData.description,
        );
    }

    static deserialize(serializedObject: any): GitRepo {
        return new GitRepo(
            serializedObject.id,
            serializedObject.name,
            GitUser.deserialize(serializedObject.owner),
            serializedObject.contentUrl,
            serializedObject.forksUrl,
            serializedObject.forksCount,
            serializedObject.watchersCount,
            serializedObject.topics,
            serializedObject.url,
            serializedObject.description,
        );
    }

    public serialize(): any {
        return {
            __TYPE: this.constructor.name,
            id: this.id,
            name: this.name,
            owner: this.owner.serialize(),
            contentUrl: this.contentUrl,
            forksUrl: this.forksUrl,
            forksCount: this.forksCount,
            watchersCount: this.watchersCount,
            topics: this.topics,
            url: this.url,
            description: this.description,
        };
    }

}