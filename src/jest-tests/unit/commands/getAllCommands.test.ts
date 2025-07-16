import { getAllCommands } from '../../../commands';
import type { Command } from '../../../entities';

// Mock each command function
jest.mock('../../../commands/displayLogMessage', () => ({
  displayLogMessageCommand: () => ({
    name: 'brightLog.displayLogMessage',
    handler: jest.fn(),
  }),
}));

jest.mock('../../../commands/commentAllLogMessages', () => ({
  commentAllLogMessagesCommand: () => ({
    name: 'brightLog.commentAllLogMessages',
    handler: jest.fn(),
  }),
}));

jest.mock('../../../commands/uncommentAllLogMessages', () => ({
  uncommentAllLogMessagesCommand: () => ({
    name: 'brightLog.uncommentAllLogMessages',
    handler: jest.fn(),
  }),
}));

jest.mock('../../../commands/deleteAllLogMessages', () => ({
  deleteAllLogMessagesCommand: () => ({
    name: 'brightLog.deleteAllLogMessages',
    handler: jest.fn(),
  }),
}));

jest.mock('../../../commands/correctAllLogMessages', () => ({
  correctAllLogMessagesCommand: () => ({
    name: 'brightLog.correctAllLogMessages',
    handler: jest.fn(),
  }),
}));

describe('getAllCommands', () => {
  test('should return all expected commands', () => {
    const commands = getAllCommands();

    const expectedNames = [
      'brightLog.displayLogMessage',
      'brightLog.commentAllLogMessages',
      'brightLog.uncommentAllLogMessages',
      'brightLog.deleteAllLogMessages',
      'brightLog.correctAllLogMessages',
    ];

    expect(Array.isArray(commands)).toBe(true);

    const actualNames = commands.map((cmd: Command) => cmd.name);
    expect(actualNames).toEqual(expectedNames);

    commands.forEach((cmd) => {
      expect(typeof cmd.name).toBe('string');
      expect(typeof cmd.handler).toBe('function');
    });
  });
});
