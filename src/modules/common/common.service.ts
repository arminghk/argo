import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {

   async uploadDocument(file) {
        return file; 
    }
}