export enum ProgrammingLanguage {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  DART = 'dart',
  SWIFT = 'swift',
}

export function detectLanguage(languageId: string): ProgrammingLanguage {
  switch (languageId) {
    case 'javascript':
    case 'javascriptreact':
      return ProgrammingLanguage.JAVASCRIPT;
    case 'typescript':
    case 'typescriptreact':
      return ProgrammingLanguage.TYPESCRIPT;
    case 'dart':
      return ProgrammingLanguage.DART;
    case 'swift':
      return ProgrammingLanguage.SWIFT;
    default:
      return ProgrammingLanguage.JAVASCRIPT; // fallback
  }
}

export function getLogFunction(language: ProgrammingLanguage): string {
  switch (language) {
    case ProgrammingLanguage.JAVASCRIPT:
    case ProgrammingLanguage.TYPESCRIPT:
      return 'console.log';
    case ProgrammingLanguage.DART:
      return 'print';
    case ProgrammingLanguage.SWIFT:
      return 'print';
    default:
      return 'console.log';
  }
}

export function getLogFormat(language: ProgrammingLanguage): {
  prefix: string;
  suffix: string;
  wrapVariable: boolean;
} {
  switch (language) {
    case ProgrammingLanguage.JAVASCRIPT:
    case ProgrammingLanguage.TYPESCRIPT:
      return {
        prefix: '(',
        suffix: ')',
        wrapVariable: false, // console.log(variable)
      };
    case ProgrammingLanguage.DART:
      return {
        prefix: '(',
        suffix: ')',
        wrapVariable: false, // print(variable)
      };
    case ProgrammingLanguage.SWIFT:
      return {
        prefix: '(',
        suffix: ')',
        wrapVariable: false, // print(variable)
      };
    default:
      return {
        prefix: '(',
        suffix: ')',
        wrapVariable: false,
      };
  }
}
