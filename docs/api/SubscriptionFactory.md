## SubscriptionManagerFactory API

**Purpose:**  
Deploys and configures independent SubscriptionManager instances.

### 1. Core Functions (State-Changing)

| Function | Inputs | Outputs | Permissions | Description |
|---------|--------|---------|-------------|-------------|
| createSubscriptionManager | `address issuer`, `uint256 defaultDuration`, `uint256 maxSecondaryAccounts`, `uint256 maxModifications` | `address managerAddress` | Anyone | Deploys a new `SubscriptionManager` with the given configuration. Enforces system limits. Emits `ManagerCreated`. |

### 2. Read-Only Functions (Explicit)

| Function | Inputs | Outputs | Permissions | Description |
|---------|--------|---------|-------------|-------------|
| totalManagers | — | `uint256` | Anyone | Returns the total number of `SubscriptionManager` contracts created. |
| getManager | `uint256 index` | `address manager`, `address issuer` | Anyone | Returns manager address and issuer by index. |

### 3. Auto-Generated Getters (Public State Variables)

| Function | Inputs | Outputs | Permissions | Description |
|---------|--------|---------|-------------|-------------|
| MAX_DEFAULT_DURATION | — | `uint256` | Anyone | Maximum allowed default subscription duration (system limit). |
| MAX_SECUNDARY_ACCOUNTS | — | `uint256` | Anyone | Maximum allowed secondary accounts per subscription (system limit). |
| MAX_MODIFICATIONS | — | `uint256` | Anyone | Maximum allowed revocations per subscription (system limit). |
| MAX_SUBSCRIPTIONS | — | `uint256` | Anyone | Maximum allowed subscriptions per manager (system limit). |
| managers | `uint256 index` | `address manager`, `address issuer` | Anyone | Returns manager info stored at the given index. |

### 4. Events

| Event | Parameters | Description |
|------|-----------|-------------|
| ManagerCreated | `address manager`, `address issuer` | Emitted when a new `SubscriptionManager` is deployed. |
