// Flow scripts and transactions for QuoteNFT functionality
export const SCRIPTS = {
  TEST_CONTRACT: `
    access(all) fun main(): UInt64 {
        return getCurrentBlock().height
    }
  `,

  GET_ACCOUNT_BALANCE: `
    import FlowToken from 0x0ae53cb6e3f42a79

    access(all) fun main(address: Address): UFix64 {
        let account = getAccount(address)
        
        if let balanceRef = account.capabilities.borrow<&{FlowToken.Balance}>(/public/flowTokenBalance) {
            return balanceRef.balance
        }
        
        return 0.0
    }
  `,
  
  GET_BLOCK_INFO: `
    access(all) struct BlockInfo {
        access(all) let height: UInt64
        access(all) let timestamp: UFix64
        
        init(height: UInt64, timestamp: UFix64) {
            self.height = height
            self.timestamp = timestamp
        }
    }

    access(all) fun main(): BlockInfo {
        let block = getCurrentBlock()
        return BlockInfo(height: block.height, timestamp: block.timestamp)
    }
  `,

  GET_QUOTE_NFTS: `
    import QuoteNFT from 0xf8d6e0586b0a20c7
    import NonFungibleToken from 0xf8d6e0586b0a20c7
    import MetadataViews from 0xf8d6e0586b0a20c7

    access(all) struct QuoteNFTData {
        access(all) let id: UInt64
        access(all) let quote: String
        access(all) let author: String
        access(all) let artwork: String
        access(all) let dateCreated: UFix64

        init(id: UInt64, quote: String, author: String, artwork: String, dateCreated: UFix64) {
            self.id = id
            self.quote = quote
            self.author = author
            self.artwork = artwork
            self.dateCreated = dateCreated
        }
    }

    access(all) fun main(address: Address): [QuoteNFTData] {
        let account = getAccount(address)
        
        let collectionRef = account.capabilities.borrow<&QuoteNFT.Collection>(QuoteNFT.CollectionPublicPath)
        
        if collectionRef == nil {
            return []
        }
        
        let ids = collectionRef!.getIDs()
        let nfts: [QuoteNFTData] = []
        
        for id in ids {
            if let nft = collectionRef!.borrowQuoteNFT(id: id) {
                nfts.append(QuoteNFTData(
                    id: nft.id,
                    quote: nft.quote,
                    author: nft.author,
                    artwork: nft.artwork,
                    dateCreated: nft.dateCreated
                ))
            }
        }
        
        return nfts
    }
  `,

  CHECK_ACCOUNT_SETUP: `
    import QuoteNFT from 0xf8d6e0586b0a20c7

    access(all) fun main(address: Address): Bool {
        let account = getAccount(address)
                 return account.capabilities.get<&QuoteNFT.Collection>(QuoteNFT.CollectionPublicPath).check()
    }
  `
};

export const TRANSACTIONS = {
  SIMPLE_TRANSACTION: `
    transaction(message: String) {
        prepare(signer: auth(Storage) &Account) {
            log("Transaction executed by: ".concat(signer.address.toString()))
            log("Message: ".concat(message))
        }
        
        execute {
            log("Simple transaction completed successfully!")
        }
    }
  `,

  SETUP_ACCOUNT: `
    import QuoteNFT from 0xf8d6e0586b0a20c7
    import NonFungibleToken from 0xf8d6e0586b0a20c7
    import MetadataViews from 0xf8d6e0586b0a20c7

    transaction {
        prepare(signer: auth(Storage, Capabilities) &Account) {
            // Check if the account already has a collection
            if signer.storage.borrow<&QuoteNFT.Collection>(from: QuoteNFT.CollectionStoragePath) == nil {
                // Create a new empty collection with the NFT type
                let collection <- QuoteNFT.createEmptyCollection(nftType: Type<@QuoteNFT.NFT>()) as! @QuoteNFT.Collection
                
                // Save it to the account
                signer.storage.save(<-collection, to: QuoteNFT.CollectionStoragePath)
                
                                 // Create a public capability for the collection
                 signer.capabilities.publish(
                     signer.capabilities.storage.issue<&QuoteNFT.Collection>(QuoteNFT.CollectionStoragePath),
                     at: QuoteNFT.CollectionPublicPath
                 )
                
                log("Account setup complete - ready to receive QuoteNFTs!")
            } else {
                log("Account already set up for QuoteNFTs")
            }
        }
    }
  `,

  MINT_QUOTE_NFT: `
    import QuoteNFT from 0xf8d6e0586b0a20c7
    import NonFungibleToken from 0xf8d6e0586b0a20c7
    import MetadataViews from 0xf8d6e0586b0a20c7

    transaction(quote: String, author: String, artwork: String) {
        
        let recipient: &QuoteNFT.Collection

        prepare(signer: auth(Storage) &Account) {
            // Get the recipient's collection reference (signer's account)
            self.recipient = signer.capabilities.borrow<&QuoteNFT.Collection>(QuoteNFT.CollectionPublicPath)
                ?? panic("Could not borrow receiver reference")
        }

        execute {
            // Use the contract's public mint function
            let newID = QuoteNFT.publicMintNFT(
                recipient: self.recipient,
                quote: quote,
                author: author,
                artwork: artwork
            )

            log("Minted QuoteNFT with ID: ".concat(newID.toString()))
            log("Quote: \\"".concat(quote).concat("\\" by ").concat(author))
        }
    }
  `
}; 