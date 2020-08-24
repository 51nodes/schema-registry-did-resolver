import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import {
  getSchema, ConfigObject, initLibrary,
  InvalidInput, SchemaType, Network,
  SchemaDid, parseSchemaDid
} from '@51nodes/decentralized-schema-registry'
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

  getDidDocument(did: string): any {
    const serviceBaseUrl = this.getNetworkServicePointFromDid(did);
    const id = this.getHashOfDid(did);
    const didDocObject: any = {
      "@context": 'https://www.w3.org/ns/did/v1',
      "id": did,
      "service": [{
        "id": `${did}#get`,
        "type": "GetSchemaService",
        "serviceEndpoint": `${serviceBaseUrl}/${id}`,
      }]
    };
    return didDocObject;
  }

  async getSchemaFromDid(did: string): Promise<any> {
    try {
      return await getSchema(did);
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

  getHashOfDid(did: string): string {
    const schemaDidObject: SchemaDid = parseSchemaDid(did);
    return schemaDidObject.hash;
  }

  getContentTypeFromSchemaHint(did: string): string {
    const schemaDidObject: SchemaDid = parseSchemaDid(did);
    switch (schemaDidObject.typeHint) {
      case SchemaType.JsonSchema:
        return 'application/json'
      case SchemaType.Xsd:
        return 'application/xhtml+xml'
      default:
        return 'text/plain';
    }
  }

  getNetworkServicePointFromDid(did: string): string {
    const schemaDidObject: SchemaDid = parseSchemaDid(did);
    switch (schemaDidObject.network) {
      case Network.EvanIpfs:
        return this.configService.get<string>('evanIpfsServicePoint')
      case Network.PublicIpfs:
        return this.configService.get<string>('publicIpfsServicePoint');
    }
  }

}
