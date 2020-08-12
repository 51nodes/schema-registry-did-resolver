import { Injectable } from '@nestjs/common';
import { getSchema, ConfigObject, initLibrary } from "../../schema-registry-did-crud/dist";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private configService: ConfigService) {
  }

  getDidDocument(did: string): object {
    const didDocObject: object = {
      "@context": 'https://www.w3.org/2019/did/v1/',
      "id": did,
      "service": [{
        "id": `${did}#get`,
        "type": "GetSchemaService",
        "serviceEndpoint": `http://localhost:8080/1.0/identifiers/${did}/get`,
      }]
    };
    return didDocObject;
  }

async getSchemaFromDid(did: string): Promise < any > {
  const configObject: ConfigObject = {
    publicIpfsUrl: this.configService.get<string>('publicIpfsUrl'),
    evanRuntimeConfig: {
      accountMap: {
        [this.configService.get<string>('accountAddress')]: this.configService.get<string>('accountPrivateKey')
      },
      ipfs: {
        host: this.configService.get<string>('ipfsHost'),
        port: this.configService.get<string>('ipfsPort'),
        protocol: this.configService.get<string>('ipfsProtocol')
      },
      web3Provider: this.configService.get<string>('web3Provider')
    }
  }
    initLibrary(configObject);
    const schema = await getSchema(did);
  return schema
}

}
