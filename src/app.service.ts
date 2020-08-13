import { Injectable } from '@nestjs/common';
import { getSchema, ConfigObject, initLibrary } from '../../schema-registry-did-crud/dist';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private configService: ConfigService) { }

  getDidDocument(did: string, baseUrl: string): object {
    const didDocObject: object = {
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
    const configObject: ConfigObject = {
      publicIpfsConfig: {
        nodeUrl: this.configService.get<string>('publicIpfsUrl'),
        enablePin: this.configService.get<boolean>('publicEnablePin'),
      },
      evanRuntimeConfig: {
        accountMap: {
          [this.configService.get<string>('accountAddress')]: this.configService.get<string>('accountPrivateKey')
        },
        ipfs: {
          host: this.configService.get<string>('ipfsHost'),
          port: this.configService.get<string>('ipfsPort'),
          protocol: this.configService.get<string>('ipfsProtocol')
        },
        web3Provider: this.configService.get<string>('web3Provider'),
        enablePin: this.configService.get<boolean>('evanEnablePin')
      }
    }
    initLibrary(configObject);
    const schema = await getSchema(did);
    return schema
  }

}
