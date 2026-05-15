# Plan Map

Author: @Ultracoconut  
License: MIT  
Note: This is example/demo code. It may contain bugs and is not production-ready. Use at your own risk

## Overview
Maps Stripe price / plan identifiers to on-chain subscription manager parameters.  
This map acts as the single source of truth between Stripe billing and the Akxesa manager smart contract.

## Prerequisites
- `planId` must match `uint256` expected by the manager contract
- duration is expressed in seconds

```js
const PLAN_MAP = {
  // ===== Monthly plans =====
  "price_basic_monthly": {
    planId: 1,
    duration: 30 * 24 * 60 * 60, // 30 days
  },

  "price_pro_monthly": {
    planId: 2,
    duration: 30 * 24 * 60 * 60,
  },

  // ===== Yearly plans =====
  "price_basic_yearly": {
    planId: 3,
    duration: 365 * 24 * 60 * 60, // 1 year
  },

  "price_pro_yearly": {
    planId: 4,
    duration: 365 * 24 * 60 * 60,
  },
};


// Resolve a Stripe price ID to Akxesa subscription parameters
function resolvePlan(stripePriceId) {
  const plan = PLAN_MAP[stripePriceId];

  if (!plan) {
    throw new Error(`Unknown Stripe price ID: ${stripePriceId}`);
  }

  return plan;
}

module.exports = {
  PLAN_MAP,
  resolvePlan,
};

```
