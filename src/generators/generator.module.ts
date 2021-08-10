import { Module } from '@nestjs/common';
import { Generator } from './generator';

@Module({
  exports: [Generator],
  providers: [Generator],
})
export class GeneratorModule {}
