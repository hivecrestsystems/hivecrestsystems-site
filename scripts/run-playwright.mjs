// Runs the Playwright browser tests inside the official Playwright container,
// so screenshots render identically on a Mac and in GitHub Actions.
// Inside CI (which already runs in that container) it runs Playwright directly.
// Any extra arguments are passed to `playwright test`.
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const inContainer = process.env.CI === 'true' || process.env.PLAYWRIGHT_CONTAINER === '1';

function run(cmd, cmdArgs) {
  const result = spawnSync(cmd, cmdArgs, { stdio: 'inherit' });
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  process.exit(result.status ?? 1);
}

if (inContainer) {
  run('npx', ['playwright', 'test', ...args]);
}

const { version } = JSON.parse(
  readFileSync(new URL('../node_modules/@playwright/test/package.json', import.meta.url), 'utf8'),
);
const image = `mcr.microsoft.com/playwright:v${version}-noble`;

const docker = spawnSync('docker', ['info'], { stdio: 'ignore' });
if (docker.status !== 0) {
  console.error('Docker is not running. Start Docker Desktop, then run this again.');
  process.exit(1);
}

run('docker', [
  'run', '--rm', '--init', '--ipc=host',
  '-v', `${process.cwd()}:/work`,
  '-w', '/work',
  '-e', 'PLAYWRIGHT_CONTAINER=1',
  image,
  'npx', 'playwright', 'test', ...args,
]);
