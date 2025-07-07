import QuoteNFT from "../contracts/QuoteNFT.cdc"
import NonFungibleToken from "NonFungibleToken"
import MetadataViews from "MetadataViews"

// This transaction sets up an account to use QuoteNFTs
// by storing an empty collection in storage and publishing a capability

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