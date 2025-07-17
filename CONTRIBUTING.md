# Contributing to Bright Log 🎯

Thank you for your interest in contributing to Bright Log! This guide will help you get started with development and contributing to this multi-language VS Code extension.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Code Style Guidelines](#code-style-guidelines)
- [Pull Request Process](#pull-request-process)
- [Adding Language Support](#adding-language-support)
- [Issue Reporting](#issue-reporting)

## 🎯 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **VS Code** (version 1.50.0 or higher)
- **Git**

### Supported Languages

This extension currently supports:

- JavaScript/TypeScript
- Dart/Flutter
- Swift

## 🛠️ Development Setup

1. **Fork and Clone the Repository**

   ```bash
   git clone https://github.com/your-username/bright-log.git
   cd bright-log
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Open in VS Code**

   ```bash
   code .
   ```

4. **Start Development Mode**

   ```bash
   npm run watch
   ```

5. **Launch Extension Development Host**
   - Press `F5` or go to `Run and Debug` view
   - Select `Launch Extension` configuration
   - This opens a new VS Code window with your extension loaded

## 📁 Project Structure

```
├── src/
│   ├── extension.ts              # Main extension entry point
│   ├── commands/                 # Command implementations
│   │   ├── displayLogMessage.ts  # Core log message generation
│   │   ├── commentAllLogMessages.ts
│   │   ├── deleteAllLogMessages.ts
│   │   └── ...
│   ├── debug-message/            # Language-specific debug message classes
│   │   ├── dart/                 # Dart language support
│   │   ├── js/                   # JavaScript/TypeScript support
│   │   ├── swift/                # Swift language support
│   │   └── DebugMessage.ts       # Base debug message class
│   ├── entities/                 # Core data structures
│   ├── helpers/                  # Utility functions
│   ├── line-code-processing/     # Language-specific code processing
│   ├── utilities/                # General utilities
│   ├── jest-tests/              # Unit tests
├── examples/                     # Example files for testing
├── package.json                  # Extension manifest
└── README.md
```

## 🔄 Development Workflow

### Running the Extension

1. **Development Mode**

   ```bash
   npm run watch
   ```

2. **Testing in Extension Development Host**
   - Press `F5` to launch a new VS Code window
   - Test your changes in real-time
   - Console logs appear in the original VS Code window's Debug Console

### Building for Production

```bash
npm run vscode:prepublish
```

## 🧪 Testing

### Unit Tests (Jest)

```bash
npm run test:jest
```

### Integration Tests (Mocha)

```bash
npm run test:compile
npm test
```

### Run All Tests

```bash
npm test
```

### Testing Guidelines

- Write unit tests for new utility functions
- Add integration tests for new commands
- Test with all supported languages (JS/TS, Dart, Swift)
- Include edge cases and error scenarios

## 📝 Code Style Guidelines

### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow the existing ESLint configuration
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes and interfaces
- Add JSDoc comments for public methods

### Linting

```bash
npm run lint
```

### Code Formatting

The project uses ESLint with Prettier integration. Make sure your code passes linting before submitting.

### File Naming Conventions

- Use **camelCase** for file names (e.g., `debugMessage.ts`)
- Use **PascalCase** for class files (e.g., `DebugMessage.ts`)
- Group related files in directories

## 🔀 Pull Request Process

1. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the code style guidelines
   - Add tests for new functionality
   - Update documentation if needed

3. **Test Your Changes**

   ```bash
   npm test
   npm run lint
   ```

4. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Provide a clear description of your changes
   - Link any related issues

### PR Requirements

- ✅ All tests pass
- ✅ Code follows style guidelines
- ✅ New features include tests
- ✅ Documentation is updated
- ✅ No breaking changes (unless discussed)

## 🌐 Adding Language Support

To add support for a new programming language:

1. **Create Language-Specific Classes**

   ```
   src/debug-message/[language]/
   ├── [Language]DebugMessage.ts
   ├── [Language]DebugMessageLine.ts
   └── [Language]DebugMessageAnonymous.ts
   ```

2. **Add Line Code Processing**

   ```
   src/line-code-processing/[language]/
   └── index.ts
   ```

3. **Update Language Detection**
   - Modify `src/utilities/languageDetection.ts`
   - Add the new language to supported languages

4. **Update Package.json**
   - Add activation events for the new language
   - Update the description

5. **Add Examples**
   - Create example files in `examples/`
   - Include in test files

6. **Update Documentation**
   - Add language examples to README.md
   - Update feature descriptions

## 🐛 Issue Reporting

### Before Creating an Issue

- Check if the issue already exists
- Test with the latest version
- Provide minimal reproduction steps

### Bug Reports

Include:

- VS Code version
- Extension version
- Programming language(s) affected
- Steps to reproduce
- Expected vs actual behavior
- Code samples (if applicable)

### Feature Requests

Include:

- Clear description of the feature
- Use cases and benefits
- Examples of how it should work
- Any relevant screenshots or mockups

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: alastair.r.mcneill@gmail.com

## 🏗️ Architecture Notes

### Core Concepts

- **DebugMessage**: Base class for all log message types
- **Language-specific implementations**: Handle syntax differences
- **Command pattern**: All user actions are implemented as commands
- **Configuration-driven**: Behavior controlled by VS Code settings

### Key Files

- `src/extension.ts`: Extension activation and command registration
- `src/commands/displayLogMessage.ts`: Core log insertion logic
- `src/debug-message/`: Language-specific log generation
- `src/utilities/languageDetection.ts`: Determines active language

## 📄 License

By contributing to Bright Log, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Bright Log! Your help makes this extension better for developers worldwide. 🎯
