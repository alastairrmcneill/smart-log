import { TextDocument } from 'vscode';
import { BlockType } from '../../../../entities';
import { LineCodeProcessing } from '../../../../line-code-processing';

/* eslint-disable @typescript-eslint/no-unused-vars */
export function enclosingBlockName(
  _document: TextDocument,
  _lineOfSelectedVar: number,
  _blockType: BlockType,
  _lineCodeProcessing: LineCodeProcessing,
): string {
  // Simple implementation for Swift - just return empty string for now
  // This could be enhanced to detect Swift classes, structs, functions, etc.
  return '';
}
/* eslint-enable @typescript-eslint/no-unused-vars */
