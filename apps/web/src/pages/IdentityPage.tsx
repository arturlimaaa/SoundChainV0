import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { buildRegisterDidCall, submitTransactions, NETWORKS } from '@sdk/index';

export default function IdentityPage() {
  const { address, isConnected, peraWallet } = useWallet();
  const [appId, setAppId] = useState('');
  const [did, setDid] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txId, setTxId] = useState('');
  const [error, setError] = useState('');

  const handleRegisterDid = async () => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    if (!appId || !did) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setTxId('');

    try {
      // Build transaction
      const txnGroup = await buildRegisterDidCall(
        NETWORKS.TESTNET,
        address,
        parseInt(appId),
        did
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
      <h1 className="text-2xl font-bold mb-6">Register Identity</h1>

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
          <label className="block text-sm font-medium mb-2">DID (Decentralized ID)</label>
          <input
            type="text"
            value={did}
            onChange={(e) => setDid(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your DID"
          />
          <p className="text-sm text-gray-500 mt-1">
            Example: did:example:123456
          </p>
        </div>

        <button
          onClick={handleRegisterDid}
          disabled={!isConnected || isLoading}
          className="w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Registering...' : 'Register DID'}
        </button>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {txId && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p className="font-medium">DID registered successfully!</p>
            <p className="text-sm">TX ID: {txId}</p>
          </div>
        )}
      </div>
    </div>
  );
}
