## Error Reference

This document lists all errors thrown by **Factory** and **Manager** contracts, along with their meaning.  

Use this as a reference for API integration and frontend error handling.


## Factory Errors

| Error | Meaning |
|-------|---------|
| `Invalid issuer` | Provided issuer address is zero. |
| `Invalid defaultDuration` | `defaultDuration` must be greater than 0 and not exceed the maximum allowed duration (10 years). |
| `Invalid maxAccounts` | `maxSecondaryAccounts` exceeds the maximum allowed (5). |
| `Invalid maxModifications` | `maxModifications` exceeds the maximum allowed (20). |
| `Invalid secondary account config` | Secondary accounts are disabled but modifications are not set to zero. |


## Manager Errors

| Error | Meaning |
|-------|---------|
| `NotIssuer` | Caller is not the issuer. |
| `InvalidAddress` | Provided address is zero. |
| `InvalidSubscriptions` | Invalid subscription configuration (e.g. maxSubscriptions = 0). |
| `NotSubscribed` | The address does not have a subscription. |
| `SubscriptionExpired` | The subscription has expired. |
| `MaxAccountsReached` | Maximum number of secondary accounts reached. |
| `MaxModificationsReached` | Maximum number of allowed modifications reached. |
| `AlreadyAuthorized` | Account is already linked as secondary. |
| `NotAuthorized` | Account is not authorized as a secondary account. |
| `NotAccountOwner` | The account is not linked to the provided owner. |
| `MaxSubscriptionsReached` | Maximum subscriptions per manager reached. |
| `AlreadySubscribed` | Owner already has a subscription. |
| `InvalidDuration` | Duration is zero where not allowed (constructor). |
| `DurationTooLong` | Duration exceeds the maximum allowed duration. |
| `OwnerCannotBeSecondary` | Owner account cannot be added as secondary. |
| `SamePlan` | New plan is the same as the current plan. |
