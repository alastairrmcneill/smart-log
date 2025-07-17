import { ExtensionProperties } from '../../entities';
import { LogType } from '../../entities/extension/extensionProperties';

export const extensionPropertiesMock: ExtensionProperties = {
  wrapLogMessage: false,
  logMessagePrefix: '🎯',
  logMessageSuffix: ':',
  addSemicolonInTheEnd: false,
  insertEnclosingClass: true,
  logCorrectionNotificationEnabled: false,
  insertEnclosingFunction: true,
  insertEmptyLineBeforeLogMessage: false,
  insertEmptyLineAfterLogMessage: false,
  quote: '"',
  delimiterInsideMessage: '~',
  includeLineNum: false,
  includeFilename: false,
  logType: 'log' as LogType,
  logFunction: 'log',
};
