import { TextDocument } from 'vscode';
import { Message, ExtensionProperties } from '../../../../entities';

export function detectAll(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  document: TextDocument,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logFunction: ExtensionProperties['logFunction'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logType: ExtensionProperties['logType'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logMessagePrefix: ExtensionProperties['logMessagePrefix'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delimiterInsideMessage: ExtensionProperties['delimiterInsideMessage'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  args?: unknown[],
): Message[] {
  // Simple implementation for Swift - just return empty array for now
  // This could be enhanced to detect all log statements in Swift code
  // TODO: Implement proper Swift log detection logic
  return [];
}
