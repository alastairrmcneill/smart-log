import { DebugMessageLine } from '../../DebugMessageLine';

export const swiftDebugMessageLine: DebugMessageLine = {
  line(
    document,
    selectionLine,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedVar,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logMsg,
  ): number {
    // Simple line placement for Swift - just place after the current line
    return selectionLine + 1;
  },
};
