# Maze Runner

Maze Runner is a single-page React game where the player moves through a neon maze, completes levels, and tracks results across a short adventure campaign. The project was gradually expanded through several lab works and is now being prepared as a final submission for labs 1, 2, 7, 8, 11, and 12.

## Features

- Start screen with route-based navigation.
- Game menu with mode, difficulty, and timer settings.
- Maze generation and player movement via custom hooks.
- Redux Toolkit state management for progress and settings.
- Result screen with completed level records.
- Local persistence of selected settings and statistics via `localStorage`.

## Tech Stack

- React 19
- React Router DOM 7
- Redux Toolkit
- React Redux
- Formik
- Yup
- CSS Modules
- Create React App (`react-scripts`)

## Project Structure

```text
src/
  components/      reusable UI and game components
  hooks/           maze, timer, and player logic
  pages/           route-level pages
  store/           Redux Toolkit slices and store config
  styles/          CSS Modules and global styles
public/            static assets
screenshots/       gameplay screenshots
```

## Application Flow

- `/` redirects to `/user/1/start`
- `/user/:id/start` shows the intro screen
- `/user/:id/menu` allows the player to configure the game
- `/user/:id/game` starts the maze gameplay
- `/user/:id/result` displays recorded results

## Configuration

The project currently stores part of its runtime configuration in `localStorage`:

- `mazeSettings`: selected game mode, difficulty, timer mode, and time limit
- `mazeStats`: saved statistics entries with difficulty, time, and date

Default gameplay settings:

- Mode: `adventure`
- Difficulty: `easy`
- Timer mode: `none`
- Time limit: `60` seconds

## Scripts

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Planned Final-Project Artifacts

The following files and tools are part of the final submission and will be added in the next commits on this branch:

- [LICENSE](./LICENSE)
- dependency license report in the project root
- [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) or equivalent usage policy
- generated local documentation
- Storybook with documented components
- video walkthrough for local documentation

## Author

- Ann Muha

## License

The license for the project code will be published in [LICENSE](./LICENSE). Third-party dependency licenses will be verified and committed as a separate report file in the repository root.
