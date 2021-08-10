import { CommandTestFactory } from 'nest-commander-testing';
import { TestingModule } from '@nestjs/testing';
import { anything, capture, instance, mock, when } from 'ts-mockito';
import { CommandsModule } from '../commands.module';
import { Generator } from '../../generators/generator';

describe(`GenerateNestjsCommand`, () => {
  let commandInstance: TestingModule;
  let generator: Generator<unknown>;

  beforeAll(async () => {
    generator = mock(Generator);

    when(generator.generate(anything())).thenResolve({
      message: 'Yay',
      success: true,
    });

    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [CommandsModule],
    })
      .overrideProvider(Generator)
      .useValue(instance(generator))
      .compile();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it.each<[string[], Record<string, unknown>]>([
    [
      [
        'nestjs',
        '--name',
        'Foo',
        '--description',
        'Desc',
        '--open-api',
        'false',
        '--rabbit',
        'false',
        '--originator',
        'false',
      ],
      {
        name: 'Foo',
        originator: false,
        openApi: false,
        rabbit: false,
        description: 'Desc',
      },
    ],
    [
      [
        'nestjs',
        '--name',
        'Foo',
        '--description',
        'Desc',
        '--open-api',
        'true',
        '--rabbit',
        'false',
        '--originator',
        'false',
      ],
      {
        name: 'Foo',
        originator: false,
        openApi: true,
        rabbit: false,
        description: 'Desc',
      },
    ],
  ])(
    `creates a schema and generates the project`,
    async (args, expectedSchema) => {
      await CommandTestFactory.run(commandInstance, args);

      const [schema] = capture(generator.generate).last();

      expect(schema).toMatchObject(expectedSchema);
    },
  );
});
