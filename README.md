# Bright Log 🎯

**Automating the process of writing meaningful log messages for JavaScript, TypeScript, Dart, and Swift.**

---

## 🌟 Why Bright Log?

Bright Log is a **developer's best friend** for debugging across multiple programming languages.

**Enhanced with multi-language support**, it now works seamlessly with JavaScript, TypeScript, Dart, and Swift, making debugging **faster and more efficient** across your entire development stack.

---

## 🎯 Multi-Language Support

### 🎯 Flutter/Dart Development

```dart
var username = 'john_doe';
// Select 'username' and press Ctrl+Alt+L
print("🎯 ~ username: $username");
```

### 🍎 iOS/Swift Development

```swift
let username = "john_doe"
// Select 'username' and press Ctrl+Alt+L
print("🎯 ~ username: \(username)")
```

### 🌐 Web Development (JavaScript/TypeScript)

```javascript
const username = 'john_doe';
// Select 'username' and press Ctrl+Alt+L
console.log('🎯 ~ username:', username);
```

---

## ✨ Features at a Glance

✔️ **Multi-Language Support** – JavaScript, TypeScript, Dart, and Swift  
✔️ **Smart Language Detection** – Automatically uses the right log function  
✔️ **Insert Meaningful Log Messages** – Quickly generate logs with helpful context  
✔️ **Comment, Uncomment, or Delete Logs** – Manage logs with simple shortcuts  
✔️ **Multi-Cursor Support** – Debug multiple variables simultaneously  
✔️ **Customizable Log Format** – Personalize how logs appear in your code

---

## ⚡ Keybindings

| Operation              | Keybinding    | Description                             |
| ---------------------- | ------------- | --------------------------------------- |
| **Insert log message** | `Ctrl+Alt+L`  | Generate log for selected variable      |
| **Comment all logs**   | `Alt+Shift+C` | Comment all extension-generated logs    |
| **Uncomment all logs** | `Alt+Shift+U` | Uncomment all extension-generated logs  |
| **Delete all logs**    | `Alt+Shift+D` | Remove all extension-generated logs     |
| **Correct all logs**   | `Alt+Shift+X` | Fix/update all extension-generated logs |

---

## 🎯 Language-Specific Examples

### 🐦 Dart (Flutter Development)

```dart
// Working with variables
var user = {'name': 'John', 'age': 30};
print("🎯 ~ user: $user");

// In functions with context
int calculateSum(int a, int b) {
    var result = a + b;
    print("🎯 ~ calculateSum ~ result: $result");
    return result;
}

// In classes
class UserService {
    void createUser(String name) {
        var userId = generateId();
        print("🎯 ~ UserService ~ createUser ~ userId: $userId");
    }
}
```

### 🍎 Swift (iOS Development)

```swift
// Working with variables
let user = ["name": "John", "age": 30]
print("🎯 ~ user: \(user)")

// In functions with context
func calculateSum(a: Int, b: Int) -> Int {
    let result = a + b
    print("🎯 ~ calculateSum ~ result: \(result)")
    return result
}

// In classes/structs
struct UserService {
    func createUser(name: String) {
        let userId = generateId()
        print("🎯 ~ UserService ~ createUser ~ userId: \(userId)")
    }
}
```

### 🌐 JavaScript/TypeScript (Web Development)

```javascript
// Working with variables
const user = { name: 'John', age: 30 };
console.log('🎯 ~ user:', user);

// In functions with context
function calculateSum(a, b) {
  const result = a + b;
  console.log('🎯 ~ calculateSum ~ result:', result);
  return result;
}

// In classes
class UserService {
  createUser(name) {
    const userId = this.generateId();
    console.log('🎯 ~ UserService ~ createUser ~ userId:', userId);
  }
}
```

---

## ⚙️ Configuration & Customization

The extension automatically detects your file type and uses the appropriate logging function:

- **JavaScript/TypeScript**: `console.log()`, `console.warn()`, `console.error()`, etc.
- **Dart**: `print()`
- **Swift**: `print()`

### Available Settings

| Setting                             | Description                       | Default |
| ----------------------------------- | --------------------------------- | ------- |
| `brightLog.logMessagePrefix`        | Prefix for log messages           | `🎯`    |
| `brightLog.logMessageSuffix`        | Suffix for log messages           | `:`     |
| `brightLog.includeFilename`         | Include filename in logs          | `false` |
| `brightLog.includeLineNum`          | Include line numbers              | `false` |
| `brightLog.insertEnclosingClass`    | Include class name                | `true`  |
| `brightLog.insertEnclosingFunction` | Include function name             | `true`  |
| `brightLog.wrapLogMessage`          | Wrap logs with decorative borders | `false` |
| `brightLog.addSemicolonInTheEnd`    | Add semicolon at end              | `false` |
| `brightLog.quote`                   | Quote type (`"`, `'`, `` ` ``)    | `"`     |

---

## 📦 Installation

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for **"Bright Log"**
4. Click **Install**
5. Start debugging across JavaScript, TypeScript, Dart, and Swift! 🎉

---

## 🛠️ Development Workflow Examples

### 🎯 Flutter App Development

```dart
// In your Flutter widgets
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var theme = Theme.of(context);
    print("🎯 ~ MyWidget ~ build ~ theme: $theme");

    return Scaffold(
      body: Center(
        child: Text('Hello Flutter!'),
      ),
    );
  }
}
```

### 🍎 iOS App Development

```swift
// In your iOS ViewControllers
class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        let userDefaults = UserDefaults.standard
        print("🎯 ~ ViewController ~ viewDidLoad ~ userDefaults: \(userDefaults)")
    }
}
```

### 🌐 Web Development

```typescript
// In your React/Angular/Vue components
interface User {
  id: string;
  name: string;
}

function UserComponent({ userId }: { userId: string }) {
  const user = fetchUser(userId);
  console.log("🎯 ~ UserComponent ~ user:", user);

  return <div>{user.name}</div>;
}
```

---

---

## 🤝 Contributing

We welcome contributions! Whether you're:

- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🔧 Submitting code improvements
- 📚 Improving documentation

---

## 📄 License

See LICENSE.md file for details.

---

**Enjoy productive debugging across JavaScript, TypeScript, Dart, and Swift! 🎯**

_Perfect for full-stack developers, mobile developers, and teams working across multiple platforms._
