import { Serializable } from "../Serializable";
import { GitFork } from "./GitForkModel";
import { GitUser } from "./GitUserModel";

export class GitRepo implements Serializable{
    constructor(
        public id: string,
        public name: string,
        public owner: GitUser,
        public forksCount: number,
        public watchersCount: number,
        public topics: string[],
        public url: string,
        public description: string,
        public language: string,
        public languages?: string[],
        public forks?: GitFork[],
    ) {}


    static fromRawJSON(jsonData: any): GitRepo {
        return new GitRepo(
            jsonData.id,
            jsonData.full_name,
            GitUser.fromRawJSON(jsonData.owner),
            jsonData.forks_count,
            jsonData.watchers,
            jsonData.topics,
            jsonData.url,
            jsonData.description,
            jsonData.language,
            jsonData.languages,
            Array.isArray(jsonData.forks) 
                ? jsonData.forks?.map((_forkJson: any) => GitFork.fromRawJSON(_forkJson)) 
                : null,
        );
    }

    static deserialize(serializedObject: any): GitRepo {
        return new GitRepo(
            serializedObject.id,
            serializedObject.name,
            GitUser.deserialize(serializedObject.owner),
            serializedObject.forksCount,
            serializedObject.watchersCount,
            serializedObject.topics,
            serializedObject.url,
            serializedObject.description,
            serializedObject.language,
            serializedObject.languages,
            serializedObject.forks?.map((_userJson: any) => GitFork.deserialize(_userJson)),
        );
    }

    public serialize(): any {
        return {
            __TYPE: this.constructor.name,
            id: this.id,
            name: this.name,
            owner: this.owner.serialize(),
            forksCount: this.forksCount,
            watchersCount: this.watchersCount,
            topics: this.topics,
            url: this.url,
            description: this.description,
            language: this.language,
            languages: this.languages,
            forks: this.forks?.map(forker => forker.serialize()),
        };
    }

}