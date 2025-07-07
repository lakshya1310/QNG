import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import FlowDemo from './pages/FlowDemo'
import QuoteGenerator from './pages/QuoteGenerator'
import NFTGallery from './pages/NFTGallery'
import About from './pages/About'
import "./config"
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<FlowDemo />} />
            <Route path="/quotes" element={<QuoteGenerator />} />
            <Route path="/quote-generator" element={<QuoteGenerator />} />
            <Route path="/gallery" element={<NFTGallery />} />
            <Route path="/nft-gallery" element={<NFTGallery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App 