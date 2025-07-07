import * as fcl from "@onflow/fcl"

export const FLOW_CONFIG = {
  "accessNode.api": "http://localhost:8888",
  
  "discovery.wallet": "http://localhost:8701/fcl/authn",
  
  "app.detail.title": "Quote NFT Generator",
  "app.detail.icon": "https://via.placeholder.com/200x200/667eea/ffffff?text=📜",
  "app.detail.description": "Generate and mint inspirational quotes as NFTs on Flow",
  "app.detail.url": "http://localhost:3000",
  
  "flow.network": "emulator",
  
  "0xQuoteNFT": "0xf8d6e0586b0a20c7",
  "0xNonFungibleToken": "0xf8d6e0586b0a20c7", 
  "0xMetadataViews": "0xf8d6e0586b0a20c7"
};

try {
  fcl.config(FLOW_CONFIG);
  console.log('✅ FCL configured successfully with Flow emulator');
  console.log('📋 Using QuoteNFT contract for minting');
  console.log('🔗 Connect to emulator at http://localhost:8888');
} catch (error) {
  console.error('❌ FCL configuration failed:', error);
}

export default fcl; 