# Akxesa SDK

Akxesa SDK is a TypeScript/Node.js library for interacting with the **Akxesa Subscription Manager smart contract**.

It provides a simple API to manage on-chain subscriptions, verify access, and handle deterministic blockchain identities across different authentication providers (Auth0, Firebase, etc).


## Features

- Create and manage subscriptions on-chain
- Verify subscription access
- Deterministic identity resolution
- Supports both:
  - EVM wallet addresses (`0x...`)
  - External auth IDs (Auth0, Firebase, etc.)
- Built on **ethers v6**
- Fully TypeScript compatible


## Installation

Install the Akxesa SDK via npm:

```bash
npm install akxesa-sdk

## Setup

```ts
import { Akxesa } from "akxesa-sdk";

const akxesa = new Akxesa({
  rpcUrl: "https://eth-rpc-testnet.polkadot.io/",
  managerAddress: "0xYourManagerContractAddress",
  privateKey: "0xYourPrivateKey"
});
```

## Identity

Akxesa supports two types of identifiers:

1. EVM Address (direct usage)

```ts
userId: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
```

2. External Auth ID (deterministic mapping)

```ts
userId: "auth0|123456"
userId: "firebase|uid_ABC"
userId: "google-oauth2|98765"
```

## Create a Subscription

```ts
const tx = await akxesa.createSubscription({
  userId: "auth0|123456",
  planId: 1,
  duration: 0
});

console.log("TX Hash:", tx.hash);

const receipt = await tx.wait();

console.log("Block:", receipt.blockNumber);
```

## Extend Subscription

```ts
await akxesa.extendSubscription({
  userId: "auth0|123456",
  extraDuration: 3600
});
```

## Cancel Subscription

```ts
await akxesa.cancelSubscription({
  userId: "auth0|123456"
});
```

## Check Access

```ts
const access = await akxesa.getAccess("auth0|123456");

console.log(access);
```
### Response

```ts
{
  hasAccess: true,
  activePlanId: 1,
  expiration: 1712345678,
  isPrimary: true
}
```

## Authorize Secondary Account

```ts
await akxesa.authorizeAccount({
  userId: "auth0|owner",
  secondaryId: "auth0|secondary"
});
```

## Revoke Account

```ts
await akxesa.revokeAccount({
  userId: "auth0|owner",
  secondaryId: "auth0|secondary"
});
```

## Change Plan

```ts
await akxesa.changePlan({
  userId: "auth0|123456",
  newPlanId: 2
});
```

## Read Methods

```ts
await akxesa.hasSubscription("auth0|123456");
await akxesa.isActive("auth0|123456");
await akxesa.getSecondaryAccounts("auth0|123456");
```

## License

MIT
