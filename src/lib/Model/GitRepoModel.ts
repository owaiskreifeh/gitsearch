import { Serializable } from "../Serializable";
import { GitUser } from "./GitUserModel";

export class GitRepo implements Serializable{
    constructor(
        public id: string,
        public name: string,
        public owner: GitUser,
        public fileTypes: string[],
        public forks: Array<GitUser>,
    ) {}


    static fromRawJSON(jsonData: any): GitRepo {
        return new GitRepo(
            jsonData.id,
            jsonData.full_name,
            GitUser.fromRawJSON(jsonData.owner),
            jsonData.fileTypes,
            jsonData.forks,
        );
    }

    static deserialize(serializedObject: any): GitRepo {
        return new GitRepo(
            serializedObject.id,
            serializedObject.name,
            GitUser.deserialize(serializedObject.owner),
            serializedObject.fileTypes,
            serializedObject.forks.map((fork: any) => GitUser.deserialize(fork)),

        )
    }

    public serialize(): any {
        return {
            __TYPE: this.constructor.name,
            id: this.id,
            name: this.name,
            owner: this.owner.serialize(),
            fileTypes: this.fileTypes,
            forks: this.forks.map((fork) => fork.serialize()),
        };
    }

}