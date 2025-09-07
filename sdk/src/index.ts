/**
 * soundChain SDK - TypeScript utilities for Algorand music marketplace
 * Provides functions to build transaction groups for royalty splits, ASA creation, and DID registry
 */

import algosdk from 'algosdk';

/**
 * Network configuration for Algorand connections
 */
export interface Network {
  algodUrl: string;
  algodToken?: string;
}

/**
 * Default network configurations
 */
export const NETWORKS = {
  TESTNET: {
    algodUrl: 'https://testnet-api.algonode.cloud',
    algodToken: ''
  },
  MAINNET: {
    algodUrl: 'https://mainnet-api.algonode.cloud',
    algodToken: ''
  },
  LOCALNET: {
    algodUrl: 'http://localhost:4001',
    algodToken: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  }
} as const;

/**
 * Common constants
 */
export const CONSTANTS = {
  MIN_TXN_FEE: 1000,
  ALGO_DECIMALS: 6
} as const;

/**
 * Convert Algos to microAlgos
 */
export function algosToMicroalgos(algos: number): number {
  return Math.floor(algos * Math.pow(10, CONSTANTS.ALGO_DECIMALS));
}

/**
 * Get Algorand client for network
 */
export function getAlgodClient(network: Network): algosdk.Algodv2 {
  return new algosdk.Algodv2(network.algodToken || '', network.algodUrl, '');
}

/**
 * Build grouped transaction for royalty purchase
 * Creates: Payment(to=appAddress, amount=priceMicro) + AppCall(buy, priceMicro)
 */
export async function buildRoyaltyBuy(
  network: Network,
  from: string,
  appId: number,
  appAddress: string,
  priceMicro: number
): Promise<algosdk.Transaction[]> {
  const algod = getAlgodClient(network);
  const params = await algod.getTransactionParams().do();

  // Payment transaction to app address
  const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from,
    to: appAddress,
    amount: priceMicro,
    suggestedParams: params
  });

  // App call transaction with buy method
  const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
    from,
    appIndex: appId,
    appArgs: [
      new Uint8Array(Buffer.from('buy')),
      algosdk.encodeUint64(priceMicro)
    ],
    suggestedParams: params
  });

  // Group transactions
  const txnGroup = [paymentTxn, appCallTxn];
  algosdk.assignGroupID(txnGroup);

  return txnGroup;
}

/**
 * Build transaction to create asset via ASA Factory app
 */
export async function buildCreateAssetCall(
  network: Network,
  from: string,
  appId: number,
  name: string,
  unit: string,
  total: number,
  decimals: number = 0
): Promise<algosdk.Transaction[]> {
  const algod = getAlgodClient(network);
  const params = await algod.getTransactionParams().do();

  const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
    from,
    appIndex: appId,
    appArgs: [
      new Uint8Array(Buffer.from('create_asset')),
      new Uint8Array(Buffer.from(name)),
      new Uint8Array(Buffer.from(unit)),
      algosdk.encodeUint64(total),
      algosdk.encodeUint64(decimals)
    ],
    suggestedParams: params
  });

  return [appCallTxn];
}

/**
 * Build transaction to register DID in identity registry
 */
export async function buildRegisterDidCall(
  network: Network,
  from: string,
  appId: number,
  did: string
): Promise<algosdk.Transaction[]> {
  const algod = getAlgodClient(network);
  const params = await algod.getTransactionParams().do();

  const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
    from,
    appIndex: appId,
    appArgs: [
      new Uint8Array(Buffer.from('register_did')),
      new Uint8Array(Buffer.from(did))
    ],
    suggestedParams: params
  });

  return [appCallTxn];
}

/**
 * Build transaction to set perk (stub for future implementation)
 */
export async function buildSetPerk(
  network: Network,
  from: string,
  appId: number,
  artistId: number,
  assetId: number,
  key: string,
  valueJson: string
): Promise<algosdk.Transaction[]> {
  const algod = getAlgodClient(network);
  const params = await algod.getTransactionParams().do();

  const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
    from,
    appIndex: appId,
    appArgs: [
      new Uint8Array(Buffer.from('set_perk')),
      algosdk.encodeUint64(artistId),
      algosdk.encodeUint64(assetId),
      new Uint8Array(Buffer.from(key)),
      new Uint8Array(Buffer.from(valueJson))
    ],
    suggestedParams: params
  });

  return [appCallTxn];
}

/**
 * Build transaction to redeem perk (stub for future implementation)
 */
export async function buildRedeemPerk(
  network: Network,
  from: string,
  appId: number,
  artistId: number,
  assetId: number,
  key: string
): Promise<algosdk.Transaction[]> {
  const algod = getAlgodClient(network);
  const params = await algod.getTransactionParams().do();

  const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
    from,
    appIndex: appId,
    appArgs: [
      new Uint8Array(Buffer.from('redeem_perk')),
      algosdk.encodeUint64(artistId),
      algosdk.encodeUint64(assetId),
      new Uint8Array(Buffer.from(key))
    ],
    suggestedParams: params
  });

  return [appCallTxn];
}

/**
 * Submit signed transactions to network
 */
export async function submitTransactions(
  network: Network,
  signedTxns: Uint8Array[]
): Promise<{ txId: string }> {
  const algod = getAlgodClient(network);
  const { txId } = await algod.sendRawTransaction(signedTxns).do();
  await algosdk.waitForConfirmation(algod, txId, 4);
  return { txId };
}
