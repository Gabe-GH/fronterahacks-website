"use server";

import {
  createDecipheriv,
  privateDecrypt,
  createPrivateKey,
  KeyObject,
  constants,
} from "node:crypto";

// Retrieve and validate the environment variable
const privateKeyString = process.env.RSA_PRIVATE_KEY;
if (!privateKeyString) {
  throw new Error("Environment variable RSA_PRIVATE_KEY is not set.");
}

// Convert the private key string to a KeyObject for decryption
const adminPrivateKey: KeyObject = createPrivateKey(privateKeyString);

export const decryptPayload = async (encryptedQRData: any) => {
  const qrData = await JSON.parse(encryptedQRData);

  const { encryptedData, encryptedAesKey, iv } = qrData;

  // Decrypt the AES key using admin's RSA private key
  const aesKey = privateDecrypt(
    {
      key: adminPrivateKey,
      padding: constants.RSA_PKCS1_OAEP_PADDING, // Make sure you're using the correct padding
    },
    Buffer.from(encryptedAesKey, "base64") // The AES key was base64 encoded
  );

  // Decrypt the data using AES-256-CBC with the decrypted AES key and IV
  const decipher = createDecipheriv(
    "aes-256-cbc",
    aesKey,
    Buffer.from(iv, "hex")
  );
  let decryptedData = decipher.update(encryptedData, "hex", "utf8");
  decryptedData += decipher.final("utf8");

  // Return the decrypted data (should be the original email or plaintext)
  return decryptedData;
};
