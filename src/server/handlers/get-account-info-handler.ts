import {HttpResponseResolver} from "msw";
import {decodeToken, verifyToken} from "../utils/jwt";
import {TonProofService} from "../services/ton-proof-service";
import {badRequest, ok, unauthorized} from "../utils/http-utils";

/**
 * Type definition for the get account info handler.
 */
type GetAccountInfoHandler = (service: TonProofService) => HttpResponseResolver;

/**
 * Returns account info.
 *
 * GET /api/get_account_info
 */
export const getAccountInfoHandler: GetAccountInfoHandler = (service) => async ({request}) => {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token || !await verifyToken(token)) {
      return unauthorized({error: 'Unauthorized'});
    }

    const payload = decodeToken(token);
    if (!payload?.address) {
      return unauthorized({error: 'Invalid token'});
    }

    return ok(await service.getAccountInfo(payload.address));
  } catch (e) {
    return badRequest({error: 'Invalid request', trace: e});
  }
};
