import { getAllCommands } from '../../../commands';
import type { Command } from '../../../entities';

// Mock each command function
jest.mock('../../../commands/displayLogMessage', () => ({
  displayLogMessageCommand: () => ({
    name: 'smartLog.displayLogMessage',
    handler: jest.fn(),
  }),
}));

jest.mock('../../../commands/commentAllLogMessages', () => ({
  commentAllLogMessagesCommand: () => ({
    name: 'smartLog.commentAllLogMessages',
    handler: jest.fn(),
  }),
}));

jest.mock('../../../commands/uncommentAllLogMessages', () => ({
  uncommentAllLogMessagesCommand: () => ({
    name: 'smartLog.uncommentAllLogMessages',
    handler: jest.fn(),
  }),
}));

jest.mock('../../../commands/deleteAllLogMessages', () => ({
  deleteAllLogMessagesCommand: () => ({
    name: 'smartLog.deleteAllLogMessages',
    handler: jest.fn(),
  }),
}));

jest.mock('../../../commands/correctAllLogMessages', () => ({
  correctAllLogMessagesCommand: () => ({
    name: 'smartLog.correctAllLogMessages',
    handler: jest.fn(),
  }),
}));

describe('getAllCommands', () => {
  test('should return all expected commands', () => {
    const commands = getAllCommands();

    const expectedNames = [
      'smartLog.displayLogMessage',
      'smartLog.commentAllLogMessages',
      'smartLog.uncommentAllLogMessages',
      'smartLog.deleteAllLogMessages',
      'smartLog.correctAllLogMessages',
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
