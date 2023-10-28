import { Serializable } from "../Serializable";

export class GitUser implements Serializable{
    constructor(
        public id: string,
        public name: string, 
        public profileUrl: string,
        public avatarUrl: string,
        ) { }

    static fromRawJSON (jsonData: any): GitUser {
        return new GitUser(
            jsonData.id,
            jsonData.name,
            jsonData.html_url,
            jsonData.avatar_url,
        );
    }

    static deserialize(serializedObject: any): GitUser {
        return new GitUser(
            serializedObject.id,
            serializedObject.name,
            serializedObject.profileUrl,
            serializedObject.avatarUrl,
        );
    }

    public serialize(): any {
        return {
            __TYPE: this.constructor.name,
            id: this.id,
            name: this.name,
            profileUrl: this.profileUrl,
            avatarUrl: this.avatarUrl,
        };
    }
}