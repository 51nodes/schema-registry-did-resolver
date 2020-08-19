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
        "serviceEndpoint": `localhost:8080/1.0/identifiers/did:schema:evan-ipfs:type-hint=xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5/get`,
      }]
    };
    expect(
      appService.getDidDocument('did:schema:evan-ipfs:type-hint=xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5',
        'localhost:8080')).toStrictEqual(didDocObject)
  });

  it('should return content type application/xhtml+xml', () => {
    expect(
      appService.getContentTypeFromSchemaHint('did:schema:evan-ipfs:type-hint=xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5'))
      .toBe('application/xhtml+xml')
  });

  it('should return content type application/json', () => {
    expect(
      appService.getContentTypeFromSchemaHint('did:schema:evan-ipfs:type-hint=json-schema:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5'))
      .toBe('application/json')
  });

  it('should return content type text/plain', () => {
    expect(
      appService.getContentTypeFromSchemaHint('did:schema:evan-ipfs:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5'))
      .toBe('text/plain')
  });

});
