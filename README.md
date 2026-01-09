# SUMO - Subscription Manager On-chain

## About SUMO

**SUMO** is an on-chain subscription and licensing system for SaaS platforms.

It provides verifiable, decentralized access control using smart contracts, while remaining compatible with both Web3-native and traditional Web2 SaaS products.

SUMO is built on **Polkadot Asset Hub** and is currently being tested on **Paseo PAsset Hub (testnet)**.  

## 🎯 UX & Design Philosophy

SUMO is designed for real-world SaaS adoption, not just Web3-native users.

The system intentionally removes common blockchain UX barriers while preserving on-chain guarantees.  
To enable a broader reach and a better user experience:

- End users do **not** need to hold tokens
- End users do **not** need to sign transactions
- No gas payments are required from users

All on-chain operations are executed by the SaaS service itself, which acts as the issuer and covers gas costs when interacting with the smart contracts.

Users simply connect a wallet to verify access.

**This model preserves:**
- On-chain verifiability
- Transparency and auditability
- Deterministic access control

**While removing:**
- Wallet friction
- Gas management
- Web3 onboarding complexity

SUMO acts as an on-chain access layer, not an intermediary.

## 🔑 Account Model

SUMO smart contracts operate exclusively on `EVM address (H160)`.

The contracts themselves only verify access rights for a given on-chain address.

Any identity model (Web3 wallets, Substrate accounts, Web2 users, custodial accounts, or external systems) can be supported by the application layer, as long as it resolves to an EVM-compatible address when interacting with the contracts.

This separation keeps SUMO contracts minimal, auditable, and chain-native, while allowing applications full flexibility over identity and UX design.  

## 🧠 High-level architecture

- Each SaaS deploys **one SubscriptionManager**, created via the Factory
- The Factory deploys managers dynamically using embedded bytecode
- Each manager is fully independent and immutable
- An **issuer account** (typically the SaaS backend or operator) controls all subscription state
- End users never sign transactions - they only connect accounts for access checks


## 🧩 Roles

### Issuer

The issuer is the authority for a given `SubscriptionManager`.

Typically:

- Backend SaaS service
- SaaS Operator wallet

The issuer can:

- Create subscriptions
- Extend subscriptions
- Authorize or revoke accounts
- Change the issuer address


### Owner

Each subscription has an `owner` account:

- Identifies the primary account of the subscription
- Automatically authorized
- **Does not sign transactions**


### Authorized account

Any blockchain account authorized under a subscription:

- Can access the service
- Cannot modify subscriptions
- Access is verified on-chain via `getAccess`


## 🏭 Subscription Manager Factory

- Deploys a brand-new `SubscriptionManager`
- Emits `ManagerCreated`
- Returns the address of the new manager
- Each manager is fully independent and owned by its issuer


## 📦 Subscription Manager

A Subscription Manager is an independent on-chain access control system.  
It manages:
- Subscription ownership
- Account authorization
- Plan assignment
- Expiration logic

Each manager operates in isolation and enforces its own limits defined at creation time.

## 🔐 Subscription Model

- Each subscription is owned by a primary account
- Additional accounts can be linked to the subscription
- All access rules are enforced on-chain
- Applications only need to perform read-only checks


## 🔢 System Limits (per manager)

| Concept                 | Meaning                                           | Configurable |
|-------------------------|--------------------------------------------------|--------------|
| Subscriptions per manager | Maximum subscriptions allowed by issuer | Limited (50,000)         |
| Accounts per subscription | Total accounts linked to a subscription (owner included) | Limited (5)         |
| Modifications           | Managed exclusively by issuer                    | Limited (20)    |
| Subscription per account | An account can belong to only one subscription  | Enforced     |

> Limits are defined at manager creation time via the Factory.


## 🚀 Basic Flow

### 1. Create SubscriptionManager (issuer)

The issuer calls the Factory:

```solidity
createSubscriptionManager(
        uint256 defaultDuration,
        uint256 maxAccounts,
        uint256 maxModifications
    )
```
Deploys a brand-new SubscriptionManager with custom limits and defaults.

defaultDuration - Default subscription duration (in seconds)

maxAccounts - Maximum accounts per subscription (owner included)

maxModifications - Maximum account add/remove operations


### 2. Create subscription (issuer)

