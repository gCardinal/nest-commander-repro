import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'generate_questions' })
export class GenerateQuestions {
  public static NAME = 'generate_questions';

  @Question({
    name: 'name',
    message: 'What is the name of your project?',
    type: 'input',
  })
  public name(name: string): string {
    return name;
  }

  @Question({
    name: 'description',
    message: 'Quick description of your project?',
    type: 'input',
  })
  public description(description: string): string {
    return description;
  }
}
