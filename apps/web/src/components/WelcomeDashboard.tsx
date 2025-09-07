import { Link } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';

export default function WelcomeDashboard() {
  const { address, isConnected } = useWallet();

  if (!isConnected) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Welcome to soundChain! 🎵</h2>
          <p className="text-blue-600 mb-4">
            Connect your Pera Wallet to start using the decentralized music marketplace.
          </p>
          <div className="text-sm text-blue-500">
            👆 Click "Connect Wallet" in the top-right corner to get started
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-green-800 mb-2">Welcome back! 🎉</h2>
        <p className="text-green-600 mb-4">
          Wallet connected: <span className="font-mono text-sm">{address?.slice(0, 8)}...{address?.slice(-6)}</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Link
            to="/royalty"
            className="bg-white border border-green-300 rounded p-3 hover:bg-green-100 transition-colors"
          >
            <div className="text-green-600 text-lg mb-1">💰</div>
            <div className="font-semibold text-sm">Buy Songs</div>
            <div className="text-xs text-gray-600">With royalty splits</div>
          </Link>
          <Link
            to="/assets"
            className="bg-white border border-green-300 rounded p-3 hover:bg-green-100 transition-colors"
          >
            <div className="text-green-600 text-lg mb-1">🎨</div>
            <div className="font-semibold text-sm">Create Assets</div>
            <div className="text-xs text-gray-600">Mint music NFTs</div>
          </Link>
          <Link
            to="/identity"
            className="bg-white border border-green-300 rounded p-3 hover:bg-green-100 transition-colors"
          >
            <div className="text-green-600 text-lg mb-1">🆔</div>
            <div className="font-semibold text-sm">Register ID</div>
            <div className="text-xs text-gray-600">Store your DID</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
