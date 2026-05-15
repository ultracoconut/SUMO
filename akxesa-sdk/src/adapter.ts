import { keccak256, toUtf8Bytes, getAddress } from "ethers";

/**
 * Derives a deterministic Akxesa H160 address
 * from any stable user identifier.
 *
 * Examples:
 * - Auth0 user ID
 * - Firebase UID
 * - Google subject ID
 * - Internal database user ID
 */
export function deriveAddress(userId: string): string {
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid userId");
  }

  const hash = keccak256(toUtf8Bytes(userId));

  // Last 20 bytes (40 hex chars)
  const address = "0x" + hash.slice(-40);

  // Return checksummed address
  return getAddress(address);
}
