import {http} from 'msw'
import {setupWorker} from 'msw/browser'
import {getAccountInfoHandler} from "./handlers/get-account-info-handler";
import {checkProofHandler} from "./handlers/check-proof-handler";
import {generatePayloadHandler} from "./handlers/generate-payload-handler";
import {TonProofService} from './services/ton-proof-service';

const service = new TonProofService();

const baseUrl = document.baseURI.replace(/\/$/, '');

export const worker = setupWorker(
  http.post(`${baseUrl}/api/generate_payload`, generatePayloadHandler(service)),
  http.post(`${baseUrl}/api/check_proof`, checkProofHandler(service)),
  http.get(`${baseUrl}/api/get_account_info`, getAccountInfoHandler(service))
)
