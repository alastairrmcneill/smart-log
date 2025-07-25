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
import { DartLineCodeProcessing } from '../../../line-code-processing/dart';
import { LineCodeProcessing } from '../../../line-code-processing';
import { dartDebugMessageLine } from '../DartDebugMessageLine/';

const dartLineCodeProcessing: LineCodeProcessing = new DartLineCodeProcessing();

export const dartDebugMessage: DebugMessage = {
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
      dartLineCodeProcessing,
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
      dartLineCodeProcessing,
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
      dartLineCodeProcessing,
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
    return dartDebugMessageLine.line(
      document,
      selectionLine,
      selectedVar,
      logMsg,
    );
  },
};
