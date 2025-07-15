import { TextDocument } from 'vscode';
import { BlockType } from '../../../../entities';
import { LineCodeProcessing } from '../../../../line-code-processing';

export function enclosingBlockName(
  document: TextDocument,
  lineOfSelectedVar: number,
  blockType: BlockType,
  lineCodeProcessing: LineCodeProcessing,
): string {
  // Simple implementation for Swift - just return empty string for now
  // This could be enhanced to detect Swift classes, structs, functions, etc.
  return '';
}
