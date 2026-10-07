# Contributing

## Workflow

1. Start from the latest `main` branch.
2. Create a focused branch using one of these prefixes: `feature/`, `fix/`, or `chore/`.
3. Keep each commit focused and write the commit message in the imperative mood.
4. Push the branch and open a pull request into `main`.
5. Review the Vercel Preview deployment and complete the pull request checks before merging.
6. Production deployment happens through the repository's Vercel integration after the pull request is merged into `main`.

Example:

```bash
git switch main
git pull --rebase origin main
git switch -c fix/short-description
```

## Secrets

Never commit `.env` files, API keys, or other credentials. Use `.env.example` for configuration names only.

## Local verification

Run the relevant checks locally before opening a pull request. For the prototype:

```bash
cd prototype
npm start
```

Confirm that the changed behavior works locally and that the Vercel Preview is healthy when deployment configuration changes.
