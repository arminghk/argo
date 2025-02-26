import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CommonService } from './common.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage } from './../../common/utils/upload';
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) { }

  @Post('upload/document')
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: "document", maxCount: 1 }, 
    ], {
    storage: multerStorage("user-profile")
  }))
  async uploadDocument(@UploadedFiles() files) {
    return this.commonService.uploadDocument(files.document);  
  }
}

