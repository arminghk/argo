import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PortalAuthService } from '../portal.service';
import { loginUserDTO, registerNewUserDTO } from '../dto/portal.dto';


@Controller('portal')
export class PortalAuthController {
  constructor(private readonly portalAuthService: PortalAuthService) {}

  @Post('/register')
  registerNewUser(@Body() body: registerNewUserDTO) {
    return this.portalAuthService.registerNewUser(body);
  }

  // @Post('/login')
  // login(@Body() body: loginUserDTO) {
  //   return this.portalAuthService.login(body);
  // }

}
