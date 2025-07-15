import { LineCodeProcessing } from '..';

export class DartLineCodeProcessing implements LineCodeProcessing {
  // LineCodeClassProcessing methods
  doesContainClassDeclaration(loc: string): boolean {
    return /class\s+\w+.*\{/.test(loc);
  }

  getClassName(loc: string): string {
    if (this.doesContainClassDeclaration(loc)) {
      const match = loc.match(/class\s+(\w+)/);
      return match ? match[1] : '';
    }
    return '';
  }

  // LineCodeFunctionProcessing methods
  doesContainsBuiltInFunction(loc: string): boolean {
    // Dart built-in functions: print, assert, etc.
    return /\b(print|assert|identical|runtimeType)\s*\(/.test(loc);
  }

  doesContainsNamedFunctionDeclaration(loc: string): boolean {
    // Dart function declarations: ReturnType functionName(), void functionName(), functionName()
    return /(?:^|\s)(?:\w+\s+)?(\w+)\s*\([^)]*\)\s*(?:\{|=>|async\s*\{|async\s*=>)/.test(
      loc,
    );
  }

  isFunctionAssignedToVariable(loc: string): boolean {
    // Dart function assignments: var x = functionName, Function x = () => {}
    return /(?:var|final|const|Function|\w+\s*Function)\s+\w+\s*=\s*(?:\w+|\([^)]*\)\s*=>|\([^)]*\)\s*\{)/.test(
      loc,
    );
  }

  isFunctionAssignedToObjectProperty(loc: string): boolean {
    // Dart method assignments: object.method = () => {}
    return /\w+\.\w+\s*=\s*\([^)]*\)\s*(?:=>|\{)/.test(loc);
  }

  isFunctionDeclaration(loc: string): boolean {
    return this.doesContainsNamedFunctionDeclaration(loc);
  }

  isObjectFunctionCall(loc: string): boolean {
    // Dart method calls: object.method(), widget.build()
    return /\w+\.\w+\s*\([^)]*\)/.test(loc);
  }

  isFunctionCall(loc: string): boolean {
    // Dart function calls: functionName()
    return /\w+\s*\([^)]*\)/.test(loc) && !this.isObjectFunctionCall(loc);
  }

  isTypedFunctionCallAssignment(loc: string): boolean {
    // Dart typed function calls: String result = someFunction<String>()
    return /(?:var|final|const|\w+(?:<[\w\s,<>]+>)?)\s+\w+\s*=\s*\w+(?:<[\w\s,<>]+>)?\s*\([^)]*\)/.test(
      loc,
    );
  }

  getFunctionName(loc: string): string {
    if (this.doesContainsNamedFunctionDeclaration(loc)) {
      const match = loc.match(
        /(?:^|\s)(?:\w+\s+)?(\w+)\s*\([^)]*\)\s*(?:\{|=>|async\s*\{|async\s*=>)/,
      );
      return match ? match[1] : '';
    }
    return '';
  }

  isAnonymousFunction(loc: string): boolean {
    // Dart anonymous functions: () => expression or () { }
    return /\([^)]*\)\s*(?:=>|\{)/.test(loc);
  }

  isArgumentOfAnonymousFunction(loc: string, argument: string): boolean {
    if (this.isAnonymousFunction(loc)) {
      const match = loc.match(/(\([^)]*\))\s*(?:=>|\{)/);
      return match !== null && match[1].includes(argument);
    }
    return false;
  }

  shouldTransformAnonymousFunction(loc: string): boolean {
    if (this.isAnonymousFunction(loc)) {
      if (/\([^)]*\)\s*=>.*\{/.test(loc)) {
        return false;
      }
      return true;
    }
    return false;
  }

  // LineCodeProcessing methods
  isAssignedToVariable(loc: string): boolean {
    // Dart variable assignments: var x =, final x =, String x =, dynamic x =, etc.
    return /^(?:var|final|const|late\s+var|late\s+final|late\s+const|\w+\??)\s+(\w+)\s*=/.test(
      loc.trim(),
    );
  }

  isAffectationToVariable(loc: string): boolean {
    return /.*=.*/.test(loc);
  }

  isObjectLiteralAssignedToVariable(loc: string): boolean {
    const locWithoutExtraSpaces = loc.replace(/\s+/g, ' ').trim();
    // Dart object/map literals: var x = {}, Map<String, dynamic> x = {}
    return /^\s*(?:var|final|const|late\s+(?:var|final|const)|\w+(?:<[\w\s,<>]+>)?)\s+\w+\s*=\s*\{/.test(
      locWithoutExtraSpaces,
    );
  }

  isArrayAssignedToVariable(loc: string): boolean {
    const locWithoutWhiteSpaces = loc.replace(/\s/g, '');
    // Dart list literals: var x = [], List<String> x = []
    return /^(?:var|final|const|late(?:var|final|const)|\w+(?:<[\w\s,<>]+>)?)\s*\w+\s*=\s*\[/.test(
      locWithoutWhiteSpaces,
    );
  }

  isTernaryExpressionAssignment(loc: string): boolean {
    // Dart ternary operator: var x = condition ? value1 : value2
    return /(?:var|final|const|\w+)\s+\w+\s*=.*\?\s*.+\s*:/.test(loc);
  }

  isNullishCoalescingAssignment(loc: string): boolean {
    // Dart null-aware operators: var x = value ?? defaultValue
    return /(?:var|final|const|\w+)\s+\w+\s*=.*\?\?/.test(loc);
  }
}
