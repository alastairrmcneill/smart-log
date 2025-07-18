import { LineCodeProcessing } from '..';

export class JSLineCodeProcessing implements LineCodeProcessing {
  isAnonymousFunction(loc: string): boolean {
    return /.*=>.*/.test(loc);
  }
  isArgumentOfAnonymousFunction(loc: string, argument: string): boolean {
    if (this.isAnonymousFunction(loc)) {
      const match = loc.match(/(\(.*\)|\w+)\s*=>/);
      return match !== null && match[1].includes(argument);
    }
    return false;
  }
  shouldTransformAnonymousFunction(loc: string): boolean {
    if (this.isAnonymousFunction(loc)) {
      if (/.*=>\s+{/.test(loc)) {
        return false;
      }
      return true;
    }
    return false;
  }
  isAssignedToVariable(loc: string): boolean {
    return /^(?:const|let|var)?\s*(\w+|\$?\w+(\.\w+)*)(\s*{[^}]*}\s*)?\s*=/.test(
      loc.trim(),
    );
  }
  isAffectationToVariable(loc: string): boolean {
    return /.*=.*/.test(loc);
  }
  isObjectLiteralAssignedToVariable(loc: string): boolean {
    const locWithoutExtraSpaces = loc.replace(/\s+/g, ' ').trim();
    return /^\s*(?:export\s+)?(?:(?:const|let|var)\s+[\w$.]+|[\w$.]+\.[\w$.]+)\s*(?::\s*[\s\S]*?)?\s*=\s*\{/.test(
      locWithoutExtraSpaces,
    );
  }
  isArrayAssignedToVariable(loc: string): boolean {
    const locWithoutWhiteSpaces = loc.replace(/\s/g, '');
    return /^(const|let|var|\w+(\.\w+)*)(\s*:\s*[\w<>{}[\], ]+)?\s*=\s*\[/.test(
      locWithoutWhiteSpaces,
    );
  }
  doesContainClassDeclaration(loc: string): boolean {
    return /class(\s+).*{/.test(loc);
  }
  getClassName(loc: string): string {
    if (this.doesContainClassDeclaration(loc)) {
      return loc.split('class ')[1].trim().split(' ')[0].replace('{', '');
    } else {
      return '';
    }
  }
  doesContainsBuiltInFunction(loc: string): boolean {
    const locWithoutWhiteSpaces = loc.replace(/\s/g, '');
    return /(if|switch|while|for|catch|do)\(.*\)/.test(locWithoutWhiteSpaces);
  }
  doesContainsNamedFunctionDeclaration(loc: string): boolean {
    const locWithoutFunctionKeyword = loc.replace('function', '');
    const regularNamedFunctionRegex = new RegExp(
      /\s*[a-zA-Z0-9]+\s*\(.*\):?.*{/,
    );
    const regularFunctionAssignedToVariableRegex = new RegExp(
      /(const|let|var)(\s*)[a-zA-Z0-9]*\s*=(\s*)\(.*\)(\s*){/,
    );
    const arrowFunctionAssignedToVariableRegex = new RegExp(
      /(const|let|var)\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*\([^)]*\s*(?::\s*[a-zA-Z_$][a-zA-Z0-9_$<>,\s]*)?\)\s*(?::\s*[a-zA-Z_$][a-zA-Z0-9_$<>,\s]*)?\s*=>\s*{/,
    );
    return (
      regularNamedFunctionRegex.test(locWithoutFunctionKeyword) ||
      regularFunctionAssignedToVariableRegex.test(locWithoutFunctionKeyword) ||
      arrowFunctionAssignedToVariableRegex.test(loc)
    );
  }
  isFunctionAssignedToVariable(loc: string): boolean {
    return /(const|let|var)?.*\s*=.*\(.*/.test(loc);
  }
  isFunctionDeclaration(loc: string): boolean {
    const locWithoutWhiteSpaces = loc.replace(/\s/g, '');
    const isDecorator = /@/.test(loc.split('(')[0]);
    return (
      (/.*\(.*/.test(locWithoutWhiteSpaces) ||
        /=>/.test(locWithoutWhiteSpaces)) &&
      !isDecorator
    );
  }
  isObjectFunctionCall(loc: string): boolean {
    const locWithoutWhiteSpaces = loc.replace(/\s/g, '');
    return /([a-zA-Z0-9]+\.[a-zA-Z0-9]+)\({1,}/.test(locWithoutWhiteSpaces);
  }
  isFunctionAssignedToObjectProperty(loc: string): boolean {
    return /^\s*[a-zA-Z_$][\w$]*\s*:\s*function\s*\(/.test(loc);
  }
  isFunctionCall(loc: string): boolean {
    const locWithoutWhiteSpaces = loc.replace(/\s/g, '');

    // Ensure the assignment is followed by an actual function call
    return /(?:const|let|var)?\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*(?!function\b)[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/.test(
      locWithoutWhiteSpaces,
    );
  }
  isTypedFunctionCallAssignment(loc: string): boolean {
    const locWithoutWhiteSpaces = loc.replace(/\s/g, '');

    // Match assignments where the right-hand side is a function call with generics
    return /(?:const|let|var)?\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*<[^<>]*$/.test(
      locWithoutWhiteSpaces,
    );
  }

  isTernaryExpressionAssignment(loc: string): boolean {
    return /^\s*(export\s+)?(const|let|var)\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*(\/\/.*\s*)*[^?:]+\s*\?.+:.+;$/.test(
      loc,
    );
  }
  isNullishCoalescingAssignment(loc: string): boolean {
    return /[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*.+\?\?+.+/.test(loc);
  }
  getFunctionName(loc: string): string {
    if (this.doesContainsNamedFunctionDeclaration(loc)) {
      if (/(const|let|var)(\s*)[a-zA-Z0-9]*\s*=/.test(loc)) {
        return loc
          .split('=')[0]
          .replace(/export |module.exports |const |var |let |=|(\s*)/g, '');
      } else if (/function(\s+)/.test(loc)) {
        return loc.split('function ')[1].split('(')[0].replace(/(\s*)/g, '');
      } else {
        return loc
          .split(/\(.*\)/)[0]
          .replace(
            /async |static |public |private |protected |export |default |(\s*)/g,
            '',
          );
      }
    } else {
      return '';
    }
  }
}
