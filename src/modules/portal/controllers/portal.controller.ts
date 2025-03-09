import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PortalAuthService } from '../portal.service';
import { loginUserDTO, registerNewUserDTO } from '../dto/portal.dto';
import { PortalAuthGuard } from '../guard/portal.guard';

@UseGuards(PortalAuthGuard)
@Controller('portal')
export class PortalController {
  constructor(private readonly portalAuthService: PortalAuthService) {}

  @Get('/users/list')
  listUser(@Req() req: Request) {
    return this.portalAuthService.listUser(req);
  }


}
