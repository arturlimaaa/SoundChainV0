import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { buildRoyaltyBuy, submitTransactions, NETWORKS } from '@sdk/index';

export default function RoyaltyPage() {
  const { address, isConnected, peraWallet } = useWallet();
  const [appId, setAppId] = useState('');
  const [appAddress, setAppAddress] = useState('');
  const [priceAlgo, setPriceAlgo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txId, setTxId] = useState('');
  const [error, setError] = useState('');

  const handleBuyRoyalty = async () => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    if (!appId || !appAddress || !priceAlgo) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setTxId('');

    try {
      const priceMicro = Math.floor(parseFloat(priceAlgo) * 1_000_000);

      // Build transaction group
      const txnGroup = await buildRoyaltyBuy(
        NETWORKS.TESTNET,
        address,
        parseInt(appId),
        appAddress,
        priceMicro
      );

      // Sign with Pera Wallet
      const signedTxns = await peraWallet.signTransaction([
        txnGroup.map(txn => ({ txn }))
      ]);

      // Submit to network
      const result = await submitTransactions(NETWORKS.TESTNET, signedTxns);
      setTxId(result.txId);
    } catch (err) {
      console.error('Transaction failed:', err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Royalty Purchase</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">App ID</label>
          <input
            type="number"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter app ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">App Address</label>
          <input
            type="text"
            value={appAddress}
            onChange={(e) => setAppAddress(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter app address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Price (ALGO)</label>
          <input
            type="number"
            step="0.001"
            value={priceAlgo}
            onChange={(e) => setPriceAlgo(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter price in ALGO"
          />
        </div>

        <button
          onClick={handleBuyRoyalty}
          disabled={!isConnected || isLoading}
          className="w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Processing...' : 'Buy & Split'}
        </button>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {txId && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p className="font-medium">Transaction successful!</p>
            <p className="text-sm">TX ID: {txId}</p>
          </div>
        )}
      </div>
    </div>
  );
}
