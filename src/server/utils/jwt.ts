import {decodeJwt, JWTPayload, jwtVerify, SignJWT} from 'jose';

/**
 * Secret key for the token.
 */
const JWT_SECRET_KEY = 'your_secret_key';

/**
 * Payload of the token.
 */
export type TokenPayload = {
  address: string
};

/**
 * Create a token with the given payload.
 */
export async function createToken(payload: TokenPayload): Promise<string> {
  const encoder = new TextEncoder();
  const key = encoder.encode(JWT_SECRET_KEY);
  return new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('1Y')
    .sign(key);
}

/**
 * Verify the given token.
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  const encoder = new TextEncoder();
  const key = encoder.encode(JWT_SECRET_KEY);
  try {
    const {payload} = await jwtVerify(token, key);
    return payload;
  } catch (e) {
    return null;
  }
}

/**
 * Decode the given token.
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    return decodeJwt(token);
  } catch (e) {
    return null;
  }
}
