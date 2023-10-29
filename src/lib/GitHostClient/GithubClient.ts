
import type { GraphQlQueryResponseData } from "@octokit/graphql";

import { Octokit } from "@octokit/core";
import { GitClient, GitClientFetchError } from "../GitClient";
import { GitSearchResultPage } from "../GitSearchResultPage";
import { GitUser } from "../Model/GitUserModel";
import { GitRepo } from "../Model/GitRepoModel";

/**
 * Class representing a GitHub Client.
 */
export class GithubClient implements GitClient {
    octokit: Octokit;
  
    /**
     * Constructs a GithubClient instance with the provided authentication token.
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
  
        const repos = response.data.items.map((_repoJson: any) => GitRepo.fromRawJSON(_repoJson));
        const hasMore = !response.data.incomplete_results;
        const count = response.data.items.length;
        const totalCount = response.data.total_count;
  
        return new GitSearchResultPage<GitRepo>(repos, hasMore, count, totalCount);
  
      } catch (e) {
        throw new GitClientFetchError((e as Error).message);
      }
    }

    async getRepoByName(repoName: string): Promise<GitRepo> {

      const query =  `
query($owner: String!, $repoName: String!) {
  repository(owner: $owner, name: $repoName) {
    name
    url
    owner {
      id
      login
      avatarUrl
      url
    }
    forks(last: 3) {
      nodes {
        url
        id
        owner {
          id
          login
          avatarUrl
          url
        }
      }
    }
    languages(first: 10) {
      nodes {
        name
      }
    }
  }
}
`;

      const [ownerName, shortName] = repoName.split(('/'));
      const vars = {
        repoName: shortName,
        owner: ownerName,
      }

      const { repository }: GraphQlQueryResponseData = await this.octokit.graphql(query, vars);
      const repo = {
        ...repository,
        forks: repository.forks.nodes.map((node: any) => node),
        languages: repository.languages.nodes.map((node: any) => node.name),
      };
      
      return GitRepo.fromRawJSON(repo);
    }
  }