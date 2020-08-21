import { Controller, Get, Response, Param, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { Response as Res} from 'express';

@Controller('1.0/identifiers')
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get(':id')
  async getDidDocument(@Response() res: Res, @Param('id') id: string): Promise<any> {
    const schema = await this.appService.getSchemaFromDid(id);
    if (!schema) {
      throw new NotFoundException();
    }
    const didDoc = this.appService.getDidDocument(id);
    return res.set({ 'Transfer-Encoding': 'chunked', 'Content-Type': 'application/json' })
      .send(JSON.stringify(didDoc, null, 2));
  }

  @Get(':id/get')
  async getSchema(@Response() res: Res, @Param('id') id: string): Promise<any> {
    const schema = await this.appService.getSchemaFromDid(id);
    if (schema) {
      const contentType: string = this.appService.getContentTypeFromSchemaHint(id);
      return res.set({ 'Transfer-Encoding': 'chunked', 'Content-Type': contentType })
        .send(schema);
    } else {
      throw new NotFoundException();
    }
  }

}
