# SUMO Smart Contracts API Reference

## Reference guide for developers integrating or interacting with SUMO smart contracts.

### 1. SubscriptionManagerFactory

Purpose:  
Deploys and configures independent SubscriptionManager instances.

| Function | Inputs | Outputs | Permissions | Description |
|----------|--------|---------|-------------|-------------|
| createSubscriptionManager | address issuer, uint256 defaultDuration, uint256 maxAccounts, uint256 maxModifications | address managerAddress | Anyone | Deploys a new SubscriptionManager. Emits ManagerCreated. defaultDuration is expressed in seconds. Limits are enforced at creation time. |
| totalManagers | — | uint256 | Anyone | Returns the total number of managers created by the factory. |
| getManager | uint256 index | address manager, address issuer | Anyone | Returns manager address and issuer at the given index. |


### 2. SubscriptionManager

Purpose:  
Manages subscriptions, account authorization, plans, and access verification for a single SaaS product.

| Function | Inputs | Outputs | Permissions | Description |
|----------|--------|---------|-------------|-------------|
| createSubscription | address owner, uint256 planId, uint256 duration | — | Issuer only | Creates a new subscription for the owner with the specified plan and duration. Owner is automatically authorized. Emits SubscriptionCreated. |
| extendSubscription | address owner, uint256 extraDuration | — | Issuer only | Extends an existing subscription by extraDuration (seconds). Emits SubscriptionExtended. |
| authorizeAccount | address owner, address account | — | Issuer only | Authorizes a new account under the given subscription. Updates authorizedCount and modificationCount. Emits AccountAuthorized. |
| revokeAccount | address owner, address account | — | Issuer only | Revokes access for a previously authorized account. Updates authorizedCount and modificationCount. Emits AccountRevoked. |
| changeIssuer | address newIssuer | — | Issuer only | Changes the issuer of this SubscriptionManager. Emits nothing. |
| getAccess | address account | hasAccess: bool, planId: uint256, expiresAt: uint256, isOwner: bool | Anyone | Returns the subscription access details for the given account. Read-only, no gas required. |
| totalSubscriptions | — | uint256 | Anyone | Returns the total number of subscriptions created in the manager.


### 3. Events
| Event | Parameters | Description |
|-------|------------|-------------|
| ManagerCreated | address managerAddress, address issuer | Emitted by the Factory when a new SubscriptionManager is deployed. |
| SubscriptionCreated | address owner, uint256 planId, uint256 expiresAt | Emitted when a new subscription is created. |
| SubscriptionExtended | address owner, uint256 newExpiresAt | Emitted when a subscription is extended. |
| AccountAuthorized | address owner, address account | Emitted when a new account is authorized under a subscription. |
| AccountRevoked | address owner, address account | Emitted when an authorized account is revoked. |
IssuerChanged | address newIssuer | Emitted when the issuer of a SubscriptionManager is changed. |
