import { Controller, Get, Response, Request, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Response as Res, Request as Req } from 'express';

@Controller('1.0/identifiers')
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get(':id')
  async getDidDocument(@Request() req: Req, @Response() res: Res, @Param('id') id: string): Promise<any> {
    const baseUrl = `${req.protocol}://${req.headers.host}`
    const didDoc = await this.appService.getDidDocument(id, baseUrl);
    const schema = await this.appService.getSchemaFromDid(id);
    if (!schema) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Could not get schema from given did ${id}`,
      }, HttpStatus.NOT_FOUND)
    }
    return res.set({ 'Transfer-Encoding': 'chunked', 'Content-Type': 'application/json' })
      .send(JSON.stringify(didDoc, null, 2));
  }

  @Get(':id/get')
  async getSchema(@Response() res: Res, @Param('id') id: string): Promise<any> {
    const schema = await this.appService.getSchemaFromDid(id);
    if (schema) {
      return res.set({ 'Transfer-Encoding': 'chunked', 'Content-Type': 'text/plain' })
        .send(schema);
    } else {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Could not get schema from given did ${id}`,
      }, HttpStatus.NOT_FOUND)
    }
  }

}
