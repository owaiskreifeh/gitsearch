import { GitSearchResultPage } from "./GitSearchResultPage";
import { GitRepo } from "./Model/GitRepoModel";
import { GitUser } from "./Model/GitUserModel";

/**
 * Interface representing a Git Client.
 */
export interface GitClient {
  /**
   * Search users by username.
   * @param {string} username - The username to search for.
   * @param {number} page - The page number.
   * @returns {Promise<GitSearchResultPage<GitUser>>} - The result page containing GitUser objects.
   */
  searchByUsername: (username: string, page: number) => Promise<GitSearchResultPage<GitUser>>;
  /**
   * Search repositories by name.
   * @param {string} repoName - The repository name to search for.
   * @param {number} page - The page number.
   * @returns {Promise<GitSearchResultPage<GitRepo>>} - The result page containing GitRepo objects.
   */
  searchByRepoName: (repoName: string, page: number) => Promise<GitSearchResultPage<GitRepo>>;
}

/**
 * Custom error class for Git Client fetch errors.
 */
export class GitClientFetchError extends Error {
  /**
   * Constructs a GitClientFetchError with the provided error message.
   * @param {string} message - The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "GitClientFetchError";
  }
}
