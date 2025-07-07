import QuoteNFT from "../contracts/QuoteNFT.cdc"
import NonFungibleToken from "NonFungibleToken"
import MetadataViews from "MetadataViews"

// This transaction uses the public minter capability to mint NFTs
transaction(quote: String, author: String, artwork: String) {
    
    let minter: &QuoteNFT.NFTMinter
    let recipient: &QuoteNFT.Collection

    prepare(signer: &Account) {
        // Get the public minter reference from the contract account
        let contractAccount = getAccount(0xf8d6e0586b0a20c7)
        self.minter = contractAccount.capabilities.borrow<&QuoteNFT.NFTMinter>(QuoteNFT.MinterPublicPath)
            ?? panic("Could not borrow a reference to the public NFT minter")

        // Get the recipient's collection reference (signer's account)
        self.recipient = signer.capabilities.borrow<&QuoteNFT.Collection>(QuoteNFT.CollectionPublicPath)
            ?? panic("Could not borrow receiver reference")
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