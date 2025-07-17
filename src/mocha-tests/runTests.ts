import * as path from 'path';
import { runTests } from 'vscode-test';

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');
    const extensionTestsPath = path.resolve(__dirname, './testsRunner');

    const vscodeVersion = 'stable';

    // Detect platform dynamically or use environment variable
    let platform: string;
    if (process.env.VSCODE_TEST_PLATFORM) {
      platform = process.env.VSCODE_TEST_PLATFORM;
    } else {
      const os = process.platform;
      const arch = process.arch;
      if (os === 'darwin') {
        platform = arch === 'arm64' ? 'darwin-arm64' : 'darwin';
      } else if (os === 'linux') {
        platform = arch === 'arm64' ? 'linux-arm64' : 'linux-x64';
      } else {
        platform = 'win32-x64';
      }
    }

    await runTests({
      version: vscodeVersion,
      platform,
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [
        '--disable-extensions',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        `--user-data-dir=${path.join(__dirname, '../../.vscode-test-user-data')}`,
      ],
    });
  } catch (err) {
    console.error('Failed to run tests', err);
    process.exit(1);
  }
}

main();
