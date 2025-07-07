import { useState, useEffect } from 'react'
import * as fcl from "@onflow/fcl"
import { SCRIPTS } from '../contracts'

function NFTGallery() {
  const [user, setUser] = useState({ loggedIn: null })
  const [userNFTs, setUserNFTs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedNFT, setSelectedNFT] = useState(null)

  useEffect(() => {
    const subscription = fcl.currentUser.subscribe(setUser)
    return () => subscription()
  }, [])

  useEffect(() => {
    if (user.loggedIn) {
      loadUserNFTs()
    } else {
      setUserNFTs([])
    }
  }, [user])

  const loadUserNFTs = async () => {
    setLoading(true)
    setError('')
    try {
      const nfts = await fcl.query({
        cadence: SCRIPTS.GET_QUOTE_NFTS,
        args: (arg, t) => [arg(user.addr, t.Address)]
      })
      setUserNFTs(nfts)
    } catch (error) {
      console.error("Error loading NFTs:", error)
      setError(`Failed to load NFTs: ${error.message}`)
      setUserNFTs([])
    } finally {
      setLoading(false)
    }
  }

  const refreshGallery = () => {
    if (user.loggedIn) {
      loadUserNFTs()
    }
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const openNFTModal = (nft) => {
    setSelectedNFT(nft)
  }

  const closeNFTModal = () => {
    setSelectedNFT(null)
  }

  const downloadArtwork = (nft) => {
    const svgData = nft.artwork
    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `quote-nft-${nft.id}-${nft.author.replace(/\s+/g, '-').toLowerCase()}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const shareNFT = (nft) => {
    const text = `Check out my Quote NFT #${nft.id}: "${nft.quote}" — ${nft.author}`
    if (navigator.share) {
      navigator.share({
        title: `Quote NFT #${nft.id}`,
        text: text,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('NFT details copied to clipboard!')
    }
  }

  return (
    <div className="page">
      <div className="nft-gallery">
        <h1 className="page-title">🖼️ NFT Gallery</h1>
        <p className="page-subtitle">
          View and manage your Quote NFT collection. Each NFT represents a unique inspirational quote with algorithmically generated artwork.
        </p>

        {/* Wallet Connection Status */}
        <div className="card" style={{ maxWidth: '800px', margin: '2rem auto' }}>
          <div style={{ 
            padding: '1rem', 
            background: user.loggedIn ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            {user.loggedIn ? (
              <div>
                <p style={{ margin: 0, color: '#059669' }}>
                  ✅ Wallet connected: {user.addr}
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
                  <button onClick={refreshGallery} className="btn btn-outline" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Loading...
                      </>
                    ) : (
                      '🔄 Refresh Gallery'
                    )}
                  </button>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    {userNFTs.length} NFT{userNFTs.length !== 1 ? 's' : ''} found
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ margin: 0, color: '#dc2626' }}>
                  ❌ Please connect your wallet to view your NFT collection
                </p>
                <button onClick={() => fcl.authenticate()} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Connect Dev Wallet
                </button>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div style={{ 
              padding: '1rem', 
              background: 'rgba(239, 68, 68, 0.1)', 
              borderRadius: '8px',
              marginBottom: '1rem',
              color: '#dc2626'
            }}>
              {error}
            </div>
          )}

          {/* NFT Collection */}
          {user.loggedIn && !loading && (
            <>
              {userNFTs.length > 0 ? (
                <div>
                  <h3 style={{ marginBottom: '1.5rem' }}>Your Quote NFT Collection</h3>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                    gap: '2rem' 
                  }}>
                    {userNFTs.map((nft) => (
                      <div key={nft.id} className="nft-card" style={{ 
                        border: '2px solid rgba(102, 126, 234, 0.2)', 
                        borderRadius: '12px', 
                        padding: '1.5rem',
                        background: 'rgba(102, 126, 234, 0.05)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => openNFTModal(nft)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)'
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}>
                        
                        {/* NFT Artwork */}
                        <div style={{ 
                          border: '2px solid #667eea', 
                          borderRadius: '8px', 
                          overflow: 'hidden',
                          marginBottom: '1rem',
                          background: 'white'
                        }}>
                          <div 
                            dangerouslySetInnerHTML={{ __html: nft.artwork }} 
                            style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          />
                        </div>

                        {/* NFT Details */}
                        <div>
                          <h4 style={{ margin: '0 0 0.5rem 0', color: '#4f46e5' }}>
                            Quote NFT #{nft.id}
                          </h4>
                          <div style={{ 
                            fontSize: '0.95rem', 
                            fontStyle: 'italic', 
                            marginBottom: '0.5rem',
                            lineHeight: '1.4',
                            color: '#374151'
                          }}>
                            "{nft.quote.length > 80 ? nft.quote.substring(0, 77) + '...' : nft.quote}"
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                            — {nft.author}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                            Minted: {formatDate(nft.dateCreated)}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div style={{ 
                          display: 'flex', 
                          gap: '0.5rem', 
                          marginTop: '1rem',
                          justifyContent: 'space-between'
                        }}>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              shareNFT(nft)
                            }}
                            className="btn btn-outline"
                            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                          >
                            📤 Share
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              downloadArtwork(nft)
                            }}
                            className="btn btn-outline"
                            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                          >
                            💾 Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '3rem 2rem', 
                  background: 'rgba(102, 126, 234, 0.05)', 
                  borderRadius: '12px',
                  border: '2px dashed rgba(102, 126, 234, 0.3)'
                }}>
                  <h3>🎯 No NFTs Found</h3>
                  <p style={{ margin: '1rem 0', color: '#666' }}>
                    You don't have any Quote NFTs yet. Start by generating and minting your first inspirational quote!
                  </p>
                  <a href="/quote-generator" className="btn btn-primary">
                    ✨ Create Your First NFT
                  </a>
                </div>
              )}
            </>
          )}
        </div>

        {/* NFT Detail Modal */}
        {selectedNFT && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }} onClick={closeNFTModal}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }} onClick={(e) => e.stopPropagation()}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, color: '#4f46e5' }}>Quote NFT #{selectedNFT.id}</h2>
                <button 
                  onClick={closeNFTModal}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '1.5rem', 
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Full Artwork */}
              <div style={{ 
                border: '3px solid #667eea', 
                borderRadius: '12px', 
                overflow: 'hidden',
                marginBottom: '1.5rem',
                background: 'white'
              }}>
                <div 
                  dangerouslySetInnerHTML={{ __html: selectedNFT.artwork }} 
                  style={{ width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                />
              </div>

              {/* Full Quote */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  fontSize: '1.1rem', 
                  fontStyle: 'italic', 
                  marginBottom: '0.5rem',
                  lineHeight: '1.5',
                  color: '#374151'
                }}>
                  "{selectedNFT.quote}"
                </div>
                <div style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1rem' }}>
                  — {selectedNFT.author}
                </div>
              </div>

              {/* NFT Metadata */}
              <div style={{ 
                padding: '1rem', 
                background: 'rgba(102, 126, 234, 0.1)', 
                borderRadius: '8px',
                marginBottom: '1.5rem'
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>📋 NFT Details</h4>
                <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <p><strong>Token ID:</strong> {selectedNFT.id}</p>
                  <p><strong>Author:</strong> {selectedNFT.author}</p>
                  <p><strong>Minted:</strong> {formatDate(selectedNFT.dateCreated)}</p>
                  <p><strong>Type:</strong> Generative Quote Art</p>
                  <p><strong>Format:</strong> SVG Vector Graphics</p>
                  <p><strong>Blockchain:</strong> Flow</p>
                </div>
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => shareNFT(selectedNFT)}
                  className="btn btn-secondary"
                >
                  📤 Share NFT
                </button>
                <button 
                  onClick={() => downloadArtwork(selectedNFT)}
                  className="btn btn-outline"
                >
                  💾 Download Artwork
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="cards-grid" style={{ marginTop: '3rem' }}>
          <div className="card">
            <h3>🎨 Unique Artworks</h3>
            <p>
              Each NFT features completely unique SVG artwork generated algorithmically based on the quote content. 
              No two NFTs will ever look the same.
            </p>
          </div>
          
          <div className="card">
            <h3>📊 Collection Stats</h3>
            <p>
              Track your collection growth, view minting dates, and manage your inspirational quote NFTs. 
              Each NFT is permanently stored on the Flow blockchain.
            </p>
          </div>
          
          <div className="card">
            <h3>🔄 Easy Management</h3>
            <p>
              Share your favorite quotes, download artwork, and showcase your collection. 
              All NFTs are fully compatible with Flow NFT standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTGallery 