# Webhook for SUMO

Author: @Ultracoconut  
License: MIT  
Note: This is example/demo code. It may contain bugs and is not production-ready. Use at your own risk

## Overview
This webhook syncs Stripe billing events to the SUMO manager smart contract.  
It retrieves the Stripe customer, reads the linked `sumo_address` from metadata, validates it as a proper H160 address, and executes the subscription logic on-chain.

## Prerequisites
- `sumo_address` must exist in Stripe customer metadata (created via auth0-sumo-adapter)
- `planId` and `duration` must be defined
- Ethers.js and Stripe SDK installed

```js
const { ethers } = require("ethers");

// Get the Stripe customer ID from the webhook event
const customerId = stripeEvent.data.object.customer;

// Retrieve the full customer object from Stripe
const customer = await stripe.customers.retrieve(customerId);

// Read the sumoAddress directly from Stripe customer metadata
const address = customer.metadata && customer.metadata.sumo_address;

if (!address) {
  throw new Error(
    `Stripe customer ${customerId} has no sumo_address metadata`
  );
}

// Validate H160 address format
if (!ethers.isAddress(address)) {
  throw new Error(`Invalid sumo address: ${address}`);
}

// Execute the subscription logic in the SUMO contract
await manager.createSubscription(address, planId, duration);

```
