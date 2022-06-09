import { Injectable } from '@nestjs/common';
import { AppLogger } from "./shared/logger/logger.service"
import { RequestContext } from "./shared/request-context/request-context"

/**
 * AppService consists of a service layer functions of the AppModule.
 * Currently, it supports get_hello_service_method.
 */
@Injectable()
export class AppService {
  /**
   * @param logger AppLogger
   */
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext("AppService")
  }

  /**
   * @returns string
   * @param ctx RequestContext
   */
  get_hello_service_method(ctx: RequestContext): string {
    this.logger.log(ctx,"call get_hello_service_method")

    return 'Hello World!';
  }
}
