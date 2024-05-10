import {http} from 'msw'
import {setupWorker} from 'msw/browser'
import {getAccountInfoHandler} from "./handlers/get-account-info-handler";
import {checkProofHandler} from "./handlers/check-proof-handler";
import {generatePayloadHandler} from "./handlers/generate-payload-handler";

const baseUrl = document.baseURI.replace(/\/$/, '');

export const worker = setupWorker(
  http.post(`${baseUrl}/api/generate_payload`, generatePayloadHandler),
  http.post(`${baseUrl}/api/check_proof`, checkProofHandler),
  http.get(`${baseUrl}/api/get_account_info`, getAccountInfoHandler)
)
