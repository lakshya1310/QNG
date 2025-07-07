import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1>🎲 Quote NFT Generator</h1>
        <p>
          A modern Flow blockchain dApp showcasing wallet integration, 
          smart contract interaction, and unique NFT artwork generation. Perfect for learning 
          Flow development and hackathon demonstrations.
        </p>
        <Link to="/demo" className="btn btn-primary">
          Try Live Demo →
        </Link>
      </div>

      <div className="cards-grid">
        <div className="card">
          <h3>🔗 Wallet Connection</h3>
          <p>
            Connect your Flow wallet using FCL (Flow Client Library) with 
            support for multiple authentication methods and wallet providers.
          </p>
          <Link to="/demo" className="btn btn-outline">
            Connect Wallet
          </Link>
        </div>

        <div className="card">
          <h3>⛓️ Blockchain Interaction</h3>
          <p>
            Query real-time blockchain data including block heights, timestamps, 
            and account balances directly from Flow testnet.
          </p>
          <Link to="/demo" className="btn btn-outline">
            Test Blockchain
          </Link>
        </div>

        <div className="card">
          <h3>🎨 Unique NFT Artwork</h3>
          <p>
            Generate inspirational quotes with algorithmically created unique artwork. 
            Each quote gets its own distinctive visual design perfect for NFTs!
          </p>
          <Link to="/quotes" className="btn btn-outline">
            Create NFT Art
          </Link>
        </div>

        <div className="card">
          <h3>🖼️ NFT Gallery</h3>
          <p>
            View and manage your complete Quote NFT collection. Browse your minted NFTs, 
            share favorites, and download artwork from your personal gallery.
          </p>
          <Link to="/gallery" className="btn btn-outline">
            View Gallery
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2>✨ New Feature: AI-Generated NFT Artwork</h2>
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          marginBottom: '2rem',
          border: '2px solid rgba(102, 126, 234, 0.2)'
        }}>
          <h3>🎨 Algorithmic Art Generation</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Each generated quote now comes with completely <strong>unique SVG artwork</strong> created 
            algorithmically based on the quote content. The same quote will always generate the same 
            artwork, ensuring authenticity and making each NFT truly one-of-a-kind!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/quotes" className="btn btn-primary">
              🎯 Try Art Generator
            </Link>
            <Link to="/gallery" className="btn btn-secondary">
              🖼️ View Gallery
            </Link>
            <Link to="/about" className="btn btn-outline">
              📖 Learn More
            </Link>
          </div>
        </div>

        <h2>Why Flow Blockchain?</h2>
        <div className="cards-grid">
          <div className="card">
            <h3>⚡ Fast & Efficient</h3>
            <p>Flow's unique multi-role architecture enables fast finality and low transaction costs, perfect for NFT minting.</p>
          </div>
          <div className="card">
            <h3>👥 Developer Friendly</h3>
            <p>Cadence smart contract language is designed for safety and clarity, making NFT development secure.</p>
          </div>
          <div className="card">
            <h3>🌍 Production Ready</h3>
            <p>Powering NBA Top Shot and other major NFT applications with millions of users and transactions.</p>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div style={{ marginTop: '3rem' }}>
        <h2>🚀 What Makes This Special</h2>
        <div className="cards-grid">
          <div className="card">
            <h3>🎨 Generative Art</h3>
            <p>
              Every quote generates unique visual artwork using algorithmic design. 
              Colors, patterns, and decorations are mathematically derived from the quote content.
            </p>
          </div>
          <div className="card">
            <h3>🔒 Deterministic Creation</h3>
            <p>
              The same quote will always produce identical artwork, ensuring consistency 
              and making the art verifiably tied to the content.
            </p>
          </div>
          <div className="card">
            <h3>💾 Export Ready</h3>
            <p>
              Generated artwork can be downloaded as high-quality SVG files, 
              perfect for minting as NFTs on the blockchain.
            </p>
          </div>
          <div className="card">
            <h3>📱 Modern UI/UX</h3>
            <p>
              Beautiful, responsive interface with smooth animations and professional 
              design that works perfectly on all devices.
            </p>
          </div>
          <div className="card">
            <h3>🖼️ Collection Management</h3>
            <p>
              Comprehensive NFT gallery to view, organize, and manage your Quote NFT collection 
              with detailed metadata and sharing capabilities.
            </p>
          </div>
          <div className="card">
            <h3>⛓️ Full Blockchain Integration</h3>
            <p>
              Complete Flow blockchain integration with wallet connection, smart contract interaction, 
              and real-time NFT minting and querying.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 