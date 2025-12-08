# mh4gf.dev

## Development

### Environment Setup

This project syncs blog content from a private repository ([MH4GF/works](https://github.com/MH4GF/works)). You need to set up a GitHub Personal Access Token:

1. Create a Fine-grained Personal Access Token at [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Configure the token:
   - Resource owner: Your GitHub account
   - Repository access: Only select repositories > works
   - Repository permissions: Contents > Read-only
3. Copy `.env.example` to `.env.local` and set your token:
   ```sh
   cp .env.example .env.local
   # Edit .env.local and set GITHUB_TOKEN=your_token_here
   ```

### Running the development server

```sh
corepack enable
pnpm i
pnpm dev
```

Note: If you update the works repository, restart `pnpm dev` to sync the latest content.
