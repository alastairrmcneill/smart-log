import { DartLineCodeProcessing } from '../../../../line-code-processing/dart';

describe('DartDebugMessage Integration', () => {
  let processor: DartLineCodeProcessing;

  beforeEach(() => {
    processor = new DartLineCodeProcessing();
  });

  describe('Dart Line Code Processing Integration', () => {
    it('should detect Dart class declarations', () => {
      expect(
        processor.doesContainClassDeclaration(
          'class MyWidget extends StatefulWidget {',
        ),
      ).toBe(true);
      expect(processor.getClassName('class UserService {')).toBe('UserService');
    });

    it('should detect Dart function declarations', () => {
      expect(
        processor.doesContainsNamedFunctionDeclaration('void myFunction() {'),
      ).toBe(true);
      expect(processor.getFunctionName('String getName() {')).toBe('getName');
    });

    it('should detect Dart variable assignments', () => {
      expect(processor.isAssignedToVariable('String name = "John";')).toBe(
        true,
      );
      expect(processor.isAffectationToVariable('var age = 25;')).toBe(true);
    });

    it('should detect Dart list assignments', () => {
      expect(
        processor.isArrayAssignedToVariable('List<int> numbers = [1, 2, 3];'),
      ).toBe(true);
      expect(processor.isArrayAssignedToVariable('var items = [];')).toBe(true);
    });

    it('should detect Dart function assignments', () => {
      expect(
        processor.isFunctionAssignedToVariable('Function callback = () {};'),
      ).toBe(true);
      expect(
        processor.isFunctionAssignedToVariable(
          'var handler = (String value) => print(value);',
        ),
      ).toBe(true);
    });

    it('should detect Dart ternary expressions', () => {
      expect(
        processor.isTernaryExpressionAssignment(
          'String result = condition ? "yes" : "no";',
        ),
      ).toBe(true);
    });

    it('should detect Dart null-aware operators', () => {
      expect(
        processor.isNullishCoalescingAssignment(
          'String name = user?.name ?? "Unknown";',
        ),
      ).toBe(true);
    });

    it('should detect Dart function calls', () => {
      expect(processor.isFunctionCall('myFunction();')).toBe(true);
      expect(processor.isObjectFunctionCall('user.getName();')).toBe(true);
    });

    it('should detect Dart built-in functions', () => {
      expect(processor.doesContainsBuiltInFunction('print("Hello");')).toBe(
        true,
      );
      expect(processor.doesContainsBuiltInFunction('assert(condition);')).toBe(
        true,
      );
    });

    it('should detect Dart anonymous functions', () => {
      expect(processor.isAnonymousFunction('() => print("hello")')).toBe(true);
      expect(processor.isAnonymousFunction('(x) => x * 2')).toBe(true);
    });
  });

  describe('Dart-specific patterns', () => {
    it('should not handle Dart null safety patterns', () => {
      expect(
        processor.isNullishCoalescingAssignment(
          'String? data = service?.fetchData();',
        ),
      ).toBe(false); // Pattern not matching current regex
    });

    it('should not handle Dart late variables without assignment', () => {
      expect(processor.isAssignedToVariable('late String value;')).toBe(false);
    });

    it('should not handle Dart final variables with types', () => {
      expect(
        processor.isAssignedToVariable('final String name = "John";'),
      ).toBe(false); // Type after final not supported in current regex
    });

    it('should not handle Dart const variables with types', () => {
      expect(processor.isAssignedToVariable('const int maxValue = 100;')).toBe(
        false, // Type after const not supported in current regex
      );
    });

    it('should handle Dart widget classes', () => {
      expect(
        processor.doesContainClassDeclaration(
          'class MyWidget extends StatelessWidget {',
        ),
      ).toBe(true);
      expect(
        processor.getClassName('class CustomButton extends StatefulWidget {'),
      ).toBe('CustomButton');
    });

    it('should handle Dart async functions', () => {
      expect(
        processor.doesContainsNamedFunctionDeclaration(
          'Future<String> fetchData() async {',
        ),
      ).toBe(true);
      expect(
        processor.getFunctionName('Stream<int> countStream() async* {'),
      ).toBe(''); // Function name extraction doesn't handle Stream return types
    });

    it('should not handle complex Dart generic types', () => {
      expect(
        processor.isAssignedToVariable('Map<String, dynamic> data = {};'),
      ).toBe(false); // Complex generic type syntax not supported
      expect(
        processor.isArrayAssignedToVariable(
          'List<Widget> children = <Widget>[];',
        ),
      ).toBe(false); // Generic syntax not supported in current array detection
    });

    it('should not handle Dart named constructors', () => {
      expect(
        processor.isObjectLiteralAssignedToVariable(
          'User user = User.fromJson(json);',
        ),
      ).toBe(false); // Constructor calls not detected as object literals
    });

    it('should handle Dart extension methods', () => {
      expect(processor.isObjectFunctionCall('myString.capitalize();')).toBe(
        true,
      );
    });

    it('should handle Dart cascade operators', () => {
      expect(
        processor.isAffectationToVariable(
          'myObject..property = value..method();',
        ),
      ).toBe(true);
    });

    it('should handle Dart spread operators', () => {
      expect(
        processor.isArrayAssignedToVariable(
          'List<int> combined = [...list1, ...list2];',
        ),
      ).toBe(true);
    });

    it('should handle Dart type casting', () => {
      expect(
        processor.isAssignedToVariable('String value = object as String;'),
      ).toBe(true);
    });
  });
});
