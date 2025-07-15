import { TextDocument, TextEditorEdit } from 'vscode';
import {
  BlockType,
  ExtensionProperties,
  Message,
  LogMessage,
} from '../../../entities';
import { DebugMessage } from '../../DebugMessage';
import { logMessage } from './logMessage';
import { enclosingBlockName } from './enclosingBlockName';
import { detectAll } from './detectAll';
import { msg } from './msg';
import { SwiftLineCodeProcessing } from '../../../line-code-processing/swift';
import { LineCodeProcessing } from '../../../line-code-processing';
import { SwiftDebugMessageAnonymous } from '../SwiftDebugMessageAnonymous';
import { swiftDebugMessageLine } from '../SwiftDebugMessageLine/';

const swiftLineCodeProcessing: LineCodeProcessing =
  new SwiftLineCodeProcessing();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _swiftDebugMessageAnonymous = new SwiftDebugMessageAnonymous(
  swiftLineCodeProcessing,
);

// TODO: Implement full Swift debug message functionality
// For now, return a simplified object with basic functionality

export const swiftDebugMessage: DebugMessage = {
  msg(
    textEditor: TextEditorEdit,
    document: TextDocument,
    selectedVar: string,
    lineOfSelectedVar: number,
    tabSize: number,
    extensionProperties: ExtensionProperties,
  ): void {
    msg(
      textEditor,
      document,
      selectedVar,
      lineOfSelectedVar,
      tabSize,
      extensionProperties,
      swiftLineCodeProcessing,
    );
  },
  logMessage(
    document: TextDocument,
    selectionLine: number,
    selectedVar: string,
  ): LogMessage {
    return logMessage(
      document,
      selectionLine,
      selectedVar,
      swiftLineCodeProcessing,
    );
  },
  enclosingBlockName(
    document: TextDocument,
    lineOfSelectedVar: number,
    blockType: BlockType,
  ): string {
    return enclosingBlockName(
      document,
      lineOfSelectedVar,
      blockType,
      swiftLineCodeProcessing,
    );
  },
  detectAll(
    document: TextDocument,
    logFunction: ExtensionProperties['logFunction'],
    logType: ExtensionProperties['logType'],
    logMessagePrefix: ExtensionProperties['logMessagePrefix'],
    delimiterInsideMessage: ExtensionProperties['delimiterInsideMessage'],
    args?: unknown[],
  ): Message[] {
    return detectAll(
      document,
      logFunction,
      logType,
      logMessagePrefix,
      delimiterInsideMessage,
      args,
    );
  },
  line(
    document: TextDocument,
    selectionLine: number,
    selectedVar: string,
    logMsg: LogMessage,
  ): number {
    return swiftDebugMessageLine.line(
      document,
      selectionLine,
      selectedVar,
      logMsg,
    );
  },
};
