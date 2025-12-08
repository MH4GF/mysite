# mh4gf.dev

## Development

### Environment Setup

This project syncs blog content from a private repository. You need to:

1. Create a [Fine-grained Personal Access Token](https://github.com/settings/tokens?type=beta)
2. Grant **Read-only** access to the `Contents` of the `MH4GF/works` repository
3. Set the token in `.env.local`:
   ```sh
   cp .env.example .env.local
   # Edit .env.local and set GITHUB_TOKEN=ghp_...
   ```

**Note**: If you're not the repository owner, you can skip this step and use the existing content cache.

### Running the development server

```sh
corepack enable
pnpm i
pnpm dev
```

Note: If you update the works repository, restart `pnpm dev` to sync the latest content.
