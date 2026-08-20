// Usage: node scripts/hash-password.mjs "your-new-password"
// Prints a value to store as the ADMIN_PASSWORD_HASH secret.

import { hashPassword } from "../src/crypto.js";

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

const hash = await hashPassword(password);
console.log(hash);
