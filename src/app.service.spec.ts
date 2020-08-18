import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

describe('AppService', () => {
  const appService: AppService = new AppService(new ConfigService());
  it('should return did document', () => {
    const didDocObject: any = {
      "@context": 'https://www.w3.org/2019/did/v1/',
      "id": 'did:schema:evan-ipfs:type-hint=xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5',
      "service": [{
        "id": `did:schema:evan-ipfs:type-hint=xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5#get`,
        "type": "GetSchemaService",
        "serviceEndpoint": `localost:8080/1.0/identifiers/did:schema:evan-ipfs:type-hint=xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5/get`,
      }]
    };
    expect(
      appService.getDidDocument('did:schema:evan-ipfs:type-hint=xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5',
        'localost:8080')).toStrictEqual(didDocObject)
  });

});
