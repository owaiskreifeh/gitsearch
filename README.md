# Git Search

GitSearch is a simple web application that allows users to search for GitHub users and view their repositories.

See Example at: [gitsearch.owais.me](https://gitsearch.owais.me/)

Tech used: 

1. [`nextjs 14`](https://nextjs.org/)
2. [`github octokit`](https://github.com/octokit)
3. [`mobx`](https://mobx.js.org/react-integration.html)
4. [`cypress`](https://www.cypress.io/)

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

or rename `.env.example` file to `.env` and fill `GITHUB_AUTH_TOKEN` with your GitHub access token

```bash
mv .env.example .env
```

This token is needed to run graphQL queries using octokit sdk.

    In the current implementation of `GithubClient` found in `src/lib/GitHostClient/GithubClient.ts` you can see that the method that gets more info about the repository (`getRepoByName(repoName: string)`) is using octokit graphql request

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Navigating the project

This project separates the actual business logic from the user interface, not the most react way of doing things but this
will allow for more complex projects and healthier project ageing.

in `src/lib` directory you can find all data models, interfaces, integration classes, and app configurations

the `src/app` directory is your normal nextjs/react app, where all the UI lives.

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

### Change theme

Edit the css variables found in `src/app/globals.css`

### Contribute

1. Add a new Github client that will get all data by using graphql request, this will need a change in the ui code to request next page by `cursor` not by the page number.
2. Add Virtualized list to display large results see [react-virtualized](https://github.com/bvaughn/react-virtualized)
3. Root layout and the body of the home page both could be moved to the server side, this will require a change in the search bar behavior to send data by `html form` element, and to change current `mobx` store settings to work with SSR mode.
4. Search for comments tagged `@TODO` in the project
