// Fresh install HTML web view with comprehensive feature overview
export function getHtmlWebView(): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Bright Log - Multi-Language Console Logging</title>
        <meta charset="UTF-8">
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                padding: 0; 
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #333;
                line-height: 1.6;
            }
            .container {
                max-width: 900px;
                margin: 0 auto;
                background: white;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
                min-height: 100vh;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
            }
            .header h1 { 
                margin: 0;
                font-size: 2.5em;
                font-weight: 300;
            }
            .header .subtitle {
                font-size: 1.2em;
                margin: 10px 0 0 0;
                opacity: 0.9;
            }
            .content {
                padding: 30px;
            }
            .section {
                margin-bottom: 40px;
            }
            .section h2 {
                color: #667eea;
                font-size: 1.8em;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #f0f0f0;
            }
            .feature-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin: 20px 0;
            }
            .feature-card {
                background: #f8f9ff;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #667eea;
            }
            .feature-card h3 {
                margin: 0 0 10px 0;
                color: #667eea;
            }
            .language-examples {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin: 20px 0;
            }
            .language-card {
                background: #1e1e1e;
                color: #d4d4d4;
                padding: 20px;
                border-radius: 8px;
                font-family: 'Consolas', 'Monaco', monospace;
            }
            .language-card h3 {
                color: #569cd6;
                margin: 0 0 15px 0;
                font-size: 1.2em;
            }
            .code {
                background: #f5f5f5;
                padding: 15px;
                border-radius: 5px;
                border-left: 4px solid #667eea;
                font-family: 'Consolas', 'Monaco', monospace;
                margin: 10px 0;
                overflow-x: auto;
            }
            .keybinding {
                background: #667eea;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-family: monospace;
                font-weight: bold;
            }
            .table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .table th, .table td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            .table th {
                background: #f8f9ff;
                color: #667eea;
                font-weight: 600;
            }
            .highlight {
                background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                text-align: center;
            }
            .emoji {
                font-size: 1.2em;
                margin-right: 8px;
            }
            .cta {
                background: #667eea;
                color: white;
                padding: 30px;
                text-align: center;
                margin-top: 40px;
            }
            .cta h2 {
                color: white;
                margin: 0 0 15px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📱 Bright Log</h1>
                <div class="subtitle">Multi-Language Console Logging for Modern Development</div>
            </div>
            
            <div class="content">
                <div class="highlight">
                    <h2>🎉 Welcome to Bright Log!</h2>
                    <p>Automating the process of writing meaningful log messages across <strong>JavaScript, TypeScript, Dart, and Swift</strong>.</p>
                    <p>Perfect for full-stack developers, mobile developers, and teams working across multiple platforms.</p>
                </div>

                <div class="section">
                    <h2><span class="emoji">✨</span>Key Features</h2>
                    <div class="feature-grid">
                        <div class="feature-card">
                            <h3>🌍 Multi-Language Support</h3>
                            <p>Works seamlessly with JavaScript, TypeScript, Dart, and Swift</p>
                        </div>
                        <div class="feature-card">
                            <h3>🧠 Smart Detection</h3>
                            <p>Automatically detects file type and uses appropriate log function</p>
                        </div>
                        <div class="feature-card">
                            <h3>⚡ Instant Logging</h3>
                            <p>Generate meaningful log messages with helpful context instantly</p>
                        </div>
                        <div class="feature-card">
                            <h3>🎯 Multi-Cursor Support</h3>
                            <p>Debug multiple variables simultaneously</p>
                        </div>
                        <div class="feature-card">
                            <h3>🔧 Highly Customizable</h3>
                            <p>Personalize prefixes, suffixes, and log formats</p>
                        </div>
                        <div class="feature-card">
                            <h3>📂 Context Awareness</h3>
                            <p>Includes class names, function names, and file information</p>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h2><span class="emoji">🎯</span>Language-Specific Examples</h2>
                    <div class="language-examples">
                        <div class="language-card">
                            <h3>📱 Dart (Flutter)</h3>
                            <pre><code>var username = 'john_doe';
// Select 'username' + Ctrl+Alt+L
print("📱 ~ username: $username");

// In functions with context
void createUser(String name) {
    var userId = generateId();
    print("📱 ~ createUser ~ userId: $userId");
}</code></pre>
                        </div>
                        <div class="language-card">
                            <h3>🍎 Swift (iOS)</h3>
                            <pre><code>let username = "john_doe"
// Select 'username' + Ctrl+Alt+L
print("📱 ~ username: \\(username)")

// In functions with context
func createUser(name: String) {
    let userId = generateId()
    print("📱 ~ createUser ~ userId: \\(userId)")
}</code></pre>
                        </div>
                        <div class="language-card">
                            <h3>🌐 JavaScript</h3>
                            <pre><code>const username = 'john_doe';
// Select 'username' + Ctrl+Alt+L
console.log("📱 ~ username:", username);

// In functions with context
function createUser(name) {
    const userId = generateId();
    console.log("📱 ~ createUser ~ userId:", userId);
}</code></pre>
                        </div>
                        <div class="language-card">
                            <h3>📘 TypeScript</h3>
                            <pre><code>const username: string = 'john_doe';
// Select 'username' + Ctrl+Alt+L
console.log("📱 ~ username:", username);

// In classes with context
class UserService {
    createUser(name: string): void {
        const userId = this.generateId();
        console.log("📱 ~ UserService ~ createUser ~ userId:", userId);
    }
}</code></pre>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h2><span class="emoji">⚡</span>Keyboard Shortcuts</h2>
                    <table class="table">
                        <tr>
                            <th>Action</th>
                            <th>Keybinding</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td><strong>Insert Log Message</strong></td>
                            <td><span class="keybinding">Ctrl+Alt+L</span></td>
                            <td>Generate log statement for selected variable</td>
                        </tr>
                        <tr>
                            <td><strong>Comment All Logs</strong></td>
                            <td><span class="keybinding">Alt+Shift+C</span></td>
                            <td>Comment all Bright Log generated messages</td>
                        </tr>
                        <tr>
                            <td><strong>Uncomment All Logs</strong></td>
                            <td><span class="keybinding">Alt+Shift+U</span></td>
                            <td>Uncomment all Bright Log generated messages</td>
                        </tr>
                        <tr>
                            <td><strong>Delete All Logs</strong></td>
                            <td><span class="keybinding">Alt+Shift+D</span></td>
                            <td>Remove all Bright Log generated messages</td>
                        </tr>
                        <tr>
                            <td><strong>Correct All Logs</strong></td>
                            <td><span class="keybinding">Alt+Shift+X</span></td>
                            <td>Fix/update all Bright Log generated messages</td>
                        </tr>
                    </table>
                </div>

                <div class="section">
                    <h2><span class="emoji">🛠️</span>Development Workflow Examples</h2>
                    
                    <h3>📱 Flutter App Development</h3>
                    <div class="code">
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var theme = Theme.of(context);
    print("📱 ~ MyWidget ~ build ~ theme: $theme");
    
    return Scaffold(
      body: Center(
        child: Text('Hello Flutter!'),
      ),
    );
  }
}
                    </div>

                    <h3>🍎 iOS App Development</h3>
                    <div class="code">
