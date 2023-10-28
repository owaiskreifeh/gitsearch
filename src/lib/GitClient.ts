import { Octokit } from "@octokit/core"
import { GitSearchResultPage } from "./GitSearchResultPage"

import { GitRepo } from "./Model/GitRepoModel"
import { GitUser } from "./Model/GitUserModel"

interface GitClient {
    searchByUsername: (arg0: string, page: number) => Promise<GitSearchResultPage<GitUser>>
    searchByRepoName: (arg0: string, page: number) => Promise<GitSearchResultPage<GitRepo>>
}

class GitClientFetchError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GitClientFetchError";
    }
}

export class GitHubClient implements GitClient {

   octokit: Octokit
   constructor() {
    this.octokit = new Octokit({
        auth: process.env.GITHUB_AUTH_TOKEN
    })
   }

   async searchByUsername(username: string, page: number = 0): Promise<GitSearchResultPage<GitUser>> {
    try {
        const response = await this.octokit.request({
            method: "GET",
            url: `/search/users?q=${username}&page=${page}`,
        
        });

        // guard that we got a response with users data
        if (response?.data?.items?.length < 1) {
            return new GitSearchResultPage([], false, 0, 0)
        }

        // if we got a response with users data, cast users to GitUser model
        const users = response.data.items.map((_userJson: any) => GitUser.fromRawJSON(_userJson));
        const hasMore = !response.data.incomplete_results;
        const count = response.data.items.length;
        const totalCount = response.data.total_count;

        return new GitSearchResultPage<GitUser>(users, hasMore, count, totalCount);

    } catch (e) {
        throw new GitClientFetchError((e as Error).message)
    }
   }

   async searchByRepoName(repoName: string, page: number): Promise<GitSearchResultPage<GitRepo>> {
    return new GitSearchResultPage<GitRepo>([], false, 0, 0)
   }
}