import { Position, TextDocument, TextEditorEdit } from 'vscode';
import { ExtensionProperties } from '../../../../entities';
import { LineCodeProcessing } from '../../../../line-code-processing';
import {
  detectLanguage,
  getLogFunction,
  ProgrammingLanguage,
} from '../../../../utilities/languageDetection';
import { enclosingBlockName } from '../../../js/JSDebugMessage/enclosingBlockName';
import { spacesBeforeLine } from '../../../../utilities';

function constructDebuggingMsg(
  extensionProperties: ExtensionProperties,
  debuggingMsgContent: string,
  spacesBeforeMsg: string,
  language: ProgrammingLanguage,
): string {
  const logFunction = getLogFunction(language);
  const wrappingMsg = `${logFunction}(${extensionProperties.quote}${
    extensionProperties.logMessagePrefix
  } ${'-'.repeat(debuggingMsgContent.length - 16)}${
    extensionProperties.logMessagePrefix
  }${extensionProperties.quote})`;
  const debuggingMsg: string = extensionProperties.wrapLogMessage
    ? `${spacesBeforeMsg}${wrappingMsg}\n${spacesBeforeMsg}${debuggingMsgContent}\n${spacesBeforeMsg}${wrappingMsg}`
    : `${spacesBeforeMsg}${debuggingMsgContent}`;

  return debuggingMsg;
}

function baseDebuggingMsg(
  document: TextDocument,
  textEditor: TextEditorEdit,
  lineOfLogMsg: number,
  debuggingMsg: string,
  insertEmptyLineBeforeLogMessage: ExtensionProperties['insertEmptyLineBeforeLogMessage'],
  insertEmptyLineAfterLogMessage: ExtensionProperties['insertEmptyLineAfterLogMessage'],
): void {
  const finalPosition =
    lineOfLogMsg >= document.lineCount ? document.lineCount : lineOfLogMsg;
  const textToInsert = `${insertEmptyLineBeforeLogMessage ? '\n' : ''}${
    lineOfLogMsg === document.lineCount ? '\n' : ''
  }${debuggingMsg}\n${insertEmptyLineAfterLogMessage ? '\n' : ''}`;

  textEditor.insert(new Position(finalPosition, 0), textToInsert);
}

function debuggingMsgQuote(settingQuote: string, selectedVar: string): string {
  const trimmedVar = selectedVar.trim();
  // If the variable starts with `{`, it's likely an object literal → use single quotes for Swift
  if (trimmedVar.startsWith('{')) {
    return "'";
  }
  if (selectedVar.includes(`"`)) {
    return "'";
  }
  if (selectedVar.includes(`'`)) {
    return '"';
  }
  return settingQuote;
}