class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        let userDefaults = UserDefaults.standard
        print("📱 ~ ViewController ~ viewDidLoad ~ userDefaults: \\(userDefaults)")
    }
}
                    </div>

                    <h3>🌐 Web Development</h3>
                    <div class="code">
function UserComponent({ userId }: { userId: string }) {
  const user = fetchUser(userId);
  console.log("📱 ~ UserComponent ~ user:", user);
  
  return &lt;div&gt;{user.name}&lt;/div&gt;;
}
                    </div>
                </div>

                <div class="section">
                    <h2><span class="emoji">⚙️</span>Customization Options</h2>
                    <p>All settings work across all supported languages:</p>
                    <table class="table">
                        <tr>
                            <th>Setting</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td><code>brightLog.logMessagePrefix</code></td>
                            <td>"📱"</td>
                            <td>Prefix for all log messages</td>
                        </tr>
                        <tr>
                            <td><code>brightLog.includeFilename</code></td>
                            <td>false</td>
                            <td>Include filename in log messages</td>
                        </tr>
                        <tr>
                            <td><code>brightLog.includeLineNum</code></td>
                            <td>false</td>
                            <td>Include line numbers in logs</td>
                        </tr>
                        <tr>
                            <td><code>brightLog.insertEnclosingClass</code></td>
                            <td>true</td>
                            <td>Include class name context</td>
                        </tr>
                        <tr>
                            <td><code>brightLog.insertEnclosingFunction</code></td>
                            <td>true</td>
                            <td>Include function name context</td>
                        </tr>
                        <tr>
                            <td><code>brightLog.wrapLogMessage</code></td>
                            <td>false</td>
                            <td>Wrap logs with decorative borders</td>
                        </tr>
                    </table>
                </div>

                <div class="section">
                    <h2><span class="emoji">📱</span>Getting Started</h2>
                    <ol>
                        <li><strong>Select a variable</strong> in any supported file (.js, .ts, .dart, .swift)</li>
                        <li><strong>Press <span class="keybinding">Ctrl+Alt+L</span></strong></li>
                        <li><strong>Watch</strong> as Bright Log generates the perfect log statement for your language!</li>
                    </ol>
                    
                    <div class="highlight">
                        <h3>🎯 Perfect for:</h3>
                        <p><strong>Full-Stack Developers</strong> • <strong>Mobile Developers</strong> • <strong>Cross-Platform Teams</strong></p>
                        <p>Whether you're building Flutter apps, iOS apps, or web applications, Bright Log has you covered!</p>
                    </div>
                </div>
            </div>

            <div class="cta">
                <h2>🎉 Happy Debugging!</h2>
                <p>Bright Log is now ready to supercharge your development workflow across all your favorite languages.</p>
                <p><strong>Press <span class="keybinding">Ctrl+Alt+L</span> on any variable to get started!</strong></p>
            </div>
        </div>
    </body>
    </html>
  `;
}
