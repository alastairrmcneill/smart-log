import * as vscode from 'vscode';
import { Command } from '../entities';
import { getTabSize } from '../utilities';

export function displayLogMessageCommand(): Command {
  return {
    name: 'smartLog.displayLogMessage',
    handler: async ({ extensionProperties, debugMessage }) => {
      console.log('🎯 DISPLAY LOG MESSAGE COMMAND CALLED!');

      const editor: vscode.TextEditor | undefined =
        vscode.window.activeTextEditor;
      if (!editor) {
        console.log('🎯 NO ACTIVE EDITOR - returning early');
        return;
      }

      console.log(
        '🎯 Active editor found, document language:',
        editor.document.languageId,
      );
      console.log('🎯 Document file name:', editor.document.fileName);

      const tabSize: number | string = getTabSize(editor.options.tabSize);
      const document: vscode.TextDocument = editor.document;

      console.log('🎯 Number of selections:', editor.selections.length);

      for (let index = 0; index < editor.selections.length; index++) {
        const selection: vscode.Selection = editor.selections[index];
        console.log(
          '🎯 Processing selection',
          index + 1,
          'of',
          editor.selections.length,
        );

        let wordUnderCursor = '';
        const rangeUnderCursor: vscode.Range | undefined =
          document.getWordRangeAtPosition(selection.active);
        // if rangeUnderCursor is undefined, `document.getText(undefined)` will return the entire file.
        if (rangeUnderCursor) {
          wordUnderCursor = document.getText(rangeUnderCursor);
        }
        const selectedVar: string =
          document.getText(selection) || wordUnderCursor;
        const lineOfSelectedVar: number = selection.active.line;

        console.log('🎯 Selected variable:', selectedVar);
        console.log('🎯 Line of selected var:', lineOfSelectedVar);
        console.log(
          '🎯 Selected var length after trim:',
          selectedVar.trim().length,
        );

        if (selectedVar.trim().length !== 0) {
          console.log('🎯 About to call debugMessage.msg...');
          console.log('🎯 debugMessage object:', debugMessage);

          await editor.edit((editBuilder) => {
            console.log('🎯 Inside editor.edit callback');
            debugMessage.msg(
              editBuilder,
              document,
              selectedVar,
              lineOfSelectedVar,
              tabSize,
              extensionProperties,
            );
          });
          console.log('🎯 Finished editor.edit');
        } else {
          console.log('🎯 Selected variable is empty - skipping');
        }
      }
    },
  };
}
