import { Controller, Get, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common'
import { AppService } from './app.service';
import { AppLogger } from "./shared/logger/logger.service"
import { RequestContext } from "./shared/request-context/request-context"
import { ReqContext } from "./shared/request-context/req-context.decorator"


type JsonResponse = Record<string, any>

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly logger: AppLogger,
  ) {
    this.logger.setContext("AppController")
  }

  @Get("/")
  @HttpCode(HttpStatus.OK)
  get_hello(
      @ReqContext() ctx: RequestContext,
  ): JsonResponse {
    this.logger.log(ctx,"call to get hello route")

    const hello_service_value = this.appService.get_hello_service_method(ctx);

    return {
      value: hello_service_value
    } as JsonResponse
  }

  @Get("/404")
  @HttpCode(HttpStatus.NOT_FOUND)
  an_404_route(
      @ReqContext() ctx: RequestContext,
  ): JsonResponse {
    this.logger.log(ctx,"route not found")

    throw new NotFoundException("demo route not found", "could not find the route you are looking for.")
  }
}
