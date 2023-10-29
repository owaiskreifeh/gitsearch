import { GitHubClient } from "./GitClient";

/**
 * Container for the application, including the GitHub client for accessing the GitHub API.
 * The AppContainer serves as a centralized location for managing application-level instances and services.
 */
export const AppContainer = {
  /**
   * The GitHub client instance used for making requests to the GitHub API.
   * The GitHub client provides methods for searching GitHub users and repositories.
   */
  gitClient: new GitHubClient()
};