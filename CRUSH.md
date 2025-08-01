# CRUSH.md

## Build, Lint, and Run Commands

- Start development server:
  ```bash
  npm run dev
  ```
- Create production build:
  ```bash
  npm run build
  ```
- Start production server:
  ```bash
  npm run start
  ```
- Lint codebase:
  ```bash
  npm run lint
  ```
- (No built-in tests) If you add tests (e.g. Jest or Vitest), run a single test:
  ```bash
  npx jest path/to/file.test.js --watch
  ```

## Code Style Guidelines

- **Imports**: Use ES modules (`import X from '...'`). Group imports in order: 1) built-ins, 2) external packages, 3) absolute aliases, 4) relative paths. One blank line between groups.
- **Formatting**: Follow Next.js defaults; 2 spaces indent, single quotes for strings, semicolons optional but preferred. Keep lines under 100 characters.
- **Types**: Code is JS/JSX; PropTypes are optional. For new modules, prefer JSDoc annotations or migrate to TS `.ts`/`.tsx`.
- **Naming**: Components and pages use PascalCase. Hooks and utilities use camelCase. Constants use UPPER_SNAKE_CASE.
- **Error Handling**: Wrap async API calls in `try/catch`. Log errors with `console.error` or use a logger. Propagate or display user-friendly messages.

## Directory Conventions

- `/app`: Next.js App Router. Each folder under `/app` is a route. Place shared UI in `/app/components`.
- `/utils`: Plain JS helpers. No React imports.
- `/public`: Static assets. Reference via `/` paths.

## Cursor & Copilot Rules

_No custom Cursor or Copilot rules found in `.cursor` or `.github/copilot-instructions.md`._

## Miscellaneous

- Environment variables: Copy from `.env.example` to `.env.local` (gitignored).
- CSS: Uses Tailwind with global overrides in `app/css/globals.scss`. Keep utility classes in JSX.
- Commit messages: Conventional style (type(scope): subject).