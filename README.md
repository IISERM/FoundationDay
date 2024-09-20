# Foundation Day 2024
SPA for Foundation Day 2024, made using Svelte and bundled using Vite.

There is a reverse proxy setup between the GitHub Pages domain and the IISER Mohali domain.\
The GH Page is at: `https://iiserm.github.io/FoundationDay/`\
The IISERM domain is at: `https://www.iisermohali.ac.in/FoundationDay/`

## Development
1. `bun install`
2. `bun run dev`: Starts the development server at `localhost` for HMR.
3. `bunx --bun vite build`: Builds the project for production.
4. `bun run deploy`: Deploys the project to GitHub Pages.
