import QuoteNFT from "../contracts/QuoteNFT.cdc"
import NonFungibleToken from "NonFungibleToken"
import MetadataViews from "MetadataViews"

// This transaction uses the contract's public mint function
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
        log("Quote: \"".concat(quote).concat("\" by ").concat(author))
    }
} 