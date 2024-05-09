import {HttpResponseResolver} from "msw";
import {TonProofService} from "../services/ton-proof-service";
import {badRequest, ok} from "../utils/http-utils";

/**
 * Type definition for the generate payload handler.
 */
type GeneratePayloadHandler = (service: TonProofService) => HttpResponseResolver;

/**
 * Generates a payload for ton proof.
 *
 * POST /api/generate_payload
 */
export const generatePayloadHandler: GeneratePayloadHandler = (service) => async () => {
  try {
    return ok({payload: service.generatePayload()});
  } catch (e) {
    return badRequest({error: 'Invalid request', trace: e});
  }
};
