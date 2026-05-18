import { Akxesa } from "@akxesa/sdk";

const akxesa = new Akxesa({
  rpcUrl: "https://eth-rpc-testnet.polkadot.io/",
  managerAddress: process.env.MANAGER_ADDRESS,
  privateKey: process.env.PRIVATE_KEY
});

// ----------------------------------
const waitEnter = () =>
  new Promise((resolve) => {
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    process.stdin.once("data", () => {
      process.stdin.pause();
      resolve();
    });
  });

const step = (i, total, title) => {
  console.log(`\n[${i}/${total}] ${title}`);
};

async function run() {
  console.log(`
========================================
WELCOME TO AKXESA SDK DEMO
========================================

Network: Paseo Hub Testnet

Press ENTER to begin...
`);

  await waitEnter();

  console.log("\nConnecting to network...\n");

  const TOTAL = 17;
  let s = 1;

  // ----------------------------------
  // MANAGER CONFIGURATION
  // ----------------------------------
  step(s++, TOTAL, "Loading manager configuration");

  const [
    issuer,
    defaultDuration,
    maxSecondaryAccounts,
    maxModifications,
    maxSubscriptions,
    maxDuration,
    totalSubscriptions
  ] = await Promise.all([
    akxesa.issuer(),
    akxesa.defaultDuration(),
    akxesa.maxSecondaryAccounts(),
    akxesa.maxModifications(),
    akxesa.maxSubscriptions(),
    akxesa.maxDuration(),
    akxesa.totalSubscriptions()
  ]);

  console.table([
  { key: "issuer", value: issuer },
  { key: "defaultDuration", value: defaultDuration.toString() },
  { key: "maxSecondaryAccounts", value: maxSecondaryAccounts.toString() },
  { key: "maxModifications", value: maxModifications.toString() },
  { key: "maxSubscriptions", value: maxSubscriptions.toString() },
  { key: "maxDuration", value: maxDuration.toString() },
  { key: "totalSubscriptions", value: totalSubscriptions.toString() }
]);

  // ----------------------------------
  // DEMO IDENTITIES
  // ----------------------------------
  step(s++, TOTAL, "Preparing demo identities");

  const owner = "auth0|00012324";
  const secondary = "auth0|00054323";

  console.log({ owner, secondary });

  // ----------------------------------
  // CREATE SUBSCRIPTION
  // ----------------------------------
  step(s++, TOTAL, "Creating subscription");

  const createTx = await akxesa.createSubscription({
    userId: owner,
    planId: 1,
    duration: 0
  });

  console.log("tx hash:", createTx.hash);
  await createTx.wait();

  // ----------------------------------
  // PRIMARY ACCESS
  // ----------------------------------
  step(s++, TOTAL, "Verifying primary access");

  const primaryAccess = await akxesa.getAccess(owner);

  console.log({
    hasAccess: primaryAccess.hasAccess,
    activePlanId: primaryAccess.activePlanId.toString(),
    expiration: primaryAccess.expiration.toString(),
    isPrimary: primaryAccess.isPrimary
  });

  // ----------------------------------
  // AUTHORIZE SECONDARY
  // ----------------------------------
  step(s++, TOTAL, "Authorizing secondary account");

  const authTx = await akxesa.authorizeAccount({
    userId: owner,
    secondaryId: secondary
  });

  console.log("tx hash:", authTx.hash);
  await authTx.wait();

  // ----------------------------------
  // SECONDARY ACCESS
  // ----------------------------------
  step(s++, TOTAL, "Checking secondary access");

  const secondaryAccess = await akxesa.getAccess(secondary);

  console.log({
    hasAccess: secondaryAccess.hasAccess,
    activePlanId: secondaryAccess.activePlanId.toString(),
    isPrimary: secondaryAccess.isPrimary
  });

  // ----------------------------------
  // SECONDARY ACCOUNTS
  // ----------------------------------
  step(s++, TOTAL, "Fetching secondary accounts");

  const secondaryAccounts = await akxesa.getSecondaryAccounts(owner);
  console.log(secondaryAccounts);

  // ----------------------------------
  // LINKED OWNER
  // ----------------------------------
  step(s++, TOTAL, "Resolving linked owner");

  const linked = await akxesa.linkedToOwner(secondary);
  console.log({ linkedOwner: linked });

  // ----------------------------------
  // REVOKE SECONDARY
  // ----------------------------------
  step(s++, TOTAL, "Revoking secondary account");

  const revokeTx = await akxesa.revokeAccount({
    userId: owner,
    secondaryId: secondary
  });

  console.log("tx hash:", revokeTx.hash);
  await revokeTx.wait();

  // ----------------------------------
  // SECONDARY ACCESS AFTER REVOKE
  // ----------------------------------
  step(s++, TOTAL, "Secondary access after revoke");

  const afterRevoke = await akxesa.getAccess(secondary);

  console.log({
    hasAccess: afterRevoke.hasAccess,
    isPrimary: afterRevoke.isPrimary
  });

  // ----------------------------------
  // EXTEND SUBSCRIPTION
  // ----------------------------------
  step(s++, TOTAL, "Extending subscription");

  const extendTx = await akxesa.extendSubscription({
    userId: owner,
    extraDuration: 600
  });

  console.log("tx hash:", extendTx.hash);
  await extendTx.wait();


  // ----------------------------------
  // GET ACCESS AFTER EXTEND
  // ----------------------------------
  step(s++, TOTAL, "Checking new expiration timestamp");

  const accessAfterExtend = await akxesa.getAccess(owner);

  console.log({
    hasAccess: accessAfterExtend.hasAccess,
    activePlanId: accessAfterExtend.activePlanId.toString(),
    expiration: accessAfterExtend.expiration.toString(),
    isPrimary: accessAfterExtend.isPrimary
  });

  // ----------------------------------
  // CHANGE PLAN
  // ----------------------------------
  step(s++, TOTAL, "Changing subscription plan");

  const planTx = await akxesa.changePlan({
    userId: owner,
    newPlanId: 2
  });

  console.log("tx hash:", planTx.hash);
  await planTx.wait();

  // ----------------------------------
  // GET PLAN AFTER CHANGE
  // ----------------------------------
  step(s++, TOTAL, "Verifying updated plan");

  const updatedPlan = await akxesa.planId(owner);

  console.log({
    planId: updatedPlan.toString()
  });

  // ----------------------------------
  // CANCEL SUBSCRIPTION
  // ----------------------------------
  step(s++, TOTAL, "Cancelling subscription");

  const cancelTx = await akxesa.cancelSubscription({
    userId: owner
  });

  console.log("tx hash:", cancelTx.hash);
  await cancelTx.wait();

  // ----------------------------------
  // FINAL ACCESS CHECK
  // ----------------------------------
  step(s++, TOTAL, "Final access verification");

  const finalAccess = await akxesa.getAccess(owner);

  console.log({
    hasAccess: finalAccess.hasAccess,
    activePlanId: finalAccess.activePlanId.toString(),
    expiration: finalAccess.expiration.toString(),
    isPrimary: finalAccess.isPrimary
  });


  // ----------------------------------
  // MANAGER TOTAL SUBSCRIPTIONS
  // ----------------------------------
  step(s++, TOTAL, "Manager total subscriptions");

  const total = await akxesa.totalSubscriptions();

  console.log({
    totalSubscriptions: total.toString()
  });


  // ----------------------------------
  // DONE
  // ----------------------------------
  console.log(`
========================================
AKXESA SDK TEST COMPLETED
========================================

All operations executed successfully.
`);
}

run().catch(console.error);
