# 🧪 soundChain Testing Guide

## ✅ **Current Status**: Both servers are running successfully!

- **Frontend**: http://localhost:3000 ✅
- **API**: http://localhost:3001 ✅

## 🚀 **How to Test Your dApp**

### 1. **Basic Functionality Test**

Open http://localhost:3000 in your browser and verify:

- [ ] Navigation menu loads with 5 pages (Royalty, Assets, Identity, Membership, Perks)
- [ ] "Connect Wallet" button appears in top-right
- [ ] All pages are accessible and load without errors

### 2. **Wallet Connection Test**

1. **Install Pera Wallet**:
   - iOS: Download from App Store
   - Android: Download from Google Play
   - Browser Extension: Install Pera Wallet browser extension

2. **Click "Connect Wallet"**:
   - Should open Pera Wallet connection dialog
   - Approve the connection
   - Wallet address should appear in navigation (6...4 format)

### 3. **API Endpoints Test**

Test the API directly:

```bash
# Health check
curl http://localhost:3001/health

# Test indexer proxy (replace with real Algorand address)
curl http://localhost:3001/indexer/holdings/7ZUECA7HFLZTXENRV24SHLU4AVPUTMTTDUFUBNBD64C73F3UHRTHAIOF6Q

# Test ownership verification
curl -X POST http://localhost:3001/verify/ownership \
  -H "Content-Type: application/json" \
  -d '{"address":"7ZUECA7HFLZTXENRV24SHLU4AVPUTMTTDUFUBNBD64C73F3UHRTHAIOF6Q","assetId":1}'

# Test IPFS pinning stub
curl -X POST http://localhost:3001/ipfs/pin \
  -H "Content-Type: application/json" \
  -d '{"data":{"title":"Test Song","artist":"Test Artist"}}'
```

### 4. **Transaction Building Test (Without Contracts)**

**Note**: Since smart contracts aren't deployed yet, you can test transaction building logic without actually submitting:

1. **Go to `/royalty`**:
   - Enter any App ID (e.g., `12345`)
   - Enter any App Address (e.g., a valid Algorand address)
   - Enter a price (e.g., `1.5`)
   - Click "Buy & Split" - it will attempt to build transactions

2. **Go to `/assets`**:
   - Enter any App ID (e.g., `12345`)
   - Enter asset details (name, unit, total, decimals)
   - Click "Create Asset" - it will attempt to build transactions

3. **Go to `/identity`**:
   - Enter any App ID (e.g., `12345`)
   - Enter a DID (e.g., `did:algo:testnet:ABC123`)
   - Click "Register DID" - it will attempt to build transactions

### 5. **Full End-to-End Test (Requires Deployed Contracts)**

To test with real smart contracts:

1. **Deploy contracts** using AlgoKit:
   ```bash
   # This is conceptual - actual deployment depends on your Beaker/PyTeal contracts
   algokit deploy
   ```

2. **Get App IDs** from deployment output

3. **Use real App IDs** in the UI forms

4. **Submit real transactions** and verify on AlgoExplorer

## 🐛 **Common Issues & Fixes**

### Frontend Issues
```bash
# If frontend won't start
cd /Users/chuckdesouza/soundchain/apps/web
npm install
npm run dev
```

### API Issues
```bash
# If API won't start
cd /Users/chuckdesouza/soundchain/services/api
npm install
npm run dev
```

### Wallet Connection Issues
- Ensure Pera Wallet is installed
- Try refreshing the page
- Check browser console for errors

### Transaction Errors
- Expected for now since contracts aren't deployed
- Should show error message: "Contract not found" or similar

## 📊 **Expected Test Results**

### ✅ **Working Now**
- Frontend loads and navigates
- API responds to all endpoints
- Wallet connection works
- Transaction building works (will fail at submission without contracts)
- Error handling shows user-friendly messages

### 🚧 **Needs Contract Deployment**
- Actual transaction submission
- Real royalty splits
- Real asset creation
- Real DID registration

## 🎯 **Next Steps for Full Testing**

1. **Deploy Smart Contracts**:
   ```bash
   # Example - adjust for your Beaker/PyTeal setup
   algokit project deploy testnet
   ```

2. **Update Frontend with Real App IDs**:
   - Copy App IDs from deployment
   - Test with real contract addresses

3. **End-to-End Testing**:
   - Connect wallet
   - Submit real transactions
   - Verify on AlgoExplorer
   - Check royalty distributions

## 🔧 **Development Commands**

```bash
# Start both servers
npm run dev:web    # Frontend (3000)
npm run dev:api    # API (3001)

# Build SDK after changes
npm run build --workspace=sdk

# Install new dependencies
npm install --workspace=apps/web package-name
```

Your soundChain dApp is **working and ready for testing**! 🎵
