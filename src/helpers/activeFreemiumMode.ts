import * as vscode from 'vscode';

export function activateFreemiumMode(): void {
  vscode.commands.executeCommand('setContext', 'brightLog:isPro', false);
  vscode.commands.executeCommand('setContext', 'brightLog:isRepairMode', false);
  vscode.commands.executeCommand('setContext', 'brightLog:isInitialized', true);
}
