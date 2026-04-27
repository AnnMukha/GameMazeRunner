"use strict";

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(projectRoot, "src");
const docsRoot = path.join(projectRoot, "docs");
const packageJson = JSON.parse(
  fs.readFileSync(path.join(projectRoot, "package.json"), "utf8")
);

const descriptions = {
  "src/App.js":
    "Top-level router that controls the main game flow and renders the GDPR consent UI.",
  "src/pages/StartPage.jsx":
    "Intro screen that redirects players into the main gameplay flow.",
  "src/pages/MenuPage.jsx":
    "Configuration page for selecting mode, difficulty, and timer behavior before the game starts.",
  "src/pages/GamePage.jsx":
    "Core gameplay screen that connects maze generation, player movement, timer logic, and level progression.",
  "src/pages/ResultPage.jsx":
    "Summary screen that lists completed level records and returns the user to the menu.",
  "src/components/Button.jsx":
    "Reusable neon-styled action button used across gameplay and menus.",
  "src/components/GameOverModal.jsx":
    "Complex UI component for end-of-level actions such as restarting, continuing, or finishing the run.",
  "src/components/MazeGrid.jsx":
    "Visual grid renderer for maze cells and the player's current position.",
  "src/components/CookieConsentBanner.jsx":
    "GDPR-oriented cookie and local-storage consent banner with configurable categories.",
  "src/hooks/useMaze.js":
    "Generates solvable mazes based on size, difficulty, and a seed-driven random generator.",
  "src/hooks/usePlayer.js":
    "Encapsulates player position state and movement rules inside the maze.",
  "src/hooks/useTimer.js":
    "Provides stopwatch-style timing for free play and limit-based game modes.",
  "src/store/gameStateSlice.js":
    "Stores current level progress, difficulty progression, and in-memory gameplay records.",
  "src/store/gameSettingsSlice.js":
    "Stores configurable game settings and optional local persistence guarded by consent preferences.",
  "src/store/store.js":
    "Redux Toolkit store configuration that combines the gameplay and settings slices.",
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function walkFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
    } else if (/\.(js|jsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractExports(source) {
  const matches = [];
  const patterns = [
    /export default function\s+([A-Za-z0-9_]+)/g,
    /export const\s+([A-Za-z0-9_]+)/g,
    /export function\s+([A-Za-z0-9_]+)/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(source))) {
      matches.push(match[1]);
    }
  }

  return [...new Set(matches)];
}

function extractImports(source) {
  const matches = source.match(/^import\s.+$/gm);
  return matches || [];
}

function extractRoutes(appSource) {
  const routes = [];
  const routePattern = /<Route\s+path="([^"]+)"\s+element={<([^>\s]+).*?} \/>/g;
  let match;

  while ((match = routePattern.exec(appSource))) {
    routes.push({
      path: match[1],
      element: match[2],
    });
  }

  return routes;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const sourceFiles = walkFiles(srcRoot);
const moduleDocs = sourceFiles.map((filePath) => {
  const source = fs.readFileSync(filePath, "utf8");
  const relativePath = path.relative(projectRoot, filePath).replaceAll("\\", "/");
  const pathParts = relativePath.split("/");
  const folder = pathParts.length > 2 ? pathParts[1] : "root";
  const exportsList = extractExports(source);
  const imports = extractImports(source);

  return {
    path: relativePath,
    name: path.basename(filePath),
    category: folder,
    description:
      descriptions[relativePath] ||
      "Internal source module included in the Maze Runner application.",
    exports: exportsList,
    importCount: imports.length,
    lineCount: source.split("\n").length,
  };
});

moduleDocs.sort((left, right) => left.path.localeCompare(right.path));

const appSource = fs.readFileSync(path.join(srcRoot, "App.js"), "utf8");
const routes = extractRoutes(appSource);

const groupedModules = moduleDocs.reduce((acc, moduleDoc) => {
  if (!acc[moduleDoc.category]) {
    acc[moduleDoc.category] = [];
  }

  acc[moduleDoc.category].push(moduleDoc);
  return acc;
}, {});

const docsJson = {
  generatedAt: new Date().toISOString(),
  project: {
    name: packageJson.name,
    version: packageJson.version,
    dependencies: Object.keys(packageJson.dependencies || {}),
    scripts: packageJson.scripts,
  },
  routes,
  modules: moduleDocs,
};

const moduleSections = Object.entries(groupedModules)
  .map(([category, modules]) => {
    const cards = modules
      .map((moduleDoc) => {
        const exportsHtml = moduleDoc.exports.length
          ? moduleDoc.exports.map((entry) => `<code>${escapeHtml(entry)}</code>`).join(" ")
          : "<span class=\"muted\">No named exports detected</span>";

        return `
          <article class="card">
            <p class="badge">${escapeHtml(category)}</p>
            <h3>${escapeHtml(moduleDoc.name)}</h3>
            <p>${escapeHtml(moduleDoc.description)}</p>
            <dl>
              <dt>Path</dt>
              <dd><code>${escapeHtml(moduleDoc.path)}</code></dd>
              <dt>Exports</dt>
              <dd>${exportsHtml}</dd>
              <dt>Imports</dt>
              <dd>${moduleDoc.importCount}</dd>
              <dt>Lines</dt>
              <dd>${moduleDoc.lineCount}</dd>
            </dl>
          </article>
        `;
      })
      .join("\n");

    return `
      <section class="section">
        <div class="section-header">
          <h2>${escapeHtml(category)}</h2>
          <p>${modules.length} documented module(s)</p>
        </div>
        <div class="grid">${cards}</div>
      </section>
    `;
  })
  .join("\n");

