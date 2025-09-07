import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { buildCreateAssetCall, submitTransactions, NETWORKS } from '@sdk/index';

export default function AssetsPage() {
  const { address, isConnected, peraWallet } = useWallet();
  const [appId, setAppId] = useState('');
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [total, setTotal] = useState('');
  const [decimals, setDecimals] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [txId, setTxId] = useState('');
  const [error, setError] = useState('');

  const handleCreateAsset = async () => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    if (!appId || !name || !unit || !total) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setTxId('');

    try {
      // Build transaction
      const txnGroup = await buildCreateAssetCall(
        NETWORKS.TESTNET,
        address,
        parseInt(appId),
        name,
        unit,
        parseInt(total),
        parseInt(decimals)
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
      <h1 className="text-2xl font-bold mb-6">Create Asset</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">App ID *</label>
          <input
            type="number"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter app ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Asset Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter asset name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Unit Name *</label>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter unit name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Total Supply *</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter total supply"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Decimals</label>
          <input
            type="number"
            value={decimals}
            onChange={(e) => setDecimals(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter decimals (default: 0)"
          />
        </div>

        <button
          onClick={handleCreateAsset}
          disabled={!isConnected || isLoading}
          className="w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Creating...' : 'Create Asset'}
        </button>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {txId && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p className="font-medium">Asset created successfully!</p>
            <p className="text-sm">TX ID: {txId}</p>
          </div>
        )}
      </div>
    </div>
  );
}
