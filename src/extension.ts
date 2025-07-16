import * as vscode from 'vscode';
import { jsDebugMessage } from './debug-message/js';
import { dartDebugMessage } from './debug-message/dart/DartDebugMessage/DartDebugMessage';
import { swiftDebugMessage } from './debug-message/swift';
import { Command, ExtensionProperties } from './entities';
import { getAllCommands } from './commands/';
import { getExtensionProperties, activateFreemiumMode } from './helpers';
import { showReleaseHtmlWebViewAndNotification } from './ui/helpers';
import {
  getLatestWebViewReleaseVersion,
  getPreviousWebViewReleaseVersion,
} from './releases';
import {
  detectLanguage,
  ProgrammingLanguage,
} from './utilities/languageDetection';

function getDebugMessageForLanguage(languageId: string) {
  const language = detectLanguage(languageId);

  switch (language) {
    case ProgrammingLanguage.DART:
      return dartDebugMessage;
    case ProgrammingLanguage.SWIFT:
      return swiftDebugMessage;
    case ProgrammingLanguage.JAVASCRIPT:
    case ProgrammingLanguage.TYPESCRIPT:
    default:
      return jsDebugMessage;
  }
}

export async function activate(
  context: vscode.ExtensionContext,
): Promise<void> {
  const config: vscode.WorkspaceConfiguration =
    vscode.workspace.getConfiguration('brightLog');
  const extensionProperties: ExtensionProperties =
    getExtensionProperties(config);
  const commands: Array<Command> = getAllCommands();

  for (const { name, handler } of commands) {
    vscode.commands.registerCommand(name, (args: unknown[]) => {
      // Get the active editor to determine the language
      const editor = vscode.window.activeTextEditor;
      const languageId = editor?.document.languageId || 'javascript';
      const debugMessage = getDebugMessageForLanguage(languageId);

      handler({
        extensionProperties,
        debugMessage,
        args,
        context,
      });
    });
  }
  const previousWebViewReleaseVersion = getPreviousWebViewReleaseVersion();
  const latestWebViewReleaseVersion = getLatestWebViewReleaseVersion();
  showReleaseHtmlWebViewAndNotification(
    context,
    previousWebViewReleaseVersion,
    latestWebViewReleaseVersion,
  );
  activateFreemiumMode();
}