const routesHtml = routes
  .map(
    (route) => `
      <tr>
        <td><code>${escapeHtml(route.path)}</code></td>
        <td>${escapeHtml(route.element)}</td>
      </tr>
    `
  )
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Maze Runner Documentation</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111f;
        --panel: rgba(10, 18, 34, 0.84);
        --panel-2: rgba(18, 28, 50, 0.92);
        --line: rgba(133, 214, 255, 0.22);
        --text: #f5f9ff;
        --muted: #a4b7cf;
        --accent: #7ae3ff;
        --accent-2: #87a8ff;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(80, 175, 255, 0.16), transparent 30%),
          radial-gradient(circle at bottom right, rgba(116, 255, 214, 0.14), transparent 28%),
          var(--bg);
      }

      .shell {
        width: min(1180px, calc(100% - 32px));
        margin: 0 auto;
        padding: 40px 0 56px;
      }

      .hero,
      .section {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 28px;
        backdrop-filter: blur(10px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.32);
      }

      .hero {
        padding: 32px;
        margin-bottom: 24px;
      }

      .eyebrow {
        margin: 0 0 10px;
        color: var(--accent);
        letter-spacing: 0.18em;
        text-transform: uppercase;
        font-size: 12px;
      }

      h1, h2, h3 {
        margin: 0;
      }

      .lead {
        margin: 14px 0 0;
        max-width: 820px;
        line-height: 1.7;
        color: var(--muted);
      }

      .hero-grid {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        margin-top: 26px;
      }

      .metric {
        padding: 16px 18px;
        border-radius: 20px;
        background: var(--panel-2);
        border: 1px solid rgba(146, 215, 255, 0.14);
      }

      .metric strong {
        display: block;
        margin-top: 8px;
        font-size: 1.2rem;
      }

      .section {
        padding: 28px;
        margin-bottom: 20px;
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: baseline;
        margin-bottom: 18px;
      }

      .section-header p,
      .muted {
        color: var(--muted);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
        border-radius: 18px;
      }

      th, td {
        text-align: left;
        padding: 12px 14px;
        border-bottom: 1px solid rgba(148, 205, 255, 0.12);
      }

      th {
        color: var(--accent);
        font-weight: 600;
      }

      .grid {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      }

      .card {
        padding: 18px;
        border-radius: 22px;
        background: var(--panel-2);
        border: 1px solid rgba(148, 216, 255, 0.12);
      }

      .card p {
        line-height: 1.6;
        color: var(--muted);
      }

      .badge {
        display: inline-block;
        margin: 0 0 10px;
        padding: 6px 10px;
        border-radius: 999px;
        background: rgba(122, 227, 255, 0.12);
        color: var(--accent);
      }

      dl {
        display: grid;
        gap: 8px;
        margin: 16px 0 0;
      }

      dt {
        color: var(--accent-2);
        font-weight: 600;
      }

      dd {
        margin: 0;
        color: var(--muted);
      }

      code {
        font-family: "SFMono-Regular", Consolas, monospace;
      }

      @media (max-width: 720px) {
        .shell {
          width: min(100% - 20px, 1180px);
          padding-top: 20px;
        }

        .hero,
        .section {
          padding: 20px;
          border-radius: 22px;
        }

        .section-header {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <p class="eyebrow">Generated local documentation</p>
        <h1>Maze Runner Technical Overview</h1>
        <p class="lead">
          This documentation page is generated from the current project structure, source files, package metadata,
          and route configuration. It summarizes the application architecture for local review and project submission.
        </p>
        <div class="hero-grid">
          <div class="metric">
            Project
            <strong>${escapeHtml(packageJson.name)}@${escapeHtml(packageJson.version)}</strong>
          </div>
          <div class="metric">
            Source modules
            <strong>${moduleDocs.length}</strong>
          </div>
          <div class="metric">
            Routes
            <strong>${routes.length}</strong>
          </div>
          <div class="metric">
            Generated at
            <strong>${escapeHtml(docsJson.generatedAt)}</strong>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>Available Scripts</h2>
          <p>${Object.keys(packageJson.scripts || {}).length} script(s)</p>
        </div>
        <div class="grid">
          ${Object.entries(packageJson.scripts || {})
            .map(
              ([name, command]) => `
                <article class="card">
                  <h3><code>npm run ${escapeHtml(name)}</code></h3>
                  <p>${escapeHtml(command)}</p>
                </article>
              `
            )
            .join("\n")}
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>Route Map</h2>
          <p>Derived from <code>src/App.js</code></p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Path</th>
              <th>Component</th>
            </tr>
          </thead>
          <tbody>
            ${routesHtml}
          </tbody>
        </table>
      </section>

      ${moduleSections}
    </main>
  </body>
</html>
`;

ensureDir(docsRoot);
fs.writeFileSync(
  path.join(docsRoot, "documentation.json"),
  `${JSON.stringify(docsJson, null, 2)}\n`,
  "utf8"
);
fs.writeFileSync(path.join(docsRoot, "index.html"), html, "utf8");

console.log("Documentation generated in docs/");
