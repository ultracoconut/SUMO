// src/akxesa.ts

import { ethers } from "ethers";
import ManagerABI from "./abi/manager.js";

import { deriveAddress } from "./adapter.js";

export interface AkxesaConfig {
  rpcUrl: string;
  managerAddress: string;
  privateKey?: string;
}

export interface CreateSubscriptionParams {
  userId: string;
  planId: number;
  duration?: number;
}

export interface ExtendSubscriptionParams {
  userId: string;
  extraDuration: number;
}

export interface AuthorizeAccountParams {
  userId: string;
  account: string;
}

export interface RevokeAccountParams {
  userId: string;
  account: string;
}

export interface ChangePlanParams {
  userId: string;
  newPlanId: number;
}

export class Akxesa {
  private provider: ethers.JsonRpcProvider;
  private signer?: ethers.Wallet;
  private manager: ethers.Contract;

  constructor(config: AkxesaConfig) {
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);

    if (config.privateKey) {
      this.signer = new ethers.Wallet(
        config.privateKey,
        this.provider
      );
    }

    this.manager = new ethers.Contract(
      config.managerAddress,
      ManagerABI,
      this.signer || this.provider
    );
  }

  // --------------------------------------------------
  // Identity Resolution
  // --------------------------------------------------

  private resolveAddress(Id: string): string {
    if (typeof Id !== "string" || Id.trim() === "") {
     throw new Error("Invalid identity: must be non-empty string");
}

    // Direct EVM address passthrough
    if (Id.startsWith("0x")) {
      return ethers.getAddress(Id);
    }

    // Deterministic derived address
    return deriveAddress(Id);
  }

  // --------------------------------------------------
  // Write Methods
  // --------------------------------------------------

  async createSubscription({
    userId,
    planId,
    duration = 0
  }: CreateSubscriptionParams) {
    const owner = this.resolveAddress(userId);

    const tx = await this.manager.createSubscription(
      owner,
      planId,
      duration
    );

    return tx;
  }

  async extendSubscription({
    userId,
    extraDuration
  }: ExtendSubscriptionParams) {
    const owner = this.resolveAddress(userId);

    const tx = await this.manager.extendSubscription(
      owner,
      extraDuration
    );

    return tx;
  }

  async authorizeAccount({
    userId,
    account
  }: AuthorizeAccountParams) {
    const owner = this.resolveAddress(userId);
    const secondary = this.resolveAddress(account);

    const tx = await this.manager.authorizeAccount(
      owner,
      secondary
    );

    return tx;
  }

  async revokeAccount({
    userId,
    account
  }: RevokeAccountParams) {
    const owner = this.resolveAddress(userId);
    const secondary = this.resolveAddress(account);

    const tx = await this.manager.revokeAccount(
      owner,
      secondary
    );

    return tx;
  }

  async changePlan({
    userId,
    newPlanId
  }: ChangePlanParams) {
    const owner = this.resolveAddress(userId);

    const tx = await this.manager.changePlan(
      owner,
      newPlanId
    );

    return tx;
  }

  async changeIssuer(newIssuer: string) {
    const tx = await this.manager.changeIssuer(
      ethers.getAddress(newIssuer)
    );

    return tx;
  }

  // --------------------------------------------------
  // Read Methods
  // --------------------------------------------------

  async getAccess(userId: string) {
    const account = this.resolveAddress(userId);

    const access = await this.manager.getAccess(account);

    return {
      hasAccess: access[0],
      activePlanId: access[1],
      expiration: access[2],
      isPrimary: access[3]
    };
  }

  async getSecondaryAccounts(userId: string) {
    const owner = this.resolveAddress(userId);

    return await this.manager.getSecondaryAccounts(owner);
  }

  async hasFreeSlot(userId: string) {
    const owner = this.resolveAddress(userId);

    return await this.manager.hasFreeSlot(owner);
  }

  async hasSubscription(userId: string) {
    const owner = this.resolveAddress(userId);

    return await this.manager.hasSubscription(owner);
  }

  async isActive(userId: string) {
    const owner = this.resolveAddress(userId);

    return await this.manager.isActive(owner);
  }

  // --------------------------------------------------
  // Public Getters
  // --------------------------------------------------

  async issuer() {
    return await this.manager.issuer();
  }

  async defaultDuration() {
    return await this.manager.defaultDuration();
  }

  async maxSecondaryAccounts() {
    return await this.manager.maxSecondaryAccounts();
  }

  async maxModifications() {
    return await this.manager.maxModifications();
  }

  async maxSubscriptions() {
    return await this.manager.maxSubscriptions();
  }

  async maxDuration() {
    return await this.manager.maxDuration();
  }

  async totalSubscriptions() {
    return await this.manager.totalSubscriptions();
  }

  async expiresAt(userId: string) {
    const owner = this.resolveAddress(userId);

    return await this.manager.expiresAt(owner);
  }

  async planId(userId: string) {
    const owner = this.resolveAddress(userId);

    return await this.manager.planId(owner);
  }

  async modificationCount(userId: string) {
    const owner = this.resolveAddress(userId);

    return await this.manager.modificationCount(owner);
  }

  async linkedToOwner(userId: string) {
    const account = this.resolveAddress(userId);

    return await this.manager.linkedToOwner(account);
  }
}
