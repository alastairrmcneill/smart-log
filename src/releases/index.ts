// Release management placeholder
export const releaseNotes: Record<string, { webViewHtml: string }> = {
  '1.0.0': {
    webViewHtml:
      '<html><body><h1>Bright Log v1.0.0</h1><p>Multi-language support for JavaScript, TypeScript, Dart, and Swift!</p></body></html>',
  },
};

export function getLatestWebViewReleaseVersion(): string {
  return '1.0.0';
}

export function getPreviousWebViewReleaseVersion(): string {
  return '0.9.0';
}
