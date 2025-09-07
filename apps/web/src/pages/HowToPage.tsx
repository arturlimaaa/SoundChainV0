import { Link } from 'react-router-dom';
import WelcomeDashboard from '../components/WelcomeDashboard';

export default function HowToPage() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">How to Use soundChain</h1>

      <WelcomeDashboard />

      <div className="space-y-8">
        {/* Getting Started */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">🚀 Getting Started</h2>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
            <p className="text-blue-800">
              <strong>Welcome to soundChain!</strong> A decentralized music marketplace where artists can sell songs with automatic royalty splits, create membership tokens, and manage fan perks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Step 1: Install Pera Wallet</h3>
              <p className="text-sm text-gray-600">Download Pera Wallet from your app store or install the browser extension.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Step 2: Connect Your Wallet</h3>
              <p className="text-sm text-gray-600">Click "Connect Wallet" in the top-right corner and approve the connection.</p>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">🎵 Features Overview</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-green-600 mb-2">💰 Royalty Purchase</h3>
              <p className="text-sm text-gray-600">Buy songs with automatic royalty splits to all contributors. Payments are instant and trustless.</p>
              <Link to="/royalty" className="text-primary-500 text-sm hover:underline">Try it →</Link>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-blue-600 mb-2">🎨 Create Assets</h3>
              <p className="text-sm text-gray-600">Mint new music assets (NFTs, tokens) with custom properties and metadata.</p>
              <Link to="/assets" className="text-primary-500 text-sm hover:underline">Try it →</Link>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-purple-600 mb-2">🆔 Identity Registry</h3>
              <p className="text-sm text-gray-600">Register your decentralized identity (DID) on the Algorand blockchain.</p>
              <Link to="/identity" className="text-primary-500 text-sm hover:underline">Try it →</Link>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-yellow-600 mb-2">🎖️ Membership NFTs</h3>
              <p className="text-sm text-gray-600">Mint tiered membership tokens (Bronze, Silver, Gold) for exclusive access.</p>
              <Link to="/membership" className="text-primary-500 text-sm hover:underline">View →</Link>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-red-600 mb-2">🎁 Fan Perks</h3>
              <p className="text-sm text-gray-600">Create and redeem programmable perks for token holders.</p>
              <Link to="/perks" className="text-primary-500 text-sm hover:underline">View →</Link>
            </div>
          </div>
        </section>

        {/* Step-by-Step Guides */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">📋 Step-by-Step Guides</h2>

          {/* Royalty Purchase Guide */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-green-600">💰 How to Buy Songs with Royalty Splits</h3>
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <ol className="space-y-2 text-sm">
                <li><strong>1.</strong> Go to the <Link to="/royalty" className="text-primary-500 hover:underline">Royalty page</Link></li>
                <li><strong>2.</strong> Enter the <strong>App ID</strong> (provided by the artist)</li>
                <li><strong>3.</strong> Enter the <strong>App Address</strong> (smart contract address)</li>
                <li><strong>4.</strong> Set your purchase <strong>Price in ALGO</strong></li>
                <li><strong>5.</strong> Click <strong>"Buy & Split"</strong></li>
                <li><strong>6.</strong> Approve the transaction in Pera Wallet</li>
                <li><strong>7.</strong> Wait for confirmation and note the Transaction ID</li>
              </ol>
              <div className="mt-3 p-3 bg-yellow-100 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>💡 Tip:</strong> The payment automatically splits between all song contributors based on pre-configured percentages.
                </p>
              </div>
            </div>
          </div>

          {/* Asset Creation Guide */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">🎨 How to Create Music Assets</h3>
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <ol className="space-y-2 text-sm">
                <li><strong>1.</strong> Go to the <Link to="/assets" className="text-primary-500 hover:underline">Assets page</Link></li>
                <li><strong>2.</strong> Enter the <strong>App ID</strong> for the ASA Factory contract</li>
                <li><strong>3.</strong> Fill in asset details:
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• <strong>Asset Name:</strong> Full name (e.g., "Midnight Dreams Song")</li>
                    <li>• <strong>Unit Name:</strong> Short code (e.g., "MDRMS")</li>
                    <li>• <strong>Total Supply:</strong> Number of tokens to create</li>
                    <li>• <strong>Decimals:</strong> Usually 0 for NFTs, 6 for fungible tokens</li>
                  </ul>
                </li>
                <li><strong>4.</strong> Click <strong>"Create Asset"</strong></li>
                <li><strong>5.</strong> Approve the transaction in Pera Wallet</li>
                <li><strong>6.</strong> Save the Asset ID from the confirmation</li>
              </ol>
            </div>
          </div>

          {/* Identity Registration Guide */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-purple-600">🆔 How to Register Your Identity</h3>
            <div className="bg-purple-50 border border-purple-200 rounded p-4">
              <ol className="space-y-2 text-sm">
                <li><strong>1.</strong> Go to the <Link to="/identity" className="text-primary-500 hover:underline">Identity page</Link></li>
                <li><strong>2.</strong> Enter the <strong>App ID</strong> for the Identity Registry contract</li>
                <li><strong>3.</strong> Enter your <strong>DID</strong> (Decentralized Identifier):
                  <div className="mt-2 p-2 bg-gray-100 rounded text-xs font-mono">
                    Example: did:algo:testnet:ABC123DEF456...
                  </div>
                </li>
                <li><strong>4.</strong> Click <strong>"Register DID"</strong></li>
                <li><strong>5.</strong> Approve the transaction in Pera Wallet</li>
                <li><strong>6.</strong> Your identity is now registered on-chain!</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">⚠️ Important Notes</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">🏗️ Smart Contracts Required</h3>
              <p className="text-sm text-yellow-700">
                To use most features, smart contracts must be deployed first. You'll need valid App IDs from deployed contracts.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <h3 className="font-semibold text-blue-800 mb-2">🌐 TestNet vs MainNet</h3>
              <p className="text-sm text-blue-700">
                This app is configured for Algorand TestNet by default. Use TestNet ALGO for testing (free from faucets).
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded p-4">
              <h3 className="font-semibold text-red-800 mb-2">💸 Transaction Fees</h3>
              <p className="text-sm text-red-700">
                All transactions require a small fee (0.001 ALGO minimum). Make sure you have sufficient balance.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h3 className="font-semibold text-green-800 mb-2">🔒 Security</h3>
              <p className="text-sm text-green-700">
                Never share your wallet seed phrase. All transactions are signed locally in your wallet.
              </p>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">🔧 Troubleshooting</h2>

          <div className="space-y-4">
            <details className="border rounded p-4">
              <summary className="font-semibold cursor-pointer">Wallet won't connect</summary>
              <div className="mt-2 text-sm text-gray-600">
                <ul className="list-disc ml-4 space-y-1">
                  <li>Make sure Pera Wallet is installed and updated</li>
                  <li>Try refreshing the page</li>
                  <li>Check if your wallet has TestNet enabled</li>
                  <li>Clear browser cache if issues persist</li>
                </ul>
              </div>
            </details>

            <details className="border rounded p-4">
              <summary className="font-semibold cursor-pointer">Transaction fails</summary>
              <div className="mt-2 text-sm text-gray-600">
                <ul className="list-disc ml-4 space-y-1">
                  <li>Check if you have enough ALGO for fees</li>
                  <li>Verify the App ID is correct and contract is deployed</li>
                  <li>Make sure you're on the right network (TestNet/MainNet)</li>
                  <li>Try reducing transaction amount</li>
                </ul>
              </div>
            </details>

            <details className="border rounded p-4">
              <summary className="font-semibold cursor-pointer">"Contract not found" error</summary>
              <div className="mt-2 text-sm text-gray-600">
                <ul className="list-disc ml-4 space-y-1">
                  <li>The smart contract needs to be deployed first</li>
                  <li>Ask the artist/admin for the correct App ID</li>
                  <li>Verify you're on the same network as the contract</li>
                </ul>
              </div>
            </details>
          </div>
        </section>

        {/* Get Help */}
        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">💬 Need Help?</h2>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-semibold mb-1">Documentation</h3>
              <p className="text-sm text-gray-600">Check the README.md for technical details</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🐛</div>
              <h3 className="font-semibold mb-1">Report Issues</h3>
              <p className="text-sm text-gray-600">Found a bug? Report it on GitHub</p>
            </div>
            <div>
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-semibold mb-1">Feature Ideas</h3>
              <p className="text-sm text-gray-600">Suggest new features for the platform</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
