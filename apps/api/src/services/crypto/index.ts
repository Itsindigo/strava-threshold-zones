import crypto from "crypto";
import config from "../../config";

const algorithm = "aes-256-ctr";

export interface TokenHash {
  iv: string;
  content: string;
}

export const encrypt = (text: string): TokenHash => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, config.crypto.secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

export const decrypt = (hash: TokenHash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    config.crypto.secretKey,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};
