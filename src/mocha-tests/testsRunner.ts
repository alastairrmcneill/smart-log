import * as path from 'path';
import * as vscode from 'vscode';
import Mocha from 'mocha';
import glob from 'glob';

async function waitForExtensionActivation(): Promise<void> {
  // Wait for the extension to be activated and commands to be available
  const maxWaitTime = 10000; // 10 seconds
  const checkInterval = 100; // 100ms
  let elapsed = 0;

  while (elapsed < maxWaitTime) {
    try {
      // Try to get all commands - this will include our extension commands once activated
      const commands = await vscode.commands.getCommands(true);
      const hasDisplayCommand = commands.includes(
        'brightLog.displayLogMessage',
      );
      const hasCommentCommand = commands.includes(
        'brightLog.commentAllLogMessages',
      );
      const hasDeleteCommand = commands.includes(
        'brightLog.deleteAllLogMessages',
      );

      if (hasDisplayCommand && hasCommentCommand && hasDeleteCommand) {
        console.log('Extension commands are now available');
        return;
      }
    } catch {
      // Commands not ready yet
    }

    await new Promise((resolve) => setTimeout(resolve, checkInterval));
    elapsed += checkInterval;
  }

  throw new Error('Extension failed to activate within timeout period');
}

export function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
    color: true,
  });
  mocha.timeout(15000); // Increased timeout for activation

  const testsRoot = path.resolve(__dirname, '..');

  return new Promise((c, e) => {
    // Wait for extension activation before running tests
    waitForExtensionActivation()
      .then(() => {
        glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
          if (err) {
            return e(err);
          }

          // Add files to the test suite
          files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

          try {
            // Run the mocha test
            mocha.run((failures) => {
              if (failures > 0) {
                e(new Error(`${failures} tests failed.`));
              } else {
                process.exit();
              }
            });
          } catch (err) {
            console.error(err);
            e(err);
          }
        });
      })
      .catch(e);
  });
}
