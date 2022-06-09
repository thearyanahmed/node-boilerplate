import { createParamDecorator, ExecutionContext } from "@nestjs/common"

import { RequestContext } from "./request-context"
import { createRequestContext } from "./util"

export const ReqContext = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): RequestContext => {
		const request = ctx.switchToHttp().getRequest()

		return createRequestContext(request)
	}
)
