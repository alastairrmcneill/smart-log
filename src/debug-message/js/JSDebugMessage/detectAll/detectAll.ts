import type { TextDocument } from 'vscode';
import {
  Message,
  BracketType,
  ExtensionProperties,
} from '../../../../entities';
import { closingContextLine } from '../../../../utilities';
import { spacesBeforeLogMsg } from '../helpers';
import { logFunctionToUse } from './helpers';
import {
  detectLanguage,
  getLogFunction,
  ProgrammingLanguage,
} from '../../../../utilities/languageDetection';

export function detectAll(
  document: TextDocument,
  logFunction: ExtensionProperties['logFunction'],
  logType: ExtensionProperties['logType'],
  logMessagePrefix: ExtensionProperties['logMessagePrefix'],
  delimiterInsideMessage: ExtensionProperties['delimiterInsideMessage'],
  args?: unknown[],
): Message[] {
  // Detect the current language and get appropriate log function
  const language = detectLanguage(document.languageId);

  let logFunctionToUseResult: string;
  if (
    language === ProgrammingLanguage.JAVASCRIPT ||
    language === ProgrammingLanguage.TYPESCRIPT
  ) {
    logFunctionToUseResult = logFunctionToUse(logFunction, logType, args);
  } else {
    logFunctionToUseResult = getLogFunction(language);
  }

  const documentNbrOfLines: number = document.lineCount;
  const logMessages: Message[] = [];
  for (let i = 0; i < documentNbrOfLines; i++) {
    const brightLogMessage = new RegExp(
      logFunctionToUseResult.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    );
    if (brightLogMessage.test(document.lineAt(i).text)) {
      const logMessage: Message = {
        spaces: '',
        lines: [],
      };
      logMessage.spaces = spacesBeforeLogMsg(document, i, i);
      const closedParenthesisLine = closingContextLine(
        document,
        i,
        BracketType.PARENTHESIS,
      );
      let msg = '';
      for (let j = i; j <= closedParenthesisLine; j++) {
        msg += document.lineAt(j).text;
        logMessage.lines.push(document.lineAt(j).rangeIncludingLineBreak);
      }
      if (
        new RegExp(logMessagePrefix).test(msg) &&
        new RegExp(delimiterInsideMessage).test(msg)
      ) {
        logMessages.push(logMessage);
      }
    }
  }
  return logMessages;
}
