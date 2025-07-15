import * as vscode from 'vscode';

export function activateFreemiumMode(): void {
  vscode.commands.executeCommand('setContext', 'smartLog:isPro', false);
  vscode.commands.executeCommand('setContext', 'smartLog:isRepairMode', false);
  vscode.commands.executeCommand('setContext', 'smartLog:isInitialized', true);
}
