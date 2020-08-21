import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

describe('AppService', () => {
  const appService: AppService = new AppService(new ConfigService(
    {
      'evanIpfsServicePoint':'baseUrl'
    }
  ));
  it('should return did document', () => {
    const didDocObject: any = {
      "@context": 'https://www.w3.org/ns/did/v1',
      "id": 'did:schema:evan-ipfs:xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5',
      "service": [{
        "id": `did:schema:evan-ipfs:xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5#get`,
        "type": "GetSchemaService",
        "serviceEndpoint": `baseUrl/QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5`,
      }]
    };
    expect(
      appService.getDidDocument('did:schema:evan-ipfs:xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5')).toStrictEqual(didDocObject)
  });

  it('should return content type application/xhtml+xml', () => {
    expect(
      appService.getContentTypeFromSchemaHint('did:schema:evan-ipfs:xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5'))
      .toBe('application/xhtml+xml')
  });

  it('should return content type application/json', () => {
    expect(
      appService.getContentTypeFromSchemaHint('did:schema:evan-ipfs:json-schema:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5'))
      .toBe('application/json')
  });

  it('should return content type text/plain', () => {
    expect(
      appService.getContentTypeFromSchemaHint('did:schema:evan-ipfs:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5'))
      .toBe('text/plain')
  });

});
