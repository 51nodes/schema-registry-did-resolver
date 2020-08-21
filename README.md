# schema-registry-did-resolver

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Build and Run
1. npm install
1. npm run start:dev
1. in browser open localhost:8080
1. to check did document: http://localhost:8080/1.0/identifiers/did:schema:evan-ipfs:xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5
1. to get schema: http://localhost:8080/1.0/identifiers/did:schema:evan-ipfs:xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5/get

## Using Docker
1. docker build -t schema-registry-did-resolver ./
2. docker run --name did-resolver schema-registry-did-resolver
3. docker ps
4. docker exec -it did-resolver sh
    * curl -X GET http://localhost:8080/1.0/identifiers/did:schema:evan-ipfs:xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5
    * curl -X GET http://localhost:8080/1.0/identifiers/did:schema:evan-ipfs:xsd:QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5/get

## Configurations
**WARNING**: The provided evan account and private key are published on gitHub and only for example purposes, therefore do not use this private key in your configuration and on any network. Creating an evan account can be done using the evan.network dashboard : https://dashboard.evan.network/#/dashboard.vue.evan/onboarding.vue.evan/sign-up

```
publicIpfsUrl=https://ipfs.infura.io:5001/api/v0
publicIpfsServicePoint=https://ipfs.infura.io/ipfs
publicEnablePin=false
evanWeb3Provider=wss://core.evan.network/ws
evanIpfsHost=ipfs.evan.network
evanIpfsPort=443
evanIpfsProtocol=https
evanAccountId=0x8370F91b6Cdf7A15a7C48593c8Cba98C55B25e25
evanAccountPrivateKey=50a635f2797d04e93c3c5d799099e42dbf116dcc04867ad6fbce83f1ec4cdfce
evanEnablePin=false
evanIpfsServicePoint=https://ipfs.evan.network/ipfs
```
