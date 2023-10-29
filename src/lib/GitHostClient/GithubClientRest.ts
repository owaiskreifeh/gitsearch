
import { Octokit } from "@octokit/core";
import { GitClient, GitClientFetchError } from "../GitClient";
import { GitSearchResultPage } from "../GitSearchResultPage";
import { GitUser } from "../Model/GitUserModel";
import { GitRepo } from "../Model/GitRepoModel";

/**
 * Class representing a GitHub Client.
 */
export class GithubClientRest implements GitClient {
    octokit: Octokit;
  
    /**
     * Constructs a GithubClientRest instance with the provided authentication token.
     */
    constructor() {
      this.octokit = new Octokit({
        auth: process.env.GITHUB_AUTH_TOKEN
      });
    }
  
    /**
     * Search GitHub users by username.
     * @param {string} username - The username to search for.
     * @param {number} page - The page number.
     * @returns {Promise<GitSearchResultPage<GitUser>>} - The result page containing GitUser objects.
     */
    async searchByUsername(username: string, page: number = 1): Promise<GitSearchResultPage<GitUser>> {
      try {
        const response = await this.octokit.request({
          method: "GET",
          url: `/search/users?q=${username}&page=${page}&sort=followers`,
        });
  
        if (response?.data?.items?.length < 1) {
          return new GitSearchResultPage([], false, 0, 0);
        }
  
        const users = response.data.items.map((_userJson: any) => GitUser.fromRawJSON(_userJson));
        const hasMore = !response.data.incomplete_results;
        const count = response.data.items.length;
        const totalCount = response.data.total_count;
  
        return new GitSearchResultPage<GitUser>(users, hasMore, count, totalCount);
  
      } catch (e) {
        throw new GitClientFetchError((e as Error).message);
      }
    }
  
    /**
     * Search GitHub repositories by name.
     * @param {string} repoName - The repository name to search for.
     * @param {number} page - The page number.
     * @returns {Promise<GitSearchResultPage<GitRepo>>} - The result page containing GitRepo objects.
     */
    async searchByRepoName(repoName: string, page: number = 1): Promise<GitSearchResultPage<GitRepo>> {
      try {
        const response = await this.octokit.request({
          method: "GET",
          url: `/search/repositories?q=${repoName}&page=${page}`,
        });
  
        if (response?.data?.items?.length < 1) {
          return new GitSearchResultPage([], false, 0, 0);
        }
  
        const repos = response.data.items.map((_userJson: any) => GitRepo.fromRawJSON(_userJson));
        const hasMore = !response.data.incomplete_results;
        const count = response.data.items.length;
        const totalCount = response.data.total_count;
  
        return new GitSearchResultPage<GitRepo>(repos, hasMore, count, totalCount);
  
      } catch (e) {
        throw new GitClientFetchError((e as Error).message);
      }
    }
  }