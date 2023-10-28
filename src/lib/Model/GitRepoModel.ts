import { GitUser } from "./GitUserModel";

export class GitRepo {
    constructor(
        public id: string,
        public name: string,
        public owner: GitUser,
        public fileTypes: string[],
        public forks: Array<GitUser>,
    ) {}

    static fromJSON(jsonData: any): GitRepo {
        return new GitRepo(
            jsonData.id,
            jsonData.full_name,
            GitUser.fromJSON(jsonData.owner),
            jsonData.fileTypes,
            jsonData.forks,
        );
    }
}