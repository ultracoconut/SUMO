## Manual Interaction (Advanced)

This guide explains how to interact directly with deployed Akxesa smart contracts using Remix and MetaMask.

This document is intended for low-level testing, auditing, and development purposes.

If you simply want to create and manage a SubscriptionManager, use the Akxesa app instead:

👉 https://www.akxesa.com/app

### Overview

A `SubscriptionManagerFactory` contract is already deployed on testnet.

Using Remix, you can:

- Deploy your own independent `SubscriptionManager`
- Interact directly with contract methods
- Test subscription creation and access verification
- Inspect raw on-chain behavior

### Test environment

- **Network:** Paseo Asset Hub (EVM)
- **Environment:** Testnet
- **Wallet:** MetaMask (recommended)
- **IDE:** Remix

### Step-by-Step Manual Interaction

#### 1. Configure MetaMask
Configure MetaMask to connect to **Paseo Asset Hub (EVM)**.  
In Metamask go to Networks and Click in Add Custom Network, fill it with this network data:

**Network Name:** Paseo Asset Hub  
**Default RPC URL:** https://eth-rpc-testnet.polkadot.io/  
**Chain ID:** 420420417   
**Currency symbol:** PAS  
**Block explorer URL:** https://assethub-paseo.subscan.io/

#### 2. Get test tokens
Request PAS test tokens from the Polkadot faucet using your MetaMask address:  
[Faucet](https://faucet.polkadot.io/)

#### 3. Open Remix
Go to https://remix.polkadot.io/. and connect MetaMask.

#### 4 Add .abi files to your remix directory
Add `Factory.abi` and `Manager.abi` to your Remix directory

#### 5. Attach the Factory contract
In Remix, select `Factory.abi` in your directory

Select Deploy & run transactions in the left menu, use **"At Address"** and attach this contract (v1.2) address:  
`0xDa432efB6c6357Cb7f6146697BD57F96049cE5D8`

Now you can access the contract methods.

#### 6. Create a Subscription Manager
Call `createSubscriptionManager`, for example:

- `issuer`: `Address authorized` to operate the manager
- `defaultDuration`: `600` (10 minutes)
- `maxSecondaryAccounts`: `5`
- `maxModifications`: `10`

This deploys a **brand-new, independent SubscriptionManager contract**.  
The provided `issuer` address is **granted exclusive permission to manage subscriptions**

#### 7. Interact with your Manager
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
