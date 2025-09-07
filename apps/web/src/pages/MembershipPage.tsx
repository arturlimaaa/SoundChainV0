export default function MembershipPage() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Membership NFTs</h1>

      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <h2 className="font-semibold text-blue-800">Coming Soon</h2>
          <p className="text-blue-600 text-sm">
            Membership NFT minting will be available once the smart contracts are deployed.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Available Tiers:</h3>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-amber-100 p-2 rounded text-center">
              <div className="font-medium">Bronze</div>
              <div className="text-amber-600">Basic Access</div>
            </div>
            <div className="bg-gray-100 p-2 rounded text-center">
              <div className="font-medium">Silver</div>
              <div className="text-gray-600">Premium Access</div>
            </div>
            <div className="bg-yellow-100 p-2 rounded text-center">
              <div className="font-medium">Gold</div>
              <div className="text-yellow-600">VIP Access</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
