# Akxesa SDK API

Backend-focused TypeScript SDK for interacting with Akxesa SubscriptionManager contracts.

The SDK abstracts:

- Deterministic identity resolution
- Address derivation
- Contract interaction
- Issuer signing
- Access verification

It supports both:

- Read-only clients
- Issuer-enabled clients


# Identity Resolution

The SDK accepts either raw EVM addresses or external authentication identifiers.

External identifiers are deterministically mapped into H160-compatible addresses.

| Input Type | Example | Behavior |
|------------|---------|----------|
| EVM Address | `0x742d35Cc6634C0532925a3b844Bc454e4438f44e` | Used directly |
| External Auth ID | `auth0\|123456` | Deterministically derived into an H160 address |


# Constructor

Creates a new Akxesa SDK instance.

Read-only methods work without a private key.

State-changing methods require a valid issuer private key.

| Parameter | Type | Required | Description |
|------------|------|----------|-------------|
| rpcUrl | `string` | Yes | RPC endpoint |
| managerAddress | `string` | Yes | SubscriptionManager contract address |
| privateKey | `string` | No | Issuer private key for state-changing operations |


# State-Changing Methods

All state-changing methods return an ethers `TransactionResponse`.

| Method | Parameters | Returns | Permissions | Description |
|--------|-------------|---------|-------------|-------------|
| createSubscription | `{ userId: string, planId: bigint, duration?: bigint }` | `TransactionResponse` | Issuer only | Creates a new subscription. If `duration` is `0`, the manager default duration is used. |
| extendSubscription | `{ userId: string, extraDuration: bigint }` | `TransactionResponse` | Issuer only | Extends an existing subscription. |
| cancelSubscription | `{ userId: string }` | `TransactionResponse` | Issuer only | Cancels an active subscription. |
| authorizeAccount | `{ userId: string, secondaryId: string }` | `TransactionResponse` | Issuer only | Authorizes a secondary account. |
| revokeAccount | `{ userId: string, secondaryId: string }` | `TransactionResponse` | Issuer only | Revokes a secondary account. |
| changeIssuer | `{ newIssuer: string }` | `TransactionResponse` | Issuer only | Updates the contract issuer. |
| changePlan | `{ userId: string, newPlanId: bigint }` | `TransactionResponse` | Issuer only | Changes subscription plan. |


# Read-Only Methods

## Access Verification

| Method | Parameters | Returns | Permissions | Description |
|--------|-------------|---------|-------------|-------------|
| getAccess | `id: string` | `AccessData` | Anyone | Returns access information for an owner or secondary account. |
| hasSubscription | `userId: string` | `boolean` | Anyone | Returns whether a subscription exists. |
| isActive | `userId: string` | `boolean` | Anyone | Returns whether a subscription is currently active. |


## Account Management

| Method | Parameters | Returns | Permissions | Description |
|--------|-------------|---------|-------------|-------------|
| getSecondaryAccounts | `userId: string` | `string[]` | Anyone | Returns linked secondary accounts. |
| hasFreeSlot | `userId: string` | `boolean` | Anyone | Returns whether another secondary account can be added. |


## Manager Configuration

| Method | Parameters | Returns | Permissions | Description |
|--------|-------------|---------|-------------|-------------|
| issuer | — | `string` | Anyone | Current issuer address. |
| defaultDuration | — | `bigint` | Anyone | Default subscription duration. |
| maxSecondaryAccounts | — | `bigint` | Anyone | Maximum secondary accounts per subscription. |
| maxModifications | — | `bigint` | Anyone | Maximum revocations allowed per subscription. |
| maxSubscriptions | — | `bigint` | Anyone | Maximum subscriptions allowed. |
| maxDuration | — | `bigint` | Anyone | Maximum allowed subscription duration. |
| totalSubscriptions | — | `bigint` | Anyone | Total subscriptions created. |


## Subscription State

| Method | Parameters | Returns | Permissions | Description |
|--------|-------------|---------|-------------|-------------|
| expiresAt | `userId: string` | `bigint` | Anyone | Subscription expiration timestamp. |
| planId | `userId: string` | `bigint` | Anyone | Active plan identifier. |
| modificationCount | `userId: string` | `bigint` | Anyone | Number of revocations used. |
| linkedToOwner | `secondaryId: string` | `string` | Anyone | Owner linked to a secondary account. |


# AccessData

Returned by `getAccess()`.

| Property | Type | Description |
|----------|------|-------------|
| hasAccess | `boolean` | Whether access is currently valid. |
| activePlanId | `bigint` | Active subscription plan identifier. |
| expiration | `bigint` | Expiration timestamp. |
| isPrimary | `boolean` | Whether the account is the primary subscription owner. |
