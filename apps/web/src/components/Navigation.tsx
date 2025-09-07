import { Link } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';

export default function Navigation() {
  const { address, isConnected, connect, disconnect } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-primary-600">
              soundChain
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/how-to" className="text-gray-600 hover:text-primary-600">
                How To
              </Link>
              <Link to="/royalty" className="text-gray-600 hover:text-primary-600">
                Royalty
              </Link>
              <Link to="/assets" className="text-gray-600 hover:text-primary-600">
                Assets
              </Link>
              <Link to="/identity" className="text-gray-600 hover:text-primary-600">
                Identity
              </Link>
              <Link to="/membership" className="text-gray-600 hover:text-primary-600">
                Membership
              </Link>
              <Link to="/perks" className="text-gray-600 hover:text-primary-600">
                Perks
              </Link>
            </div>
          </div>

          <div>
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {formatAddress(address!)}
                </span>
                <button
                  onClick={disconnect}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
