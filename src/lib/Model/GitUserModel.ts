export class GitUser {
    constructor(
        public id: string,
        public name: string, 
        public profileUrl: string,
        public avatarUrl: string,
        ) { }

    static fromJSON (jsonData: any): GitUser {
        return new GitUser(
            jsonData.id,
            jsonData.name,
            jsonData.html_url,
            jsonData.avatar_url,
        );
    }
}