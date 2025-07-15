import { LineCodeProcessing } from '..';

export class SwiftLineCodeProcessing implements LineCodeProcessing {
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
    // Swift built-in functions: print, assert, etc.
    return /\b(print|assert|debugPrint|dump)\s*\(/.test(loc);
  }

  doesContainsNamedFunctionDeclaration(loc: string): boolean {
    // Swift function declarations: func functionName(), override func functionName()
    return /(?:^|\s)(?:override\s+)?func\s+(\w+)\s*\([^)]*\)\s*(?:\{|->)/.test(
      loc,
    );
  }

  isFunctionAssignedToVariable(loc: string): boolean {
    // Swift function assignments: var x = functionName, let x = { }
    return /(?:var|let)\s+\w+\s*[:=]\s*(?:\w+|\{[^}]*\}|\([^)]*\)\s*->\s*\w+\s*in)/.test(
      loc,
    );
  }

  isFunctionAssignedToObjectProperty(loc: string): boolean {
    // Swift method assignments: object.method = { }
    return /\w+\.\w+\s*=\s*\{[^}]*\}/.test(loc);
  }

  isFunctionDeclaration(loc: string): boolean {
    return this.doesContainsNamedFunctionDeclaration(loc);
  }

  isObjectFunctionCall(loc: string): boolean {
    // Swift method calls: object.method(), view.addSubview()
    return /\w+\.\w+\s*\([^)]*\)/.test(loc);
  }

  isFunctionCall(loc: string): boolean {
    // Swift function calls: functionName()
    return /\w+\s*\([^)]*\)/.test(loc) && !this.isObjectFunctionCall(loc);
  }

  isTypedFunctionCallAssignment(loc: string): boolean {
    // Swift typed function calls: let result: String = someFunction()
    return /(?:var|let)\s+\w+\s*:\s*\w+\s*=\s*\w+\s*\([^)]*\)/.test(loc);
  }

  getFunctionName(loc: string): string {
    if (this.doesContainsNamedFunctionDeclaration(loc)) {
      const match = loc.match(/(?:override\s+)?func\s+(\w+)\s*\([^)]*\)/);
      return match ? match[1] : '';
    }
    return '';
  }

  isAnonymousFunction(loc: string): boolean {
    // Swift closures: { }, { in }, { (params) in }
    return /\{[^}]*\}|\{[^}]*in[^}]*\}/.test(loc);
  }

  isArgumentOfAnonymousFunction(loc: string, argument: string): boolean {
    if (this.isAnonymousFunction(loc)) {
      const match = loc.match(/\{[^}]*in/);
      return match !== null && match[0].includes(argument);
    }
    return false;
  }

  shouldTransformAnonymousFunction(loc: string): boolean {
    if (this.isAnonymousFunction(loc)) {
      if (/\{[^}]*\}/.test(loc) && loc.includes('in')) {
        return false;
      }
      return true;
    }
    return false;
  }

  // LineCodeProcessing methods
  isAssignedToVariable(loc: string): boolean {
    // Swift variable assignments: var x =, let x =, var x: Type =
    return /^(?:var|let)\s+(\w+)(?:\s*:\s*\w+)?\s*=/.test(loc.trim());
  }

  isAffectationToVariable(loc: string): boolean {
    return /.*=.*/.test(loc);
  }

  isObjectLiteralAssignedToVariable(loc: string): boolean {
    const locWithoutExtraSpaces = loc.replace(/\s+/g, ' ').trim();
    // Swift dictionary literals: var x = [:], let dict: [String: Any] = [:]
    return /^\s*(?:var|let)\s+\w+(?:\s*:\s*[\w[\]:, <>]+)?\s*=\s*\[/.test(
      locWithoutExtraSpaces,
    );
  }

  isArrayAssignedToVariable(loc: string): boolean {
    const locWithoutWhiteSpaces = loc.replace(/\s/g, '');
    // Swift array literals: var x = [], let array: [String] = []
    return /^(?:var|let)\s*\w+(?::\s*\[\w+\])?\s*=\s*\[/.test(
      locWithoutWhiteSpaces,
    );
  }

  isTernaryExpressionAssignment(loc: string): boolean {
    // Swift ternary operator: let x = condition ? value1 : value2
    return /(?:var|let)\s+\w+(?:\s*:\s*\w+)?\s*=.*\?\s*.+\s*:/.test(loc);
  }

  isNullishCoalescingAssignment(loc: string): boolean {
    // Swift nil-coalescing operator: let x = value ?? defaultValue
    return /(?:var|let)\s+\w+(?:\s*:\s*\w+)?\s*=.*\?\?/.test(loc);
  }
}
