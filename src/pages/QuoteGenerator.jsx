import { useState, useEffect } from 'react'
import * as fcl from "@onflow/fcl"
import { ArtworkGenerator } from '../utils/artworkGenerator'
import { SCRIPTS, TRANSACTIONS } from '../contracts'

function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [artworkUrl, setArtworkUrl] = useState(null)
  const [user, setUser] = useState({ loggedIn: null })
  const [isAccountSetup, setIsAccountSetup] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [mintStatus, setMintStatus] = useState('')
  const [userNFTs, setUserNFTs] = useState([])

  const quotes = [
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle"
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney"
    },
    {
      text: "Your limitation—it's only your imagination.",
      author: "Unknown"
    },
    {
      text: "Push yourself, because no one else is going to do it for you.",
      author: "Unknown"
    },
    {
      text: "Great things never come from comfort zones.",
      author: "Anonymous"
    },
    {
      text: "Dream it. Wish it. Do it.",
      author: "Unknown"
    },
    {
      text: "Success doesn't just find you. You have to go out and get it.",
      author: "Unknown"
    },
    {
      text: "The harder you work for something, the greater you'll feel when you achieve it.",
      author: "Unknown"
    },
    {
      text: "Dream bigger. Do bigger.",
      author: "Unknown"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs"
    },
    {
      text: "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon"
    },
    {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins"
    },
    {
      text: "In the middle of difficulty lies opportunity.",
      author: "Albert Einstein"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    }
  ]

  useEffect(() => {
    const subscription = fcl.currentUser.subscribe(setUser)
    return () => subscription()
  }, [])

  useEffect(() => {
    if (user.loggedIn) {
      checkAccountSetup()
      loadUserNFTs()
    }
  }, [user])

  const checkAccountSetup = async () => {
    try {
      const isSetup = await fcl.query({
        cadence: SCRIPTS.CHECK_ACCOUNT_SETUP,
        args: (arg, t) => [arg(user.addr, t.Address)]
      })
      setIsAccountSetup(isSetup)
    } catch (error) {
      console.error("Error checking account setup:", error)
      setIsAccountSetup(false)
    }
  }

  const loadUserNFTs = async () => {
    try {
      const nfts = await fcl.query({
        cadence: SCRIPTS.GET_QUOTE_NFTS,
        args: (arg, t) => [arg(user.addr, t.Address)]
      })
      setUserNFTs(nfts)
    } catch (error) {
      console.error("Error loading NFTs:", error)
      setUserNFTs([])
    }
  }

  const setupAccount = async () => {
    if (!user.loggedIn) {
      setMintStatus("❌ Please connect wallet first")
      return
    }

    setMintStatus("Setting up account...")
    console.log("Setting up account for:", user.addr)
    
    try {
      const transactionId = await fcl.mutate({
        cadence: TRANSACTIONS.SETUP_ACCOUNT,
        args: (arg, t) => [],
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        limit: 100
      })

      setMintStatus(`Account setup transaction sent: ${transactionId}`)
      console.log("Transaction ID:", transactionId)
      
      await fcl.tx(transactionId).onceSealed()
      setMintStatus("✅ Account setup complete!")
      setIsAccountSetup(true)
      
      setTimeout(() => setMintStatus(""), 3000)
    } catch (error) {
      console.error("Account setup error:", error)
      setMintStatus(`❌ Setup failed: ${error.message}`)
    }
  }

  const testConnection = async () => {
    setMintStatus("Testing emulator connection...")
    try {
      const result = await fcl.query({
        cadence: SCRIPTS.TEST_CONTRACT,
        args: []
      })
      setMintStatus(`✅ Connection successful! Block height: ${result}`)
      setTimeout(() => setMintStatus(""), 3000)
    } catch (error) {
      console.error("Connection test failed:", error)
      setMintStatus(`❌ Connection failed: ${error.message}`)
    }
  }

  const mintNFT = async () => {
    if (!user.loggedIn || !currentQuote) return

    setIsMinting(true)
    setMintStatus("Preparing to mint NFT...")

    try {
      const artwork = ArtworkGenerator.generateUniqueArtwork(currentQuote.text, currentQuote.author)
      
      const transactionId = await fcl.mutate({
        cadence: TRANSACTIONS.MINT_QUOTE_NFT,
        args: (arg, t) => [
          arg(currentQuote.text, t.String),
          arg(currentQuote.author, t.String),
          arg(artwork, t.String)
        ],
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        limit: 300
      })

      setMintStatus(`NFT mint transaction sent! ID: ${transactionId}`)
      
      const unsub = fcl.tx(transactionId).subscribe((res) => {
        setMintStatus(`Transaction ${res.status} - ${res.statusString}`)
        
        if (res.status === 4) { // Transaction sealed
          setMintStatus("🎉 NFT minted successfully!")
          loadUserNFTs() // Refresh the NFT list
          unsub()
          setTimeout(() => setMintStatus(""), 5000)
        } else if (res.status === -1) { // Transaction failed
          setMintStatus("❌ NFT minting failed!")
          unsub()
        }
      })

    } catch (error) {
      console.error("Minting error:", error)
      setMintStatus(`❌ Minting failed: ${error.message}`)
    } finally {
      setIsMinting(false)
    }
  }

  const generateRandomQuote = () => {
    setIsGenerating(true)
    
    if (artworkUrl) {
      URL.revokeObjectURL(artworkUrl)
    }
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      const selectedQuote = quotes[randomIndex]
      setCurrentQuote(selectedQuote)
      
      const newArtworkUrl = ArtworkGenerator.generateArtworkDataURL(
        selectedQuote.text, 
        selectedQuote.author
      )
      setArtworkUrl(newArtworkUrl)
      
      setIsGenerating(false)
    }, 1200)
  }

  const shareQuote = () => {
    if (currentQuote) {
      const text = `"${currentQuote.text}" — ${currentQuote.author}`
      if (navigator.share) {
        navigator.share({
          title: 'Inspirational Quote NFT',
          text: text
        })
      } else {
        navigator.clipboard.writeText(text)
        alert('Quote copied to clipboard!')
      }
    }
  }

  const downloadNFTArtwork = () => {
    if (currentQuote) {
      const filename = `quote-nft-${currentQuote.author.replace(/\s+/g, '-').toLowerCase()}.svg`
      ArtworkGenerator.downloadArtwork(currentQuote.text, currentQuote.author, filename)
    }
  }

  useEffect(() => {
    return () => {
      if (artworkUrl) {
        URL.revokeObjectURL(artworkUrl)
      }
    }
  }, [artworkUrl])

  return (
    <div className="page">
      <div className="quote-generator">
        <h1 className="page-title">💫 Quote Generator</h1>
        <p className="page-subtitle">
          Generate inspirational quotes with unique AI-generated artwork that can be minted as NFTs on the Flow blockchain. 
          Each quote gets its own distinctive visual design!
        </p>

        <div className="card" style={{ maxWidth: '900px', margin: '2rem auto' }}>
          <h3>🎲 Quote NFT Generator</h3>
          <p>
            Click the button below to generate a inspirational quote with unique artwork. 
            The visual design is algorithmically generated based on the quote content, making each NFT truly unique!
          </p>
          
          <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', fontSize: '0.9rem' }}>
            <strong>🔧 Emulator Mode:</strong> This app is configured to work with the local Flow emulator. 
            Emulator gRPC: port 3569, REST API: port 8888, Dev wallet: port 8701.
            <div style={{ marginTop: '0.5rem' }}>
              <button onClick={testConnection} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}>
                🔍 Test Connection
              </button>
            </div>
          </div>

          {/* Wallet Connection Status */}
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: user.loggedIn ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
            {user.loggedIn ? (
              <div>
                <p style={{ margin: 0, color: '#059669' }}>
                  ✅ Wallet connected: {user.addr}
                </p>
                {!isAccountSetup && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <p style={{ margin: 0, color: '#d97706', fontSize: '0.9rem' }}>
                      ⚠️ Account not set up for NFTs
                    </p>
                    <button onClick={setupAccount} className="btn btn-outline" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                      Setup Account for NFTs
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p style={{ margin: 0, color: '#dc2626' }}>
                  ❌ Please connect your wallet to mint NFTs
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <button onClick={() => fcl.authenticate()} className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
                    Connect Dev Wallet
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mint Status */}
          {mintStatus && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', fontSize: '0.9rem' }}>
              {mintStatus}
            </div>
          )}
          
          <button 
            onClick={generateRandomQuote} 
            className="btn btn-primary"
            disabled={isGenerating}
            style={{ marginBottom: '2rem' }}
          >
            {isGenerating ? (
              <>
                <span className="spinner"></span>
                Creating Artwork...
              </>
            ) : (
              '✨ Generate Quote NFT'
            )}
          </button>

          {currentQuote && (
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem', alignItems: 'start' }}>
              {}
              <div style={{ minWidth: '300px' }}>
                <h4 style={{ marginBottom: '1rem', textAlign: 'center' }}>🎨 Generated NFT Artwork</h4>
                {artworkUrl && (
                  <div style={{ 
                    border: '3px solid #667eea', 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                    background: 'white'
                  }}>
                    <img 
                      src={artworkUrl} 
                      alt="Generated NFT Artwork" 
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                )}
              </div>

              {}
              <div>
                <div className="quote-display">
                  <div className="quote-text">
                    "{currentQuote.text}"
                  </div>
                  <div className="quote-author">
                    — {currentQuote.author}
                  </div>
                </div>
                
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={shareQuote} className="btn btn-secondary">
                    📤 Share Quote
                  </button>
                  <button onClick={downloadNFTArtwork} className="btn btn-outline">
                    💾 Download Artwork
                  </button>
                  {user.loggedIn && isAccountSetup && (
                    <button 
                      onClick={mintNFT} 
                      className="btn btn-primary"
                      disabled={isMinting}
                      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                      {isMinting ? (
                        <>
                          <span className="spinner"></span>
                          Minting...
                        </>
                      ) : (
                        '🪙 Mint as NFT'
                      )}
                    </button>
                  )}
                  <button onClick={generateRandomQuote} className="btn btn-outline">
                    🔄 Generate Another
                  </button>
                </div>

                {}
                <div style={{ 
                  marginTop: '1.5rem', 
                  padding: '1rem', 
                  background: 'rgba(102, 126, 234, 0.1)', 
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}>
                  <h5 style={{ marginBottom: '0.5rem' }}>📋 NFT Metadata</h5>
                  <p><strong>Title:</strong> Quote NFT #{ArtworkGenerator.advancedHash(currentQuote.text).primary}</p>
                  <p><strong>Author:</strong> {currentQuote.author}</p>
                  <p><strong>Type:</strong> Generative Quote Art</p>
                  <p><strong>Dimensions:</strong> 500x500 SVG</p>
                  <p><strong>Uniqueness:</strong> Algorithmically generated based on quote content</p>
                </div>
              </div>
            </div>
          )}

          {!currentQuote && (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem', 
              background: 'rgba(102, 126, 234, 0.05)', 
              borderRadius: '12px',
              border: '2px dashed rgba(102, 126, 234, 0.3)'
            }}>
              <h4>🎯 Ready to Create Your First Quote NFT?</h4>
              <p style={{ margin: '1rem 0', color: '#666' }}>
                Generate your first quote to see the unique artwork that would accompany it as an NFT!
              </p>
            </div>
          )}
        </div>

        <div className="cards-grid">
          <div className="card">
            <h3>🎨 Unique Artwork</h3>
            <p>
              Each quote generates completely unique SVG artwork using algorithmic design. 
              Colors, patterns, and decorations are determined by the quote content, 
              ensuring no two NFTs look the same.
            </p>
          </div>
          
          <div className="card">
            <h3>🔄 Deterministic Generation</h3>
            <p>
              The same quote will always generate the same artwork, ensuring consistency 
              and authenticity. This makes the art truly tied to the quote content.
            </p>
          </div>
          
          <div className="card">
            <h3>💎 NFT Ready</h3>
            <p>
              Generated artwork is in SVG format, perfect for blockchain storage. 
              Includes metadata, unique identifiers, and scalable vector graphics.
            </p>
          </div>
        </div>

        {}
        {user.loggedIn && userNFTs.length > 0 && (
          <div className="card" style={{ marginTop: '2rem' }}>
            <h3>🖼️ Your Quote NFT Collection</h3>
            <p>You own {userNFTs.length} Quote NFT{userNFTs.length !== 1 ? 's' : ''}:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {userNFTs.map((nft) => (
                <div key={nft.id} style={{ 
                  border: '1px solid rgba(102, 126, 234, 0.3)', 
                  borderRadius: '8px', 
                  padding: '1rem',
                  background: 'rgba(102, 126, 234, 0.05)'
                }}>
                  <h5 style={{ margin: '0 0 0.5rem 0' }}>Quote NFT #{nft.id}</h5>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    fontStyle: 'italic', 
                    marginBottom: '0.5rem',
                    lineHeight: '1.4'
                  }}>
                    "{nft.quote.length > 60 ? nft.quote.substring(0, 57) + '...' : nft.quote}"
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                    — {nft.author}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#888' }}>
                    Minted: {new Date(nft.dateCreated * 1000).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card" style={{ marginTop: '2rem', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' }}>
          <h3>🚀 How It Works</h3>
          <div className="cards-grid" style={{ marginTop: '1.5rem' }}>
            <div>
              <h4>1. 🎯 Quote Selection</h4>
              <p> Quote is selected from curated collection of inspirational messages</p>
            </div>
            <div>
              <h4>2. 🎨 Art Generation</h4>
              <p>Unique SVG artwork is created using algorithmic design based on quote hash</p>
            </div>
            <div>
              <h4>3. 🏷️ Metadata Creation</h4>
              <p>NFT metadata is generated including title, author, and uniqueness identifiers</p>
            </div>
            <div>
              <h4>4. 🪙 NFT Minting</h4>
              <p>Connect wallet and mint your quote directly as an NFT on Flow blockchain</p>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h4>🌟 Live NFT Features Now Available:</h4>
            <ul className="features-list" style={{ textAlign: 'left', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto' }}>
              <li>✅ Smart contract integration for minting</li>
              <li>✅ On-chain artwork and metadata storage</li>
              <li>✅ Wallet connection for transactions</li>
              <li>✅ Collection management and viewing</li>
              <li>✅ MetadataViews compatibility</li>
              <li>🔄 Marketplace integration (coming soon)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuoteGenerator 