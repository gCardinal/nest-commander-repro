import { Question, QuestionSet } from 'nest-commander';
import { GenerateQuestions } from './generate.questions';

@QuestionSet({ name: 'nestjs_questions' })
export class NestjsQuestions extends GenerateQuestions {
  public static NAME = 'nestjs_questions';

  @Question({
    name: 'openApi',
    message: 'Do you require Open API (Swagger) to be configured?',
    type: 'confirm',
  })
  public openApi(openApi: string): boolean {
    return openApi === 'true';
  }

  @Question({
    name: 'rabbit',
    message: 'Do you require a RabbitMQ client to be configured?',
    type: 'confirm',
  })
  public rabbitMqClient(rabbitMqClient: string): boolean {
    return rabbitMqClient === 'true';
  }

  @Question({
    name: 'originator',
    message: 'Should your project generate an originator-id header?',
    type: 'confirm',
  })
  public originator(originator: string): boolean {
    return originator === 'true';
  }
}
