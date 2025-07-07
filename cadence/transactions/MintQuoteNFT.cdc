import QuoteNFT from "../contracts/QuoteNFT.cdc"
import NonFungibleToken from "NonFungibleToken"
import MetadataViews from "MetadataViews"

// This transaction can only be run by the contract account that owns the minter
transaction(recipientAddress: Address, quote: String, author: String, artwork: String) {
    
    let minter: &QuoteNFT.NFTMinter
    let recipient: &QuoteNFT.Collection

    prepare(signer: auth(Storage) &Account) {
        // Get the minter reference from the signer's account (must be contract account)
        self.minter = signer.storage.borrow<&QuoteNFT.NFTMinter>(from: QuoteNFT.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter. This transaction must be run by the contract account.")

        // Get the recipient's collection reference
        let recipientAccount = getAccount(recipientAddress)
        self.recipient = recipientAccount.capabilities.borrow<&QuoteNFT.Collection>(QuoteNFT.CollectionPublicPath)
            ?? panic("Could not borrow receiver reference from recipient account")
    }

    execute {
        // Mint the NFT
        let newID = self.minter.mintNFT(
            recipient: self.recipient,
            quote: quote,
            author: author,
            artwork: artwork
        )

        log("Minted QuoteNFT with ID: ".concat(newID.toString()))
        log("Quote: \"".concat(quote).concat("\" by ").concat(author))
    }
} 