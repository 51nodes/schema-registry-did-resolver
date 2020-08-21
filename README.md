# schema-registry-did-resolver

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

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
    * curl -X GET http://localhost:8080/1.0/identifiers/did:schema:evan-ipfs:xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5
    * curl -X GET http://localhost:8080/1.0/identifiers/did:schema:evan-ipfs:xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5/get
