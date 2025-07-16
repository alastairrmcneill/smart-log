import * as vscode from 'vscode';
import Mocha, { it, describe } from 'mocha';
import { expect } from 'chai';
import {
  openDocument,
  expectActiveTextEditorWithFile,
  documentLinesChanged,
  NaturalEditorPosition,
  naturalEditorLine,
} from '../../../helpers';
import { ProgrammingLanguage } from '../../../../../entities';

export default (): void => {
  describe('Function call', () => {
    Mocha.beforeEach(async () => {
      await openDocument(
        ProgrammingLanguage.JAVASCRIPT,
        'log-feature/function',
        'functionCall.ts',
      );
    });
    Mocha.afterEach(async () => {
      await vscode.commands.executeCommand(
        'workbench.action.closeActiveEditor',
        [],
      );
    });
    it('Should insert the log message related to function call assigned to a variable', async () => {
      const { activeTextEditor } = vscode.window;
      expectActiveTextEditorWithFile(activeTextEditor, 'functionCall.ts');
      if (activeTextEditor) {
        activeTextEditor.selections = [
          new vscode.Selection(
            new NaturalEditorPosition(2, 7),
            new NaturalEditorPosition(2, 16),
          ),
        ];
        await vscode.commands.executeCommand('brightLog.displayLogMessage', []);
        await Promise.all(
          documentLinesChanged(activeTextEditor.document, [
            naturalEditorLine(5),
          ]),
        );
        const textDocument = activeTextEditor.document;
        const logMessage = textDocument.lineAt(naturalEditorLine(5)).text;
        expect(/console\.log\(.*/.test(logMessage)).to.equal(true);
      }
    });
    it('Should insert the log message related to styled call function assigned to a variable', async () => {
      const { activeTextEditor } = vscode.window;
      expectActiveTextEditorWithFile(activeTextEditor, 'functionCall.ts');
      if (activeTextEditor) {
        activeTextEditor.selections = [
          new vscode.Selection(
            new NaturalEditorPosition(6, 7),
            new NaturalEditorPosition(6, 17),
          ),
        ];
        await vscode.commands.executeCommand('brightLog.displayLogMessage', []);
        await Promise.all(
          documentLinesChanged(activeTextEditor.document, [
            naturalEditorLine(16),
          ]),
        );
        const textDocument = activeTextEditor.document;
        const logMessage = textDocument.lineAt(naturalEditorLine(16)).text;
        expect(/console\.log\(.*/.test(logMessage)).to.equal(true);
      }
    });
    it('Should insert smart message in the right location given a chained call context', async () => {
      const { activeTextEditor } = vscode.window;
      expectActiveTextEditorWithFile(activeTextEditor, 'functionCall.ts');
      if (activeTextEditor) {
        activeTextEditor.selections = [
          new vscode.Selection(
            new NaturalEditorPosition(18, 9),
            new NaturalEditorPosition(18, 14),
          ),
        ];
        await vscode.commands.executeCommand('brightLog.displayLogMessage', []);
        await Promise.all(
          documentLinesChanged(activeTextEditor.document, [
            naturalEditorLine(19),
          ]),
        );
        const textDocument = activeTextEditor.document;
        const logMessage = textDocument.lineAt(naturalEditorLine(19)).text;
        expect(/console\.log\(.*/.test(logMessage)).to.equal(true);
      }
    });
    it('Should compute the right bright log message line number in the contex of a complex chain. issue-260', async () => {
      const { activeTextEditor } = vscode.window;
      expectActiveTextEditorWithFile(activeTextEditor, 'functionCall.ts');
      if (activeTextEditor) {
        activeTextEditor.selections = [
          new vscode.Selection(
            new NaturalEditorPosition(24, 9),
            new NaturalEditorPosition(24, 13),
          ),
        ];
        await vscode.commands.executeCommand('brightLog.displayLogMessage', []);
        await Promise.all(
          documentLinesChanged(activeTextEditor.document, [
            naturalEditorLine(28),
          ]),
        );
        const textDocument = activeTextEditor.document;
        const logMessage = textDocument.lineAt(naturalEditorLine(28)).text;
        expect(/console\.log\(.*/.test(logMessage)).to.equal(true);
      }
    });
  });
};
