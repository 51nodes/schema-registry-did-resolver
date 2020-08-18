# schema-registry-did-resolver

## Build and Run
1. npm install
1. npm run start:dev
1. in browser open localhost:8080
1. to check did document: http://localhost:8080/1.0/identifiers/did:schema:evan-ipfs:type-hint=xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5
1. to get schema: http://localhost:8080/1.0/identifiers/did:schema:evan-ipfs:type-hint=xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5/get

## Using Docker
1. docker build -t schema-registry-did-resolver ./
2. docker run --name did-resolver schema-registry-did-resolver
3. docker ps
4. docker exec -it did-resolver sh
    * apt update
    * apt upgrade
    * apt install curl
    * curl -X GET http://localhost:8080/1.0/identifiers/did:schema:evan-ipfs:type-hint=xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5
    * curl -X GET http://localhost:8080/1.0/identifiers/did:schema:evan-ipfs:type-hint=xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5/get
