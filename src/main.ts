import { AppModule } from './app/app.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  await CommandFactory.run(AppModule);
}

bootstrap();
