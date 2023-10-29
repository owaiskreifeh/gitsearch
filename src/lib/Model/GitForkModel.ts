import { Serializable } from "../Serializable";
import { GitUser } from "./GitUserModel";

export class GitFork implements Serializable{
    constructor(
        public id: string,
        public url: string,
        public owner: GitUser,
    ) {}

    static fromRawJSON(jsonData: any): GitFork {
        return new GitFork(
            jsonData.id,
            jsonData.url,
            GitUser.fromRawJSON(jsonData.owner),
        );
    }

    static deserialize(serializedObject: any): GitFork {
        return new GitFork(
            serializedObject.id,
            serializedObject.url,
            GitUser.deserialize(serializedObject.owner),
        );
    }

    serialize() {
        return {
            __TYPE: this.constructor.name,
            id: this.id,
            url: this.url,
            owner: this.owner.serialize(),
        }
    }
}
