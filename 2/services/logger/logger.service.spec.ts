import { Logger, LogLevel, LogOutput } from './logger.service';

const logMethods = ['log', 'info', 'warn', 'error'];

describe('Logger', () => {
  let savedConsole: Function[];
  let savedLevel: LogLevel;
  let savedOutputs: LogOutput[];

  beforeAll(() => {
    savedConsole = [];
    logMethods.forEach((m) => {
      savedConsole[m] = console[m];
      console[m] = () => {};
    });
    savedLevel = Logger.level;
    savedOutputs = Logger.outputs;
  });

  afterAll(() => {
    logMethods.forEach((m) => { console[m] = savedConsole[m]; });
    Logger.level = savedLevel;
    Logger.outputs = savedOutputs;
  });

  it('should create an instance', () => {
    expect(new Logger()).toBeTruthy();
  });
});