```solidity
createSubscription(address owner, uint256 planId, uint256 duration)
```
- Creates a new subscription

- Owner is automatically authorized

- duration is expressed in seconds


### 3. Manage accounts (issuer)

```solidity
authorizeAccount(uint256 subscriptionId, address account)
revokeAccount(uint256 subscriptionId, address account)
```

All account management is performed by the issuer.

### 4. Verify access (application)

```solidity
getAccess(address account)
```

Returns:

- hasAccess - true / false

- planId - active plan

- expiresAt - expiration timestamp

- isOwner - whether the account is the owner  

  ✅ Read-only call  
  ✅ No gas  
  ✅ No wallet signature

## 📣 Events

### Factory

```solidity
ManagerCreated(address manager, address issuer)
```

### SubscriptionManager

```solidity
SubscriptionCreated(uint256 subscriptionId, address owner, uint256 planId, uint256 expiresAt)
SubscriptionExtended(uint256 subscriptionId, uint256 newExpiresAt)
AccountAuthorized(uint256 subscriptionId, address account)
AccountRevoked(uint256 subscriptionId, address account)
```

Applications can index these events to sync off-chain state.


## 🛡️ Security Model

- Only the issuer can mutate state

- No personal data stored on-chain

- Fully auditable and deterministic

- Immutable once deployed


## 🌍 Use Cases

- Web3-native SaaS subscriptions

- Software licensing

- Multi-device access control


## 🧪 Try SUMO (Testnet)

You can try **SUMO - Subscription Manager On-chain** without accessing the source code.

A **SubscriptionManagerFactory** is already deployed on-chain.  
You can create your own independent `SubscriptionManager` and test the full flow using **Remix** and **MetaMask**.


### Test environment

- **Network:** Paseo Asset Hub (EVM)
- **Environment:** Testnet
- **Wallet:** MetaMask (recommended)
- **IDE:** Remix

### How to test

#### 1. Configure MetaMask
Configure MetaMask to connect to **Paseo Asset Hub (EVM)**.  
In Metamask go to Networks and Click in Add Custom Network, fill it with this network data:

**Network Name:** Paseo PassetHub  
**Default RPC URL:** https://testnet-passet-hub-eth-rpc.polkadot.io  
**Chain ID:** 420420422  
**Currency symbol:** PAS  
**Block explorer URL:** https://passet-hub.subscan.io/

#### 2. Get test tokens
Request PAS test tokens from the Polkadot faucet using your MetaMask address:  
[Faucet](https://faucet.polkadot.io/?parachain=1111)

#### 3. Open Remix
Go to https://remix.polkadot.io/. and connect MetaMask.

#### 4 Add .abi files to your remix directory
Add `Factory.abi` and `Manager.abi` to your Remix directory

#### 5. Attach the Factory contract
In Remix, select `Factory.abi` in your directory

Select Deploy & run transactions in the left menu, use **"At Address"** and attach this contract address:  
`0xDa432efB6c6357Cb7f6146697BD57F96049cE5D8`

Now you can access the contract methods.

#### 6. Create a Subscription Manager
Call `createSubscriptionManager`, for example:

- `defaultDuration`: `600` (10 minutes)
- `maxAccounts`: `5`
- `maxModifications`: `10`


This deploys a **brand-new SubscriptionManager contract**, fully independent and owned by your issuer address.

### 7. Interact with your Manager
After creating a SubscriptionManager, copy the returned **manager contract address**.

In Remix:

1. Select `Manager.abi` in your file explorer
2. Go to **Deploy & Run Transactions**
3. Use **“At Address”** and paste the manager contract address
4. Click **At Address** to attach the contract interface

Once attached, you can:

- Create subscriptions
- Authorize or revoke accounts
- Extend subscriptions
- Query access via `getAccess(address)`

All managers are isolated and configurable at creation time.

### Need help with Remix or Polkadot?

If you are not familiar with Remix or Polkadot smart-contract environments, you can follow the official Polkadot  
[guide](https://docs.polkadot.com/develop/smart-contracts/dev-environments/remix/).


## 📜 License

Copyright © 2026 @Ultracoconut. All rights reserved.

Unauthorized copying, use, modification, distribution, or disclosure of this
software, in whole or in part, is strictly prohibited without prior written
permission from the copyright holder.
