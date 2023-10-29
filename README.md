# Git Search

GitSearch is a simple web application that allows users to search for GitHub users and view their repositories.

See Example at: [gitsearch.owais.me](https://gitsearch.owais.me/)

## Features

- Search for GitHub users by their usernames.
- Search for GitHub repos by their name.
- Click on a repository name to view more details.

## Developer Getting Started

Clone the repo

```bash
git clone https://github.com/owaiskreifeh/gitsearch.git
```

_Make sure that you have `node.js` installed and with version 18.x or higher_

Install dependencies

```bash
npm install
# or
yarn
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

To run locally with Github auth token, run

```bash
GITHUB_AUTH_TOKEN=[YOUR_GITHUB_TOKEN] yarn dev
# or
GITHUB_AUTH_TOKEN=[YOUR_GITHUB_TOKEN] npm run dev
# etc...
```

This token is needed to run graphQL queries using octokit sdk.

In the current implementation of `GithubClient` found in `src/lib/GitHostClient/GithubClient.ts` you can see that the method that gets more info about the repository (`getRepoByName(repoName: string)`) is using octokit graphql request

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

This project is using cypress to perform e2e and component tests, to start testing run:

```bash
yarn cy:run
```

e2e tests can be found at `cypress/e2e` directory, component tests will be next to the component implementation

## Extend your project

### Implement a new Git Hosts Clients

1. implement `GitClient` interface, find it in `src/lib/GitClient.ts`
2. Register your client in the appContainer to be used as a git host client, `src/lib/appContainer.ts`
