import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { RequestContext } from "./shared/request-context/request-context"
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston"

/**
 * AppService consists of a service layer functions of the AppModule.
 * Currently, it supports get_hello_service_method.
 */
@Injectable()
export class AppService {
  /**
   * @param logger AppLogger
   */
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  /**
   * @returns string
   * @param ctx RequestContext
   */
  get_hello_service_method(ctx: RequestContext): string {
    this.logger.verbose(ctx, "call to hello world")
    this.logger.log(ctx,"call get_hello_service_method")

    return 'Hello World!';
  }
}
