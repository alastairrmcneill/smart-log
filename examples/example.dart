// Dart example
void main() {
  var name = 'John';
  var age = 30;
  var result = calculateSum(10, 20);

  Map<String, dynamic> user = {'name': name, 'age': age};

  print('Hello from Dart!');
}

int calculateSum(int a, int b) {
  var result = a + b;
  return result;
}

class User {
  String name;
  int age;

  User({required this.name, required this.age});

  void greet() {
    print('Hello, my name is $name');
  }
}
