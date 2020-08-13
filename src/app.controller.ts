import { Controller, Get, Response, Request, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Response as Res, Request as Req } from 'express';

@Controller('1.0/identifiers')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(':id')
  getDidDocument(@Request() req: Req, @Response() res: Res, @Param('id') id): any {
    const baseUrl = `${req.protocol}://${req.headers.host}`
    const didDoc = this.appService.getDidDocument(id, baseUrl);
    return res.set({ 'Transfer-Encoding': 'chunked', 'Content-Type': 'application/json' })
      .send(JSON.stringify(didDoc, null, 2));
  }

  @Get(':id/get')
  async getSchema(@Response() res: Res, @Param('id') id): Promise<any> {
    try {
      const schema = await this.appService.getSchemaFromDid(id);
      return res.set({ 'Transfer-Encoding': 'chunked', 'Content-Type': 'application/json' })
        .send(schema);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
