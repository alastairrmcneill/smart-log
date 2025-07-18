import helpers from '../../helpers';

describe('Assignment of object literal to a variable', () => {
  it('Should return true for object literal assignment LOCs', () => {
    const objLiteralAssignmentLOCs = [
      `var myObject = {
                        sProp: 'some string value',
                        numProp: 2,
                        bProp: false
                    };`,
      `var myObject = { sProp: 'some string value', numProp: 2, bProp: false};`,
      `var Swapper = {
                        images: ["smile.gif", "grim.gif", "frown.gif", "bomb.gif"],
                        pos: { // nested object literal
                            x: 40,
                            y: 300
                        },
                        onSwap: function() { // function
                            // code here
                        }
                    };`,
      `var car = {type:"Fiat", model:"500", color:"white"};`,
      `let person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};`,
      `const person = {
                        firstName: "John",
                        lastName: "Doe",
                        age: 50,
                        eyeColor: "blue"
                      };`,
      `const variable: FilterObject<UrlRuleEntity> = {
                a: SomeOperator.someFunc(NOW, { orNull: true }),
                ...(undefined !== b && { b }),
                ...(undefined !== c && { c }),
                ...(undefined !== d && { d }),
                ...(Boolean(started) && {
                  x: SomeOperator.y(p),
                }),
              };`,
      'export const platform={clear(){',
      'let obj = {x, y, z};',
      "const FLAG_CONFIG = {'OSSNextMajor':getNextMajorFlagValue,",
      '  config.resolve = {...config.resolve,',
      `const renameFiles: Record<string, string | undefined> = {
          _gitignore: '.gitignore',
      }`,
      `const settings: MyConfig | null = {
        darkMode: true,
      };`,
      `const map: Record<string, () => number> = {
        counter: () => 1,
      };`,
      `const shape: Shape & { id?: string } = {
        width: 20,
        id: '123',
      };`,
      `const status: 'pending' | 'success' | 'error' = {
        state: 'pending',
      };`,
      `const box: T extends string ? StringBox : NumberBox = {
        value: 'data',
      };`,
      `const value:
        | FooType
        | BarType = {
        hello: true,
      };`,
    ];
    objLiteralAssignmentLOCs.forEach((objLiteralAssignmentLOC) => {
      expect(
        helpers.jsLineCodeProcessing.isObjectLiteralAssignedToVariable(
          objLiteralAssignmentLOC,
        ),
      ).toBe(true);
    });
  });
  it('Should return false for non-object literal assignment LOCs', () => {
    const nonObjLiteralAssignmentLOCs = [
      `var myVar = 1;`,
      `var myVar = false`,
      `var myVar = [1, 'hello', false];`,
      `var myVar = [1, 'hello', false];`,
      `let someVar = function sayHello() {
                        return true;
                    }`,
      `sayHello(someObj: { someProp: string }): number {`,
      `const getObj = () => {`,
      `onChange={(_)=>{

      }}`,
    ];

    nonObjLiteralAssignmentLOCs.forEach((nonObjLiteralAssignmentLOC) => {
      expect(
        helpers.jsLineCodeProcessing.isObjectLiteralAssignedToVariable(
          nonObjLiteralAssignmentLOC,
        ),
      ).toBe(false);
    });
  });
});
