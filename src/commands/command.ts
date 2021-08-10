import { CommandRunner } from 'nest-commander';

export abstract class Command<O extends Record<string, any>>
  implements CommandRunner
{
  public abstract run(input: string[], options: O): Promise<void>;

  protected exit(exitCode = 0): never {
    process.exit(exitCode);
  }
}
