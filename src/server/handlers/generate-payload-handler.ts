import {HttpResponseResolver} from "msw";
import {TonProofService} from "../services/ton-proof-service";
import {badRequest, ok} from "../utils/http-utils";
import {createPayloadToken} from "../utils/jwt";

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
    const payload = service.generatePayload();
    const payloadToken = await createPayloadToken({payload: payload});

    return ok({payload: payloadToken});
  } catch (e) {
    return badRequest({error: 'Invalid request', trace: e});
  }
};
