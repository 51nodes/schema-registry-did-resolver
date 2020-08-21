import { Controller, Get, Response, Request, Param, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { Response as Res, Request as Req } from 'express';

@Controller('1.0/identifiers')
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get(':id')
  async getDidDocument(@Request() req: Req, @Response() res: Res, @Param('id') id: string): Promise<any> {
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