function constructDebuggingMsgContent(
  document: TextDocument,
  selectedVar: string,
  lineOfSelectedVar: number,
  lineOfLogMsg: number,
  extensionProperties: Omit<
    ExtensionProperties,
    'wrapLogMessage' | 'insertEmptyLineAfterLogMessage'
  >,
  lineCodeProcessing: LineCodeProcessing,
  language: ProgrammingLanguage,
): string {
  const {
    includeFilename,
    includeLineNum,
    logMessagePrefix,
    logMessageSuffix,
    delimiterInsideMessage,
    insertEmptyLineBeforeLogMessage,
    quote,
    insertEnclosingClass,
    insertEnclosingFunction,
  } = extensionProperties;
  const fileName = document.fileName.includes('/')
    ? document.fileName.split('/')[document.fileName.split('/').length - 1]
    : document.fileName.split('\\')[document.fileName.split('\\').length - 1];
  let classThatEncloseTheVar = '';
  if (insertEnclosingClass) {
    classThatEncloseTheVar = enclosingBlockName(
      document,
      lineOfSelectedVar,
      'class',
      lineCodeProcessing,
    );
  }
  let funcThatEncloseTheVar = '';
  if (insertEnclosingFunction) {
    funcThatEncloseTheVar = enclosingBlockName(
      document,
      lineOfSelectedVar,
      'function',
      lineCodeProcessing,
    );
  }
  const quoteToUse: string = debuggingMsgQuote(quote, selectedVar);
  const logFunction = getLogFunction(language);

  // For Swift, use string interpolation syntax \\(variable) and no semicolons
  if (language === ProgrammingLanguage.SWIFT) {
    return `${logFunction}(${quoteToUse}${logMessagePrefix}${
      logMessagePrefix.length !== 0 &&
      delimiterInsideMessage.length !== 0 &&
      logMessagePrefix !== `${delimiterInsideMessage} `
        ? ` ${delimiterInsideMessage} `
        : ' '
    }${
      includeFilename || includeLineNum
        ? `${includeFilename ? fileName : ''}${includeLineNum ? ':' : ''}${
            includeLineNum
              ? lineOfLogMsg + (insertEmptyLineBeforeLogMessage ? 2 : 1)
              : ''
          }${delimiterInsideMessage ? ` ${delimiterInsideMessage} ` : ' '}`
        : ''
    }${
      classThatEncloseTheVar.length > 0
        ? `${classThatEncloseTheVar}${
            delimiterInsideMessage ? ` ${delimiterInsideMessage} ` : ''
          }`
        : ''
    }${
      funcThatEncloseTheVar.length > 0
        ? `${funcThatEncloseTheVar}${
            delimiterInsideMessage ? ` ${delimiterInsideMessage} ` : ' '
          }`
        : ''
    }${selectedVar}${logMessageSuffix} \\(${selectedVar})${quoteToUse})`; // Swift string interpolation, no semicolon
  }

  // Fallback for other languages (shouldn't reach here for Swift files)
  return `${logFunction}(${quoteToUse}${logMessagePrefix} ${selectedVar}${logMessageSuffix}${quoteToUse}, ${selectedVar})`;
}

export function msg(
  textEditor: TextEditorEdit,
  document: TextDocument,
  selectedVar: string,
  lineOfSelectedVar: number,
  tabSize: number,
  extensionProperties: ExtensionProperties,
  lineCodeProcessing: LineCodeProcessing,
): void {
  const language = detectLanguage(document.languageId);

  // For simplicity, use basic line placement for Swift
  const lineOfLogMsg = lineOfSelectedVar + 1;
  const spacesBeforeMsg = spacesBeforeLine(document, lineOfSelectedVar);

  const debuggingMsgContent = constructDebuggingMsgContent(
    document,
    selectedVar,
    lineOfSelectedVar,
    lineOfLogMsg,
    {
      includeFilename: extensionProperties.includeFilename,
      includeLineNum: extensionProperties.includeLineNum,
      logFunction: extensionProperties.logFunction,
      logType: extensionProperties.logType,
      logMessagePrefix: extensionProperties.logMessagePrefix,
      logMessageSuffix: extensionProperties.logMessageSuffix,
      delimiterInsideMessage: extensionProperties.delimiterInsideMessage,
      insertEmptyLineBeforeLogMessage:
        extensionProperties.insertEmptyLineBeforeLogMessage,
      quote: extensionProperties.quote,
      insertEnclosingClass: extensionProperties.insertEnclosingClass,
      insertEnclosingFunction: extensionProperties.insertEnclosingFunction,
      addSemicolonInTheEnd: extensionProperties.addSemicolonInTheEnd,
      logCorrectionNotificationEnabled:
        extensionProperties.logCorrectionNotificationEnabled,
    },
    lineCodeProcessing,
    language,
  );

  const debuggingMsg = constructDebuggingMsg(
    extensionProperties,
    debuggingMsgContent,
    spacesBeforeMsg,
    language,
  );

  baseDebuggingMsg(
    document,
    textEditor,
    lineOfLogMsg,
    debuggingMsg,
    extensionProperties.insertEmptyLineBeforeLogMessage,
    extensionProperties.insertEmptyLineAfterLogMessage,
  );
}
