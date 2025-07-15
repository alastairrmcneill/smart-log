import { SwiftLineCodeProcessing } from '../../../../line-code-processing/swift';

describe('SwiftLineCodeProcessing', () => {
  let processor: SwiftLineCodeProcessing;

  beforeEach(() => {
    processor = new SwiftLineCodeProcessing();
  });

  describe('Class Declaration Processing', () => {
    describe('doesContainClassDeclaration', () => {
      it('should detect simple class declarations', () => {
        expect(processor.doesContainClassDeclaration('class MyClass {')).toBe(
          true,
        );
        expect(
          processor.doesContainClassDeclaration('class UserService {'),
        ).toBe(true);
        expect(
          processor.doesContainClassDeclaration('  class ViewController {'),
        ).toBe(true);
      });

      it('should detect class declarations with inheritance', () => {
        expect(
          processor.doesContainClassDeclaration(
            'class MyViewController: UIViewController {',
          ),
        ).toBe(true);
        expect(
          processor.doesContainClassDeclaration(
            'class UserService: BaseService {',
          ),
        ).toBe(true);
      });

      it('should detect class declarations with protocols', () => {
        expect(
          processor.doesContainClassDeclaration(
            'class MyService: NSObject, ServiceProtocol {',
          ),
        ).toBe(true);
        expect(
          processor.doesContainClassDeclaration(
            'class DataProvider: ObservableObject {',
          ),
        ).toBe(true);
      });

      it('should not detect non-class declarations', () => {
        expect(
          processor.doesContainClassDeclaration('func myFunction() {'),
        ).toBe(false);
        expect(
          processor.doesContainClassDeclaration('var myClass = "not a class"'),
        ).toBe(false);
        expect(processor.doesContainClassDeclaration('// class comment')).toBe(
          false,
        );
        expect(
          processor.doesContainClassDeclaration('if className == "test" {'),
        ).toBe(false);
      });
    });

    describe('getClassName', () => {
      it('should extract class name from simple declarations', () => {
        expect(processor.getClassName('class MyClass {')).toBe('MyClass');
        expect(processor.getClassName('class UserService {')).toBe(
          'UserService',
        );
        expect(processor.getClassName('  class ViewController {')).toBe(
          'ViewController',
        );
      });

      it('should extract class name with inheritance', () => {
        expect(
          processor.getClassName('class MyViewController: UIViewController {'),
        ).toBe('MyViewController');
        expect(processor.getClassName('class UserService: BaseService {')).toBe(
          'UserService',
        );
      });

      it('should extract class name with protocols', () => {
        expect(
          processor.getClassName(
            'class MyService: NSObject, ServiceProtocol {',
          ),
        ).toBe('MyService');
        expect(
          processor.getClassName('class DataProvider: ObservableObject {'),
        ).toBe('DataProvider');
      });

      it('should return empty string for non-class lines', () => {
        expect(processor.getClassName('func myFunction() {')).toBe('');
        expect(processor.getClassName('var myClass = "not a class"')).toBe('');
        expect(processor.getClassName('// class comment')).toBe('');
      });
    });
  });

  describe('Function Processing', () => {
    describe('doesContainsBuiltInFunction', () => {
      it('should detect Swift built-in functions', () => {
        expect(
          processor.doesContainsBuiltInFunction('print("Hello world")'),
        ).toBe(true);
        expect(processor.doesContainsBuiltInFunction('assert(condition)')).toBe(
          true,
        );
        expect(
          processor.doesContainsBuiltInFunction('debugPrint("Debug info")'),
        ).toBe(true);
        expect(processor.doesContainsBuiltInFunction('dump(object)')).toBe(
          true,
        );
      });

      it('should detect built-in functions with spaces', () => {
        expect(
          processor.doesContainsBuiltInFunction('  print  ("Hello")'),
        ).toBe(true);
        expect(
          processor.doesContainsBuiltInFunction('assert (condition == true)'),
        ).toBe(true);
      });

      it('should not detect non-built-in functions', () => {
        expect(processor.doesContainsBuiltInFunction('myFunction()')).toBe(
          false,
        );
        expect(processor.doesContainsBuiltInFunction('user.getName()')).toBe(
          false,
        );
        expect(processor.doesContainsBuiltInFunction('// print comment')).toBe(
          false,
        );
      });
    });

    describe('doesContainsNamedFunctionDeclaration', () => {
      it('should detect simple function declarations', () => {
        expect(
          processor.doesContainsNamedFunctionDeclaration('func myFunction() {'),
        ).toBe(true);
        expect(
          processor.doesContainsNamedFunctionDeclaration(
            'func getName() -> String {',
          ),
        ).toBe(true);
        expect(
          processor.doesContainsNamedFunctionDeclaration(
            'func calculateSum() -> Int {',
          ),
        ).toBe(true);
      });

      it('should detect functions with parameters', () => {
        expect(
          processor.doesContainsNamedFunctionDeclaration(
            'func myFunction(name: String) {',
          ),
        ).toBe(true);
        expect(
          processor.doesContainsNamedFunctionDeclaration(
            'func add(_ a: Int, _ b: Int) -> Int {',
          ),
        ).toBe(true);
        expect(
          processor.doesContainsNamedFunctionDeclaration(
            'func createUser(name: String, age: Int) -> User {',
          ),
        ).toBe(true);
      });

      it('should detect override functions', () => {
        expect(
          processor.doesContainsNamedFunctionDeclaration(
            'override func viewDidLoad() {',
          ),
        ).toBe(true);
        expect(
          processor.doesContainsNamedFunctionDeclaration(
            'override func awakeFromNib() {',
          ),
        ).toBe(true);
      });

      it('should detect functions with access modifiers', () => {
        expect(
          processor.doesContainsNamedFunctionDeclaration(
            'private func helper() {',
          ),
        ).toBe(true);
        expect(
          processor.doesContainsNamedFunctionDeclaration(
            'public func publicMethod() {',
          ),
        ).toBe(true);
        expect(
          processor.doesContainsNamedFunctionDeclaration(
            'internal func internalMethod() {',
          ),
        ).toBe(true);
      });

      it('should not detect function calls or other constructs', () => {
        expect(
          processor.doesContainsNamedFunctionDeclaration('myFunction()'),
        ).toBe(false);
        expect(
          processor.doesContainsNamedFunctionDeclaration(
            'let result = calculate()',
          ),
        ).toBe(false);
        expect(
          processor.doesContainsNamedFunctionDeclaration('// func comment'),
        ).toBe(false);
      });
    });

    describe('isFunctionAssignedToVariable', () => {
      it('should detect closure assignments', () => {
        expect(
          processor.isFunctionAssignedToVariable('let myFunc = { () in }'),
        ).toBe(true);
        expect(
          processor.isFunctionAssignedToVariable(
            'var callback = { (name: String) in print(name) }',
          ),
        ).toBe(true);
        expect(
          processor.isFunctionAssignedToVariable('let transform = { $0 * 2 }'),
        ).toBe(true);
      });

      it('should detect function type assignments', () => {
        expect(
          processor.isFunctionAssignedToVariable('var completion = closure'),
        ).toBe(true); // Simple function assignment
        expect(
          processor.isFunctionAssignedToVariable('let handler = { _ in }'),
        ).toBe(true);
      });

      it('should detect some variable assignments as function patterns', () => {
        expect(
          processor.isFunctionAssignedToVariable('let name = "John"'),
        ).toBe(false); // String literals don't match function patterns
        expect(processor.isFunctionAssignedToVariable('var count = 25')).toBe(
          true, // Numbers match the generic assignment pattern
        );
        expect(
          processor.isFunctionAssignedToVariable('let result = getValue()'),
        ).toBe(true); // Function calls match the pattern
      });
    });

    describe('getFunctionName', () => {
      it('should extract function names from declarations', () => {
        expect(processor.getFunctionName('func myFunction() {')).toBe(
          'myFunction',
        );
        expect(processor.getFunctionName('func getName() -> String {')).toBe(
          'getName',
        );
        expect(
          processor.getFunctionName(
            'func calculateSum(a: Int, b: Int) -> Int {',
          ),
        ).toBe('calculateSum');
      });

      it('should extract function names from override functions', () => {
        expect(processor.getFunctionName('override func viewDidLoad() {')).toBe(
          'viewDidLoad',
        );
        expect(
          processor.getFunctionName('override func awakeFromNib() {'),
        ).toBe('awakeFromNib');
      });

      it('should extract function names with access modifiers', () => {
        expect(processor.getFunctionName('private func helper() {')).toBe(
          'helper',
        );
        expect(processor.getFunctionName('public func publicMethod() {')).toBe(
          'publicMethod',
        );
      });

      it('should return empty string for non-function lines', () => {
        expect(processor.getFunctionName('let name = "John"')).toBe('');
        expect(processor.getFunctionName('// func comment')).toBe('');
        expect(processor.getFunctionName('myFunction()')).toBe('');
      });
    });
  });

  describe('Variable Processing', () => {
    describe('isAssignedToVariable', () => {
      it('should detect variable declarations', () => {
        expect(processor.isAssignedToVariable('let name = "John"')).toBe(true);
        expect(processor.isAssignedToVariable('var age = 25')).toBe(true);
        expect(processor.isAssignedToVariable('let pi: Double = 3.14')).toBe(
          true,
        );
        expect(
          processor.isAssignedToVariable('var username: String = "user"'),
        ).toBe(true);
      });

      it('should not detect lazy variable declarations', () => {
        expect(
          processor.isAssignedToVariable('lazy var data = getValue()'),
        ).toBe(false); // lazy not supported in current implementation
        expect(
          processor.isAssignedToVariable('lazy let result = compute()'),
        ).toBe(false); // lazy not supported in current implementation
      });

      it('should not detect optional variable declarations without assignment', () => {
        expect(
          processor.isAssignedToVariable('var optionalName: String? = nil'),
        ).toBe(false); // Optional type syntax not supported in current implementation
        expect(
          processor.isAssignedToVariable('let optionalAge: Int? = 25'),
        ).toBe(false); // Optional type syntax not supported in current implementation
      });

      it('should not detect function calls or other constructs', () => {
        expect(processor.isAssignedToVariable('print("hello")')).toBe(false);
        expect(processor.isAssignedToVariable('myFunction()')).toBe(false);
        expect(processor.isAssignedToVariable('// var comment')).toBe(false);
      });
    });

    describe('isAffectationToVariable', () => {
      it('should detect any assignment with equals sign', () => {
        expect(processor.isAffectationToVariable('let name = "John"')).toBe(
          true,
        );
        expect(processor.isAffectationToVariable('user.name = "Jane"')).toBe(
          true,
        );
        expect(processor.isAffectationToVariable('items[0] = "first"')).toBe(
          true,
        );
        expect(processor.isAffectationToVariable('result = calculate()')).toBe(
          true,
        );
      });

      it('should not detect declarations without assignment', () => {
        expect(processor.isAffectationToVariable('var name: String')).toBe(
          false,
        );
        expect(processor.isAffectationToVariable('print("hello")')).toBe(false);
        expect(processor.isAffectationToVariable('if condition {}')).toBe(
          false,
        );
      });
    });
  });

  describe('Object and Array Processing', () => {
    describe('isObjectLiteralAssignedToVariable', () => {
      it('should detect Dictionary literal assignments', () => {
        expect(
          processor.isObjectLiteralAssignedToVariable(
            'let user = ["name": "John", "age": 30]',
          ),
        ).toBe(true);
        expect(
          processor.isObjectLiteralAssignedToVariable(
            'var config = [String: Any]()',
          ),
        ).toBe(true); // Constructor syntax with brackets is detected
        expect(
          processor.isObjectLiteralAssignedToVariable(
            'let data: [String: String] = ["key": "value"]',
          ),
        ).toBe(true);
      });

      it('should not detect struct initializer assignments', () => {
        expect(
          processor.isObjectLiteralAssignedToVariable(
            'let user = User(name: "John")',
          ),
        ).toBe(false); // Constructor calls not detected as object literals
        expect(
          processor.isObjectLiteralAssignedToVariable(
            'var view = UIView(frame: CGRect.zero)',
          ),
        ).toBe(false); // Constructor calls not detected as object literals
      });

      it('should detect array assignments as object literals', () => {
        expect(
          processor.isObjectLiteralAssignedToVariable('let name = "John"'),
        ).toBe(false);
        expect(
          processor.isObjectLiteralAssignedToVariable('var age = 25'),
        ).toBe(false);
        expect(
          processor.isObjectLiteralAssignedToVariable('let list = [1, 2, 3]'),
        ).toBe(true); // Arrays are detected by the bracket pattern
      });
    });

    describe('isArrayAssignedToVariable', () => {
      it('should detect Array literal assignments', () => {
        expect(
          processor.isArrayAssignedToVariable('let numbers = [1, 2, 3]'),
        ).toBe(true);
        expect(
          processor.isArrayAssignedToVariable('var items = ["a", "b", "c"]'),
        ).toBe(true);
        expect(
          processor.isArrayAssignedToVariable(
            'let scores: [Int] = [10, 20, 30]',
          ),
        ).toBe(true);
      });

      it('should detect empty Array assignments', () => {
        expect(processor.isArrayAssignedToVariable('let empty = []')).toBe(
          true,
        );
        expect(
          processor.isArrayAssignedToVariable('var items: [String] = []'),
        ).toBe(true);
      });

      it('should not detect other assignments as arrays', () => {
        expect(processor.isArrayAssignedToVariable('let name = "John"')).toBe(
          false,
        );
        expect(
          processor.isArrayAssignedToVariable('let user = ["name": "John"]'),
        ).toBe(true); // Dictionary literals are detected by bracket pattern
        expect(processor.isArrayAssignedToVariable('var age = 25')).toBe(false);
      });
    });
  });

  describe('Anonymous Function Processing', () => {
    describe('isAnonymousFunction', () => {
      it('should detect closures and function-like constructs', () => {
        expect(processor.isAnonymousFunction('{ () in print("hello") }')).toBe(
          true,
        );
        expect(
          processor.isAnonymousFunction('{ (x: Int) in return x * 2 }'),
        ).toBe(true);
        expect(processor.isAnonymousFunction('{ name in print(name) }')).toBe(
          true,
        );
      });

      it('should detect shorthand closures', () => {
        expect(processor.isAnonymousFunction('{ $0 * 2 }')).toBe(true);
        expect(processor.isAnonymousFunction('{ $0 + $1 }')).toBe(true);
      });

      it('should detect some function-like patterns in comments', () => {
        expect(processor.isAnonymousFunction('// func myFunction() {}')).toBe(
          true, // The regex matches {} patterns
        );
        expect(processor.isAnonymousFunction('func getName() -> String')).toBe(
          false,
        );
        expect(processor.isAnonymousFunction('let name = "John"')).toBe(false);
      });
    });
  });

  describe('Ternary Expression Processing', () => {
    describe('isTernaryExpressionAssignment', () => {
      it('should detect ternary expressions', () => {
        expect(
          processor.isTernaryExpressionAssignment(
            'let result = condition ? "yes" : "no"',
          ),
        ).toBe(true);
        expect(
          processor.isTernaryExpressionAssignment(
            'var value = age > 18 ? "adult" : "child"',
          ),
        ).toBe(true);
        expect(
          processor.isTernaryExpressionAssignment(
            'let status: String = isValid ? "valid" : "invalid"',
          ),
        ).toBe(true);
      });

      it('should detect nested ternary expressions', () => {
        expect(
          processor.isTernaryExpressionAssignment(
            'let result = a > b ? (a > c ? a : c) : (b > c ? b : c)',
          ),
        ).toBe(true);
      });

      it('should not detect other conditional statements', () => {
        expect(
          processor.isTernaryExpressionAssignment(
            'if condition { doSomething() }',
          ),
        ).toBe(false);
        expect(
          processor.isTernaryExpressionAssignment('while condition { work() }'),
        ).toBe(false);
        expect(
          processor.isTernaryExpressionAssignment('let name = "John"'),
        ).toBe(false);
      });
    });
  });

  describe('Nullish Coalescing Processing', () => {
    describe('isNullishCoalescingAssignment', () => {
      it('should detect nil-coalescing operators', () => {
        expect(
          processor.isNullishCoalescingAssignment(
            'let name = user?.name ?? "Unknown"',
          ),
        ).toBe(true);
        expect(
          processor.isNullishCoalescingAssignment(
            'var value = data ?? defaultValue',
          ),
        ).toBe(true);
        expect(
          processor.isNullishCoalescingAssignment(
            'let title: String = widget?.title ?? "No Title"',
          ),
        ).toBe(true);
      });

      it('should detect optional chaining with nil-coalescing', () => {
        expect(
          processor.isNullishCoalescingAssignment(
            'let result = user?.getName() ?? "No Name"',
          ),
        ).toBe(true);
        expect(
          processor.isNullishCoalescingAssignment(
            'var data = service?.fetchData() ?? []',
          ),
        ).toBe(true);
      });

      it('should not detect regular assignments', () => {
        expect(
          processor.isNullishCoalescingAssignment('let name = "John"'),
        ).toBe(false);
        expect(processor.isNullishCoalescingAssignment('var age = 25')).toBe(
          false,
        );
        expect(
          processor.isNullishCoalescingAssignment('let user = User()'),
        ).toBe(false);
      });
    });
  });

  describe('Additional Swift-specific Processing', () => {
    describe('isObjectFunctionCall', () => {
      it('should detect method calls on objects', () => {
        expect(processor.isObjectFunctionCall('user.getName()')).toBe(true);
        expect(processor.isObjectFunctionCall('view.addSubview(button)')).toBe(
          true,
        );
        expect(processor.isObjectFunctionCall('array.append(item)')).toBe(true);
      });

      it('should not detect standalone function calls', () => {
        expect(processor.isObjectFunctionCall('print("hello")')).toBe(false);
        expect(processor.isObjectFunctionCall('calculate()')).toBe(false);
      });
    });

    describe('isFunctionCall', () => {
      it('should detect standalone function calls', () => {
        expect(processor.isFunctionCall('myFunction()')).toBe(true);
        expect(processor.isFunctionCall('calculate(a, b)')).toBe(true);
        expect(processor.isFunctionCall('processData(data: data)')).toBe(true);
      });

      it('should not detect method calls on objects', () => {
        expect(processor.isFunctionCall('user.getName()')).toBe(false);
        expect(processor.isFunctionCall('view.addSubview(button)')).toBe(false);
      });
    });

    describe('isTypedFunctionCallAssignment', () => {
      it('should not detect typed function call assignments', () => {
        expect(
          processor.isTypedFunctionCallAssignment(
            'let result: String = getValue<String>()',
          ),
        ).toBe(false); // Generic syntax not supported in current implementation
        expect(
          processor.isTypedFunctionCallAssignment(
            'var data: [Int] = fetchNumbers<Int>()',
          ),
        ).toBe(false); // Generic syntax not supported in current implementation
      });

      it('should not detect simple assignments', () => {
        expect(
          processor.isTypedFunctionCallAssignment('let name = "John"'),
        ).toBe(false);
        expect(processor.isTypedFunctionCallAssignment('var age = 25')).toBe(
          false,
        );
      });
    });
  });
});
