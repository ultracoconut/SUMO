# Creates a Stripe customer

Author: @Ultracoconut  
License: MIT  
Note: This is example/demo code. It may contain bugs and is not production-ready. Use at your own risk
 
## Prerequisites:
- sumo_address must already exist (created by auth0-sumo-adapter)
- auth0_user_id must be available
  
```js
async function createStripeCustomer({
  auth0UserId,
  sumoAddress,
  email,
}) {
  // Deterministic idempotency key (one customer per user)
  const idempotencyKey = `create-customer-${auth0UserId}`;

  return stripe.customers.create(
    {
      email, // Used only for receipts / UX
      metadata: {
        auth0_user_id: auth0UserId,
        sumo_address: sumoAddress,
      },
    },
    {
      idempotencyKey,
    }
  );
}
```
