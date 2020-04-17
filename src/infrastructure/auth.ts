import jwksClient, { CertSigningKey, JwksClient, RsaSigningKey, SigningKey } from "jwks-rsa";
import jwt, { JwtHeader, SigningKeyCallback, VerifyOptions } from "jsonwebtoken";
import { UserToken } from "./models";
import { TokenConfig } from "../config";
import { AuthenticationError } from "./AuthenticationError";

const getKey = (client: JwksClient) => (
  header: JwtHeader,
  cb: SigningKeyCallback,
): void => {
  client.getSigningKey(header.kid, (err: Error, key: SigningKey): void => {
    const signingKey: string = key ?
      (key as CertSigningKey).publicKey ||
      (key as RsaSigningKey).rsaPublicKey
      : null;

    cb(err, signingKey);
  });
};

export const authenticate = (
  token: string,
  tokenConfig: TokenConfig
) => {
  const options = {
    audience: tokenConfig.audience,
    issuer: tokenConfig.issuer,
    algorithms: tokenConfig.algorithms
  } as VerifyOptions;

  const client = jwksClient({
    jwksUri: tokenConfig.jwksUri
  });

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey(client),
      options,
      (err, decoded) => {
        if (err) {
          return reject(new AuthenticationError(`A valid token is required.`));
        }

        return resolve(decoded as UserToken);
      },
    );
  });
};