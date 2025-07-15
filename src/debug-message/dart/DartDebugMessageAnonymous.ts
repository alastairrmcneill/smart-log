import { LineCodeProcessing } from '../../line-code-processing';

export class DartDebugMessageAnonymous {
  constructor(private lineCodeProcessing: LineCodeProcessing) {}

  isAnonymousFunctionContext(
    selectedVar: string,
    selectedVarLineLoc: string,
  ): boolean {
    return this.lineCodeProcessing.isAnonymousFunction(selectedVarLineLoc);
  }

  anonymousPropDebuggingMsg(): void {
    // Simplified implementation for Dart
    // We'll skip the complex anonymous function handling for now
  }
}
