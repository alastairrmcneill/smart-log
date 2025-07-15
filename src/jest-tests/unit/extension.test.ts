import * as vscode from 'vscode';
import { activate } from '../../extension';
import * as helpers from '../../helpers';
import * as releases from '../../releases';
import * as uiHelpers from '../../ui/helpers';
import { ExtensionProperties } from '../../entities';

jest.mock('../../helpers');
jest.mock('../../releases');
jest.mock('../../ui/helpers');

describe.only('activate - command registration', () => {
  const registerCommandMock = jest.fn();
  const executeCommandMock = jest.fn();
  const getConfigurationMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock extension properties
    jest
      .spyOn(helpers, 'getExtensionProperties')
      .mockReturnValue({} as ExtensionProperties);
    // Mock vscode window registerTreeDataProvider
    const mockedRegisterTreeDataProvider = jest.fn(() => ({
      dispose: jest.fn(),
    }));
    Object.defineProperty(vscode, 'window', {
      value: {
        ...vscode.window,
        registerTreeDataProvider: mockedRegisterTreeDataProvider,
      },
    });

    // Mock VSCode API
    jest
      .spyOn(vscode.commands, 'registerCommand')
      .mockImplementation(registerCommandMock);
    jest
      .spyOn(vscode.commands, 'executeCommand')
      .mockImplementation(executeCommandMock);
    jest
      .spyOn(vscode.workspace, 'getConfiguration')
      .mockImplementation(getConfigurationMock);
    jest.spyOn(vscode.extensions, 'getExtension').mockImplementation(() => ({
      id: 'AlastairMcNeilll.smart-log',
      extensionUri: {} as vscode.Uri,
      extensionKind: 1,
      extensionPath: '',
      isActive: true,
      exports: {},
      activate: jest.fn(),
      packageJSON: {
        version: '3.0.0',
      },
    }));

    // Safe mocks for release version helpers
    (releases.getPreviousWebViewReleaseVersion as jest.Mock).mockReturnValue(
      '2.16.0',
    );
    (releases.getLatestWebViewReleaseVersion as jest.Mock).mockReturnValue(
      '3.0.0',
    );
    (
      uiHelpers.showReleaseHtmlWebViewAndNotification as jest.Mock
    ).mockImplementation(() => {});
    (helpers.readFromGlobalState as jest.Mock).mockReturnValue(undefined);
  });

  it('registers all commands returned by getAllCommands', () => {
    const fakeContext = {
      subscriptions: [],
    } as unknown as vscode.ExtensionContext;

    activate(fakeContext);

    expect(registerCommandMock).toHaveBeenCalledTimes(2);
  });

  it('Invoke showing the release webview with correct versions', () => {
    const fakeContext = {
      subscriptions: [],
    } as unknown as vscode.ExtensionContext;

    activate(fakeContext);

    expect(
      uiHelpers.showReleaseHtmlWebViewAndNotification,
    ).toHaveBeenCalledWith(fakeContext, '2.16.0', '3.0.0');
  });

  it('activates freemium mode when no license or bundle are found', async () => {
    const fakeContext = {
      subscriptions: [],
    } as unknown as vscode.ExtensionContext;

    // Simulate freemium state
    (helpers.readFromGlobalState as jest.Mock).mockReturnValue(undefined);

    await activate(fakeContext);

    expect(helpers.activateFreemiumMode).toHaveBeenCalledTimes(1);
  });
});
