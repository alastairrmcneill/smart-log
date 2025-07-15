import { DebugMessageLine } from '../../DebugMessageLine';

export const dartDebugMessageLine: DebugMessageLine = {
  line(
    document,
    selectionLine,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedVar,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logMsg,
  ): number {
    // Simple line placement for Dart - just place after the current line
    return selectionLine + 1;
  },
};
