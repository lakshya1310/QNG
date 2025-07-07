import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🎲 Flow NFT Demo
        </Link>
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/demo" 
            className={`nav-link ${location.pathname === '/demo' ? 'active' : ''}`}
          >
            Flow Demo
          </Link>
          <Link 
            to="/quotes" 
            className={`nav-link ${location.pathname === '/quotes' || location.pathname === '/quote-generator' ? 'active' : ''}`}
          >
            Quote Generator
          </Link>
          <Link 
            to="/gallery" 
            className={`nav-link ${location.pathname === '/gallery' || location.pathname === '/nft-gallery' ? 'active' : ''}`}
          >
            NFT Gallery
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header 