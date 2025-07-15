import { TextDocument } from 'vscode';
import { LogMessage, LogMessageType } from '../../../../entities';
import { LineCodeProcessing } from '../../../../line-code-processing';

export function logMessage(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  document: TextDocument,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectionLine: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedVar: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lineCodeProcessing: LineCodeProcessing,
): LogMessage {
  // For Swift, we'll use a simplified approach and default to primitive assignment
  return {
    logMessageType: LogMessageType.PrimitiveAssignment,
  };
}
