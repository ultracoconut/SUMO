# Akxesa — The source of truth for SaaS access

Akxesa lets you verify subscriptions on-chain while keeping your existing authentication systems and backend architecture.

No wallets. No signatures. No subscription databases.


## ⚡ Quickstart

### 1. Create your SubscriptionManager

Deploy and configure your manager using the Akxesa app:

👉 https://www.akxesa.com/app


### 2. Install the SDK

```bash
npm install akxesa-sdk
```

### 3. Run SDK demo 

Run the SDK demo to explore the full subscription lifecycle with a real SubscriptionManager.


## 📖 About Akxesa

Akxesa is a deterministic subscription infrastructure for SaaS platforms.

It enables verifiable access control using smart contracts while remaining fully compatible with traditional backend architectures and authentication providers such as Auth0, Firebase, Clerk, and custom systems.

Akxesa runs on Polkadot Asset Hub and currently operates on Paseo Asset Hub (testnet).


## 🎯 Design Principles

- No wallets, tokens, or user signatures
- Fully compatible with existing auth systems
- Backend-controlled operation
- Deterministic account model
- Read-only access verification

Users never interact with the blockchain directly.

## 👥 Roles

- **Issuer** → backend-controlled operator that manages subscriptions
- **Owner** → primary identity of a subscription
- **Secondary accounts** → linked accounts that inherit access from the owner

## 🌍 Use Cases

- SaaS subscription infrastructure without databases
- Licensing systems with verifiable state
- Multi-device access control (seat-based SaaS)
- Shared subscription models (team plans)


## 📦 SDK

Official SDK for interacting with Akxesa SubscriptionManager contracts.

Source code and documentation:

👉 [akxesa-sdk](akxesa-sdk/README.md)


## 📚 Documentation

👉 [Smart contracts](contracts/api)

👉 [Technical Specification](docs/technical-specification.md)


## 📜 License

Copyright © 2026 @Ultracoconut. All rights reserved.

Unauthorized copying, use, modification, distribution, or disclosure of this
software, in whole or in part, is strictly prohibited without prior written
permission from the copyright holder.
