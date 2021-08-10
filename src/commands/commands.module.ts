import { Module } from '@nestjs/common';
import { GenerateNestjsCommand } from './generate/nestjs.command';
import { NestjsQuestions } from './generate/nestjs.questions';
import { GeneratorModule } from '../generators/generator.module';

@Module({
  imports: [GeneratorModule],
  providers: [GenerateNestjsCommand, NestjsQuestions],
})
export class CommandsModule {}
