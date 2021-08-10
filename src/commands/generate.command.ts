import { Command } from './command';
import { InquirerService, Option } from 'nest-commander';
import { Generator } from '../generators/generator';

export abstract class GenerateCommand<
  O extends Record<string, any>,
> extends Command<O> {
  protected constructor(
    protected readonly generator: Generator<unknown>,
    protected readonly inquirer: InquirerService,
  ) {
    super();
  }

  @Option({
    flags: '-n, --name [name]',
    description: 'name of your project',
  })
  public name(name: string): string {
    return name;
  }

  @Option({
    flags: '-d, --description [description]',
    description: 'a quick description of your project',
  })
  public description(description: string): string {
    return description;
  }

  protected async generate(schema: unknown): Promise<void> {
    await this.generator.generate(schema);
  }

  protected async promptForMissingOptions<O>(
    questionName: string,
    options: Partial<O>,
  ): Promise<O> {
    return this.inquirer.ask<O>(questionName, options);
  }
}
