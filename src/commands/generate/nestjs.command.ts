import { GenerateCommand } from '../generate.command';
import { Command, InquirerService, Option } from 'nest-commander';
import { NestjsQuestions } from './nestjs.questions';
import { Generator } from '../../generators/generator';

interface GenerateNestjsCommandOptions {
  name: string;
  description: string;
  openApi: boolean;
  rabbitMqClient: boolean;
  originator: boolean;
}

@Command({
  name: 'nestjs',
  description: 'Generate a new NestJS project',
})
export class GenerateNestjsCommand extends GenerateCommand<GenerateNestjsCommandOptions> {
  private static requirements: string[] = ['openApi', 'rabbit', 'originator'];

  public constructor(generator: Generator<unknown>, inquirer: InquirerService) {
    super(generator, inquirer);
  }

  public async run(
    input: string[],
    options: GenerateNestjsCommandOptions,
  ): Promise<void> {
    const { name, description, ...requirements } =
      await this.promptForMissingOptions<GenerateNestjsCommandOptions>(
        NestjsQuestions.NAME,
        options,
      );
    // If you step debug here, you'll see that the options are always false
    const schema = { name, description };

    GenerateNestjsCommand.requirements.forEach((requirement) => {
      schema[requirement] = requirements[requirement];
    });

    await this.generate(schema);
  }

  @Option({
    flags: '-o, --open-api',
    description: 'configure Open API (Swagger)',
  })
  public openApi(openApi: string): boolean {
    return openApi === 'true';
  }

  @Option({
    flags: '-r, --rabbit',
    description: "setup Station Casinos' RabbitMQ client module",
  })
  public rabbitMqClient(rabbitMqClient: string): boolean {
    return rabbitMqClient === 'true';
  }

  @Option({
    flags: '-g, --originator',
    description: 'when set, the project will create the originator-id header',
  })
  public originator(originator: string): boolean {
    return originator === 'true';
  }
}
