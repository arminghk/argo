import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from "@nestjs/common";
  import {isJWT} from "class-validator";
  import {Request} from "express";
  import {PassengerService} from "../passenger.service";
  import {SKIP_AUTH} from "src/common/decorators/skip-auth.decorator";
  import {Reflector} from "@nestjs/core";
  
  @Injectable()
  export class PassengerAuthGuard implements CanActivate {
    constructor(
      private passengerService: PassengerService,
      private reflector: Reflector
    ) {}
    async canActivate(context: ExecutionContext) {
      const isSkippedAuth = this.reflector.get<boolean>(
        SKIP_AUTH,
        context.getHandler()
      );
      if (isSkippedAuth) return true;
      const httpContext = context.switchToHttp();
      const request: Request = httpContext.getRequest<Request>();
      const token = this.extractToken(request);
      request.user = await this.passengerService.PassengerVerify(token);
      return true;
    }
    protected extractToken(request: Request) {
      const {authorization} = request.headers;
      if (!authorization || authorization?.trim() == "") {
        throw new UnauthorizedException("Login on your account");
      }
      const [bearer, token] = authorization?.split(" ");
      if (bearer?.toLowerCase() !== "bearer" || !token || !isJWT(token))
        throw new UnauthorizedException("Login on your account");
      return token;
    }
  }
  