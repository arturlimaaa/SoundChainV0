# 📚 soundChain User Manual

## 🎵 Welcome to soundChain!

soundChain is a decentralized music marketplace built on Algorand where artists can sell songs with automatic royalty splits, create membership tokens, and manage fan perks.

---

## 🚀 **Quick Start Guide**

### **Step 1: Install Pera Wallet**
- **Mobile**: Download from App Store or Google Play
- **Desktop**: Install the browser extension
- **Create Account**: Follow Pera Wallet setup instructions

### **Step 2: Get TestNet ALGO**
Since soundChain runs on Algorand TestNet:
1. Visit [Algorand TestNet Faucet](https://testnet.algoexplorer.io/dispenser)
2. Enter your Pera Wallet address
3. Request free TestNet ALGO (for transaction fees)

### **Step 3: Connect Your Wallet**
1. Open soundChain at http://localhost:3000
2. Click **"Connect Wallet"** in the top-right corner
3. Approve the connection in Pera Wallet
4. Your wallet address will appear in the navigation

---

## 🎯 **Core Features**

### 💰 **Royalty Purchase System**
**What it does**: Buy songs with automatic royalty distribution to all contributors

**How to use**:
1. Navigate to **Royalty** page
2. Enter the **App ID** (provided by the artist)
3. Enter the **App Address** (smart contract address)
4. Set your purchase **Price in ALGO**
5. Click **"Buy & Split"**
6. Approve transaction in Pera Wallet
7. Payment automatically splits between song contributors

**Required**: Valid smart contract App ID and address

---

### 🎨 **Asset Creation (Music NFTs)**
**What it does**: Create programmable music assets and NFTs

**How to use**:
1. Navigate to **Assets** page
2. Enter the **App ID** for ASA Factory contract
3. Fill in asset details:
   - **Asset Name**: Full name (e.g., "Midnight Dreams Song")
   - **Unit Name**: Short code (e.g., "MDRMS")
   - **Total Supply**: Number of tokens to create
   - **Decimals**: 0 for NFTs, 6 for fungible tokens
4. Click **"Create Asset"**
5. Approve transaction in Pera Wallet
6. Save the returned Asset ID

**Use Cases**:
- Song ownership tokens
- Album collections
- Fan merchandise tokens
- Limited edition releases

---

### 🆔 **Identity Registry**
**What it does**: Register your decentralized identity (DID) on-chain

**How to use**:
1. Navigate to **Identity** page
2. Enter the **App ID** for Identity Registry contract
3. Enter your **DID** (Decentralized Identifier)
   ```
   Example: did:algo:testnet:ABC123DEF456...
   ```
4. Click **"Register DID"**
5. Approve transaction in Pera Wallet

**Benefits**:
- Verified artist identity
- Cross-platform recognition
- Decentralized reputation
- Enable advanced features

---

### 🎖️ **Membership NFTs** (Coming Soon)
**What it does**: Mint tiered membership tokens for exclusive access

**Tiers Available**:
- **Bronze**: Basic access and perks
- **Silver**: Premium content and features
- **Gold**: VIP access and exclusive benefits

**Status**: UI ready, awaiting smart contract deployment

---

### 🎁 **Fan Perks System** (Coming Soon)
**What it does**: Create and redeem programmable perks for token holders

**Example Perks**:
- Early access to new releases
- Exclusive content and demos
- Virtual meet and greet sessions
- Merchandise discounts
- Concert ticket priority

**Status**: UI ready, awaiting smart contract deployment

---

## 🔧 **Technical Requirements**

### **Smart Contracts**
Most features require deployed smart contracts. You'll need:
- **App IDs**: Unique identifiers for each contract
- **App Addresses**: Smart contract addresses
- **Network**: TestNet (default) or MainNet

### **Transaction Fees**
- **Minimum Fee**: 0.001 ALGO per transaction
- **Asset Creation**: ~0.1 ALGO
- **Complex Transactions**: May require more

### **Wallet Requirements**
- **Pera Wallet**: Required for all transactions
- **Network**: Must be on same network as contracts (TestNet/MainNet)
- **Balance**: Sufficient ALGO for fees

---

## 🛠️ **Troubleshooting**

### **Wallet Won't Connect**
- ✅ Ensure Pera Wallet is installed and updated
- ✅ Try refreshing the browser page
- ✅ Check if wallet is on correct network (TestNet)
- ✅ Clear browser cache if issues persist

### **Transaction Fails**
- ✅ Check ALGO balance for transaction fees
- ✅ Verify App ID is correct and contract is deployed
- ✅ Ensure you're on the right network
- ✅ Try reducing transaction amount

### **"Contract Not Found" Error**
- ✅ Smart contract needs to be deployed first
- ✅ Ask artist/admin for correct App ID
- ✅ Verify you're on same network as contract

### **Page Won't Load**
- ✅ Check if development servers are running
- ✅ Frontend: http://localhost:3000
- ✅ API: http://localhost:3001
- ✅ Restart servers if needed

---

## 🔒 **Security Best Practices**

### **Wallet Security**
- ❌ **Never share your seed phrase**
- ✅ **Review all transactions** before approval
- ✅ **Use official Pera Wallet** only
- ✅ **Keep wallet software updated**

### **Transaction Safety**
- ✅ **Verify App IDs** with trusted sources
- ✅ **Check transaction details** before signing
- ✅ **Start with small amounts** when testing
- ✅ **Save transaction IDs** for records

### **Smart Contract Interaction**
- ✅ **Only use verified contracts**
- ✅ **Understand what you're signing**
- ✅ **Be cautious with unknown App IDs**

---

## 📞 **Getting Help**

### **Common Resources**
- **Documentation**: Check README.md files
- **Testing Guide**: See TESTING.md
- **Implementation Details**: See IMPLEMENTATION.md

### **Development Support**
- **GitHub Issues**: Report bugs and feature requests
- **Code Review**: Submit pull requests for improvements
- **Community**: Join developer discussions

### **User Support**
- **How To Page**: http://localhost:3000/how-to
- **API Health**: http://localhost:3001/health
- **Transaction Explorer**: Use AlgoExplorer for transaction details

---

## 🎯 **What's Working vs. Coming Soon**

### ✅ **Currently Working**
- Wallet connection and management
- Transaction building and signing
- API endpoints and data fetching
- User interface and navigation
- Error handling and user feedback

### 🚧 **Needs Smart Contract Deployment**
- Actual transaction submission and confirmation
- Real royalty splits and payments
- Asset creation and management
- Identity registration and verification
- Membership and perks functionality

### 🔮 **Future Enhancements**
- Enhanced UI with transaction history
- Real IPFS integration for metadata
- Advanced analytics and reporting
- Multi-artist collaboration tools
- Fan engagement features

---

## 🎵 **Getting Started Checklist**

- [ ] Install Pera Wallet
- [ ] Get TestNet ALGO from faucet
- [ ] Connect wallet to soundChain
- [ ] Explore the How To page
- [ ] Try transaction building (will fail without contracts)
- [ ] Deploy smart contracts (for full functionality)
- [ ] Test end-to-end with real App IDs

**Welcome to the future of decentralized music! 🎉**
