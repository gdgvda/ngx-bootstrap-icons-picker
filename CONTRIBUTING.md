# Angular Bootstrap Icons Picker

## Development

Use Node.js 22.22.3+, 24.15.0+ or 26+ (supported Angular 22 release lines), and TypeScript 6.0.x. Install the locked dependencies and build the library first:

```sh
npm ci
npm run build-lib
```

Run these commands in separate terminals:

```sh
npm run watch-lib
npm run watch-demo
```

Open [http://localhost:4200](http://localhost:4200). The demo imports the built library from `dist/ngx-bootstrap-icons-picker`, so its build must exist before serving or running the demo tests.

## Checks

```sh
npm run check:icons
npm run build-lib
npm run test:ci
npx playwright install chromium
npm run test:browser
npm run build-demo
npm audit
```

Tests use Vitest and Angular's zoneless test environment. `test:ci` runs the library and demo tests in jsdom; `test:browser` also runs the real-layout regression tests in Chromium. On Linux, install browser system dependencies with `npx playwright install --with-deps chromium`.

The GitHub Actions workflow runs these checks for pushes and pull requests. It does not publish packages or deploy the demo.

## Updating Bootstrap Icons

Update the pinned `bootstrap-icons` dependency and lockfile, then regenerate the catalog:

```sh
npm run sync:icons
npm run check:icons
```

Update the required icon-font version and icon count in both READMEs. The catalog is generated from `node_modules/bootstrap-icons/font/bootstrap-icons.json`; avoid editing it manually.

## Publish to NPM

Update the version in `package.json` and `projects/lib/package.json`. Keep `README.md` and `projects/lib/README.md` identical and run the checks above.

```sh
npm run build-lib
npm pack ./dist/ngx-bootstrap-icons-picker --dry-run
npm publish ./dist/ngx-bootstrap-icons-picker
```

## Publish demo to GitHub Pages

```sh
npm run build-demo
```

The build writes directly into `docs/`, with `/ngx-bootstrap-icons-picker/` as its base URL. Commit the refreshed demo files together with the source changes when preparing a release.
