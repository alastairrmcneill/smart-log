import { LineCodeProcessing } from '../../line-code-processing';

export class SwiftDebugMessageAnonymous {
  constructor(private lineCodeProcessing: LineCodeProcessing) {}

  // Simple anonymous function detection for Swift
  // In Swift, closures are like { } or { parameters in ... }
  isAnonymousFunction(line: string): boolean {
    const trimmedLine = line.trim();
    return /\{.*\}/.test(trimmedLine) || /\{.*in.*\}/.test(trimmedLine);
  }
}
