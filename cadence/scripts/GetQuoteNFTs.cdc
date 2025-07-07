import QuoteNFT from "../contracts/QuoteNFT.cdc"
import NonFungibleToken from "NonFungibleToken"
import MetadataViews from "MetadataViews"

access(all) struct QuoteNFTData {
    access(all) let id: UInt64
    access(all) let quote: String
    access(all) let author: String
    access(all) let artwork: String
    access(all) let dateCreated: UFix64
    access(all) let metadata: MetadataViews.Display?

    init(
        id: UInt64,
        quote: String,
        author: String,
        artwork: String,
        dateCreated: UFix64,
        metadata: MetadataViews.Display?
    ) {
        self.id = id
        self.quote = quote
        self.author = author
        self.artwork = artwork
        self.dateCreated = dateCreated
        self.metadata = metadata
    }
}

// Script to get all QuoteNFTs in an account
access(all) fun main(address: Address): [QuoteNFTData] {
    let account = getAccount(address)
    
    let collectionRef = account.capabilities.borrow<&QuoteNFT.Collection>(QuoteNFT.CollectionPublicPath)
        ?? panic("Could not borrow capability from public collection")
    
    let ids = collectionRef.getIDs()
    let nfts: [QuoteNFTData] = []
    
    for id in ids {
        let nft = collectionRef.borrowQuoteNFT(id: id)!
        let metadata = nft.resolveView(Type<MetadataViews.Display>()) as! MetadataViews.Display?
        
        nfts.append(QuoteNFTData(
            id: nft.id,
            quote: nft.quote,
            author: nft.author,
            artwork: nft.artwork,
            dateCreated: nft.dateCreated,
            metadata: metadata
        ))
    }
    
    return nfts
} 