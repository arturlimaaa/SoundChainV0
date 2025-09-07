import { Routes, Route } from 'react-router-dom';
import { WalletProvider } from './hooks/useWallet';
import Navigation from './components/Navigation';
import HowToPage from './pages/HowToPage';
import RoyaltyPage from './pages/RoyaltyPage';
import AssetsPage from './pages/AssetsPage';
import IdentityPage from './pages/IdentityPage';
import MembershipPage from './pages/MembershipPage';
import PerksPage from './pages/PerksPage';

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HowToPage />} />
            <Route path="/how-to" element={<HowToPage />} />
            <Route path="/royalty" element={<RoyaltyPage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/identity" element={<IdentityPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/perks" element={<PerksPage />} />
          </Routes>
        </main>
      </div>
    </WalletProvider>
  );
}

export default App;
