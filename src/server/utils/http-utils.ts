import {HttpResponse, JsonBodyType, StrictResponse} from "msw";

/**
 * Receives a body and returns an HTTP response with the given body and status code 200.
 */
export function ok<T extends object>(body: T): StrictResponse<JsonBodyType> {
  return HttpResponse.json(body, {status: 200, statusText: 'OK'});
}

/**
 * Receives a body and returns an HTTP response with the given body and status code 400.
 */
export function badRequest<T extends object>(body: T): StrictResponse<JsonBodyType> {
  return HttpResponse.json(body, {
    status: 400,
    statusText: 'Bad Request'
  });
}

/**
 * Receives a body and returns an HTTP response with the given body and status code 401.
 */
export function unauthorized<T extends object>(body: T): StrictResponse<JsonBodyType> {
  return HttpResponse.json(body, {
    status: 401,
    statusText: 'Unauthorized'
  });
}
