# Akxesa Demo

This demo showcases the full Akxesa subscription lifecycle using a real SubscriptionManager and the official SDK.

It simulates a backend interacting with on-chain subscription state.


## ⚡ Prerequisites

- Node.js 18+
- npm
- Git


## 1. Clone the repository

```bash
git clone https://github.com/ultracoconut/akxesa.git
cd akxesa/akxesa-sdk
```

## 2. Install dependencies

```bash
npm install
```

Install additional tooling required for local environment:

```bash
npm install dotenv
```

## 3. Build the SDK

```bash
npm run build
```

## 4. Configure environment variables

Move into the demo folder:

```bash
cd demo
```

Create your local environment file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
MANAGER_ADDRESS=YourManagerAddress
PRIVATE_KEY=YourIssuerPrivateKey
```

## 5. Run the demo

```bash
node sdk-demo.js
```

## 📌 Important

This demo is intended for development and testing purposes only.

It requires a valid SubscriptionManager deployed via the Akxesa app:

👉 https://www.akxesa.com/app
