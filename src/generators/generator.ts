import { Result } from './result';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Generator<S extends unknown> {
  public async generate(schema: S): Promise<Result> {
    // Imagine it does something interesting
    return new Result(true, 'Success');
  }
}
