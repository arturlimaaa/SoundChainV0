export default function PerksPage() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Perks</h1>

      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <h2 className="font-semibold text-blue-800">Coming Soon</h2>
          <p className="text-blue-600 text-sm">
            Programmable perks will be available once the smart contracts are deployed.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Example Perks:</h3>
          <div className="space-y-2 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">Early Access</div>
              <div className="text-gray-600">Get early access to new releases</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">Exclusive Content</div>
              <div className="text-gray-600">Access to exclusive tracks and demos</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">Meet & Greet</div>
              <div className="text-gray-600">Virtual meet and greet sessions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
