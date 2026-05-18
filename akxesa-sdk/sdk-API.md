# Akxesa SDK API

## Purpose

Backend-focused TypeScript SDK for Node.js applications using the Akxesa Subscription Manager.

# Identity Resolution


| Input Type | Example | Behavior |
|------------|---------|----------|
| EVM Address | `0x742d35Cc6634C0532925a3b844Bc454e4438f44e` | Used directly |
| External Auth ID | `auth0\|123456` | Deterministically mapped to H160 address |


# Constructor

| Parameter | Type | Required | Description |
|------------|------|----------|-------------|
| rpcUrl | `string` | Yes | RPC endpoint |
| managerAddress | `string` | Yes | SubscriptionManager contract address |
| privateKey | `string` | No | Issuer private key for write operations |


# State-Changing Methods

All write methods return an ethers `TransactionResponse`.

| Method | Inputs | Returns | Permissions | Description |
|--------|--------|---------|-------------|-------------|
| createSubscription | `userId`, `planId`, `duration?` | `TransactionResponse` | Issuer only | Creates a subscription |
| extendSubscription | `userId`, `extraDuration` | `TransactionResponse` | Issuer only | Extends a subscription |
| cancelSubscription | `userId` | `TransactionResponse` | Issuer only | Cancels an active subscription |
| authorizeAccount | `userId`, `secondaryId` | `TransactionResponse` | Issuer only | Authorizes a secondary account |
| revokeAccount | `userId`, `secondaryId` | `TransactionResponse` | Issuer only | Revokes a secondary account |
| changeIssuer | `newIssuer` | `TransactionResponse` | Issuer only | Updates contract issuer |
| changePlan | `userId`, `newPlanId` | `TransactionResponse` | Issuer only | Changes subscription plan |


# Read-Only Methods

| Method | Inputs | Returns | Description |
|--------|--------|---------|-------------|
| getAccess | `id` | `AccessData` | Returns access information |
| getSecondaryAccounts | `userId` | `string[]` | Returns secondary accounts |
| hasFreeSlot | `userId` | `boolean` | Returns whether another account can be added |
| hasSubscription | `userId` | `boolean` | Returns whether subscription exists |
| isActive | `userId` | `boolean` | Returns whether subscription is active |


# AccessData

Returned by `getAccess()`.

| Property | Type | Description |
|----------|------|-------------|
| hasAccess | `boolean` | Whether access is valid |
| activePlanId | `bigint` | Active plan identifier |
| expiration | `bigint` | Expiration timestamp |
| isPrimary | `boolean` | Whether account is primary owner |


# Getter Methods

| Method | Inputs | Returns | Description |
|--------|--------|---------|-------------|
| issuer | - | `string` | Current issuer address |
| defaultDuration | - | `bigint` | Default subscription duration |
| maxSecondaryAccounts | - | `bigint` | Maximum secondary accounts |
| maxModifications | - | `bigint` | Maximum revocations allowed |
| maxSubscriptions | - | `bigint` | Maximum subscriptions allowed |
| maxDuration | - | `bigint` | Maximum subscription duration |
| totalSubscriptions | - | `bigint` | Total subscriptions created |
| expiresAt | `userId` | `bigint` | Subscription expiration |
| planId | `userId` | `bigint` | Active plan ID |
| modificationCount | `userId` | `bigint` | Used modification count |
| linkedToOwner | `secondaryId` | `string` | Linked owner address |


