function About() {
  return (
    <div className="page">
      <h1 className="page-title">📋 About This Project</h1>
      <p className="page-subtitle">
        Learn about the Quote NFT Generator - a project showcasing Flow blockchain development
      </p>

      <div className="card">
        <h3>🎯 Project Overview</h3>
        <p>
          The Quote NFT Generator is a demonstration dApp built for hackathons and 
          educational purposes. It showcases the fundamental concepts of blockchain development 
          on the Flow network, including wallet integration, smart contract interaction, and 
          the potential for NFT creation.
        </p>
      </div>

      <div className="cards-grid">
        <div className="card">
          <h3>⚡ Flow Blockchain</h3>
          <p>
            Flow is a fast, decentralized, and developer-friendly blockchain, designed as the foundation 
            for a new generation of games, apps, and digital assets.
          </p>
        </div>
        
        <div className="card">
          <h3>🔧 FCL Integration</h3>
          <p>
            Flow Client Library (FCL) provides seamless wallet integration and blockchain interaction 
            without the complexity of managing private keys.
          </p>
        </div>
        
        <div className="card">
          <h3>⚛️ React Framework</h3>
          <p>
            Built with React 18 and Vite for fast development and modern user experience, 
            demonstrating best practices for dApp development.
          </p>
        </div>
      </div>

      <div className="card">
        <h3>🛠️ Technical Stack</h3>
        <div className="cards-grid">
          <div style={{ textAlign: 'left' }}>
            <h4>Frontend</h4>
            <ul className="features-list">
              <li>React 18 with Hooks</li>
              <li>React Router for navigation</li>
              <li>Modern CSS with gradients</li>
              <li>Responsive design</li>
            </ul>
          </div>
          
          <div style={{ textAlign: 'left' }}>
            <h4>Blockchain</h4>
            <ul className="features-list">
              <li>Flow Client Library (FCL)</li>
              <li>Flow Testnet integration</li>
              <li>Cadence smart contracts</li>
              <li>Wallet connectivity</li>
            </ul>
          </div>
          
          <div style={{ textAlign: 'left' }}>
            <h4>Development</h4>
            <ul className="features-list">
              <li>Vite build tool</li>
              <li>ES6 modules</li>
              <li>Hot module replacement</li>
              <li>Development server</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>🎨 Features Demonstrated</h3>
        <ul className="features-list" style={{ textAlign: 'left' }}>
          <li>Wallet connection and authentication</li>
          <li>Real-time blockchain data queries</li>
          <li>Transaction creation and monitoring</li>
          <li>Account balance checking</li>
          <li> content generation</li>
          <li>Modern responsive UI/UX</li>
          <li>Error handling and user feedback</li>
          <li>Loading states and animations</li>
        </ul>
      </div>

      <div className="card">
        <h3>🚀 Hackathon Requirements Met</h3>
        <div className="cards-grid">
          <div className="card" style={{ background: 'rgba(46, 160, 67, 0.1)', border: '2px solid rgba(46, 160, 67, 0.2)' }}>
            <h4>✅ Consumer-Oriented</h4>
            <p>User-friendly interface for generating and viewing inspirational quote NFTs</p>
          </div>
          
          <div className="card" style={{ background: 'rgba(46, 160, 67, 0.1)', border: '2px solid rgba(46, 160, 67, 0.2)' }}>
            <h4>✅ Flow Connected</h4>
            <p>Integrated with Flow testnet using official FCL library and standards</p>
          </div>
          
          <div className="card" style={{ background: 'rgba(46, 160, 67, 0.1)', border: '2px solid rgba(46, 160, 67, 0.2)' }}>
            <h4>✅ Public & Free</h4>
            <p>Open-source demo available for anyone to use and learn from</p>
          </div>
          
          <div className="card" style={{ background: 'rgba(46, 160, 67, 0.1)', border: '2px solid rgba(46, 160, 67, 0.2)' }}>
            <h4>✅ Original Creation</h4>
            <p>Built from scratch specifically for this hackathon, not a fork</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>📖 Educational Value</h3>
        <p>
          This project serves as an excellent starting point for developers wanting to learn Flow blockchain development. 
          It demonstrates:
        </p>
        <ul className="features-list" style={{ textAlign: 'left', marginTop: '1rem' }}>
          <li>How to set up a Flow development environment</li>
          <li>Wallet integration patterns with FCL</li>
          <li>Cadence script and transaction basics</li>
          <li>React state management for blockchain apps</li>
          <li>Error handling and user experience best practices</li>
          <li>Modern frontend design for dApps</li>
        </ul>
      </div>

      <div className="card">
        <h3>🔗 Useful Links</h3>
        <div className="cards-grid">
          <a href="https://flow.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ textDecoration: 'none' }}>
            🌊 Flow Blockchain
          </a>
          <a href="https://developers.flow.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ textDecoration: 'none' }}>
            📚 Developer Docs
          </a>
          <a href="https://github.com/onflow/fcl-js" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ textDecoration: 'none' }}>
            🔧 FCL GitHub
          </a>
          <a href="https://testnet.flowscan.org" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ textDecoration: 'none' }}>
            🔍 Testnet Explorer
          </a>
        </div>
      </div>
    </div>
  )
}

export default About 