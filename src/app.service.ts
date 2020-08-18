import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { getSchema, ConfigObject, initLibrary, InvalidInput } from '../../schema-registry-did-crud/dist/index'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);

  constructor(private configService: ConfigService) { }

  public async onApplicationBootstrap(): Promise<void> {
    this.logger.log('Initializing the library');
    const configObject: ConfigObject = {
      publicIpfsConfig: {
        nodeUrl: this.configService.get<string>('publicIpfsUrl'),
        enablePin: this.configService.get<boolean>('publicEnablePin'),
      },
      evanRuntimeConfig: {
        accountMap: {
          [this.configService.get<string>('evanAccountAddress')]: this.configService.get<string>('evanAccountPrivateKey')
        },
        ipfs: {
          host: this.configService.get<string>('evanIpfsHost'),
          port: this.configService.get<string>('evanIpfsPort'),
          protocol: this.configService.get<string>('evanIpfsProtocol')
        },
        web3Provider: this.configService.get<string>('evanWeb3Provider'),
        enablePin: this.configService.get<boolean>('evanEnablePin')
      }
    }
    initLibrary(configObject);
  }

  getDidDocument(did: string, baseUrl: string): any {
    const didDocObject: any = {
      "@context": 'https://www.w3.org/2019/did/v1/',
      "id": did,
      "service": [{
        "id": `${did}#get`,
        "type": "GetSchemaService",
        "serviceEndpoint": `${baseUrl}/1.0/identifiers/${did}/get`,
      }]
    };
    return didDocObject;
  }

  async getSchemaFromDid(did: string): Promise<any> {
    try {
      const schema = await getSchema(did);
      return schema;
    } catch (error) {
      if (error instanceof InvalidInput) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        }, HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

  }

}
