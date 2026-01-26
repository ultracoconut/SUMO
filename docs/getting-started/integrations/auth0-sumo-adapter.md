# Auth0 → SUMO Adapter

Author: @Ultracoconut  
License: MIT  
Note: This is example/demo code. It may contain bugs and is not production-ready. Use at your own risk

### Overview

This script automatically maps Auth0 users to SUMO on-chain addresses

- Run this as an Auth0 PostLogin Action

- Auth0 users get a new random H160 address (Ethereum-style) as their SUMO owner address

- Existing mappings are preserved

### Features

- These addresses are H160 abstract identifiers, not EOAs. No private keys exist or are expected

- No blockchain interactions are performed here; the address is just registered

- Fully compatible with SUMO Subscription Manager

### Usage

```js
const { randomBytes, hexlify, getAddress } = require("ethers");

exports.onExecutePostLogin = async (event, api) => {
  const userEmail = event.user.email;

  // Already mapped → do nothing
  if (event.user.app_metadata?.sumo_address) return;

  // Generate deterministic Ethereum-like identifier
  const raw = hexlify(randomBytes(20));
  const sumoAddress = getAddress(raw);

  // Persist mapping
  api.user.setAppMetadata("sumo_address", sumoAddress);

  console.log(
    `SUMO identity created: ${userEmail} → ${sumoAddress}`
  );
};
```

### Notes:
- Use the `sumo_address` in Auth0 `app_metadata` to interact with the SUMO SubscriptionManager
