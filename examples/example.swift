// Swift example
import Foundation

func calculateSum(a: Int, b: Int) -> Int {
    let result = a + b
    return result
}

struct User {
    let name: String
    let age: Int
    
    func greet() {
        print("Hello, my name is \(name)")
    }
}

let name = "John"
let age = 30
let result = calculateSum(a: 10, b: 20)

let user = User(name: name, age: age)

print("Hello from Swift!")
