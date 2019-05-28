import { Global, Logger, Module, Provider } from '@nestjs/common';

const loggerProvider: Provider = {
  provide: Logger,
  useValue: new Logger('Angular SSR Demo')
};

@Global()
@Module({
  providers: [loggerProvider],
  exports: [loggerProvider]
})
export class CoreModule { }
