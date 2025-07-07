import NonFungibleToken from "NonFungibleToken"
import MetadataViews from "MetadataViews"
import ViewResolver from "ViewResolver"

access(all) contract QuoteNFT: NonFungibleToken {

    access(all) var totalSupply: UInt64

    access(all) event ContractInitialized()
    access(all) event Withdraw(id: UInt64, from: Address?)
    access(all) event Deposit(id: UInt64, to: Address?)
    access(all) event Minted(id: UInt64, recipient: Address, quote: String, author: String)

    access(all) let CollectionStoragePath: StoragePath
    access(all) let CollectionPublicPath: PublicPath
    access(all) let MinterStoragePath: StoragePath

    access(all) resource NFT: NonFungibleToken.NFT, ViewResolver.Resolver {
        access(all) let id: UInt64
        access(all) let quote: String
        access(all) let author: String
        access(all) let artwork: String
        access(all) let dateCreated: UFix64

        init(
            id: UInt64,
            quote: String,
            author: String,
            artwork: String
        ) {
            self.id = id
            self.quote = quote
            self.author = author
            self.artwork = artwork
            self.dateCreated = getCurrentBlock().timestamp
        }

        access(all) view fun getViews(): [Type] {
            return [
                Type<MetadataViews.Display>(),
                Type<MetadataViews.Serial>()
            ]
        }

        access(all) fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<MetadataViews.Display>():
                    return MetadataViews.Display(
                        name: "Quote NFT #".concat(self.id.toString()),
                        description: "\"".concat(self.quote).concat("\" — ").concat(self.author),
                        thumbnail: MetadataViews.HTTPFile(
                            url: "data:image/svg+xml;charset=utf-8,".concat(self.artwork)
                        )
                    )

                case Type<MetadataViews.Serial>():
                    return MetadataViews.Serial(
                        self.id
                    )
            }
            return nil
        }

        access(all) fun createEmptyCollection(): @{NonFungibleToken.Collection} {
            return <-create Collection()
        }
    }

    access(all) resource interface QuoteNFTCollectionPublic {
        access(all) fun deposit(token: @{NonFungibleToken.NFT})
        access(all) view fun getIDs(): [UInt64]
        access(all) view fun borrowNFT(_ id: UInt64): &{NonFungibleToken.NFT}?
        access(all) fun borrowQuoteNFT(id: UInt64): &QuoteNFT.NFT? {
            post {
                (result == nil) || (result?.id == id):
                    "Cannot borrow QuoteNFT reference: the ID of the returned reference is incorrect"
            }
        }
    }

    access(all) resource Collection: QuoteNFTCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.Collection, NonFungibleToken.CollectionPublic, ViewResolver.ResolverCollection {
        access(all) var ownedNFTs: @{UInt64: {NonFungibleToken.NFT}}

        init () {
            self.ownedNFTs <- {}
        }

        access(NonFungibleToken.Withdraw) fun withdraw(withdrawID: UInt64): @{NonFungibleToken.NFT} {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

            emit Withdraw(id: token.id, from: self.owner?.address)

            return <-token
        }

        access(all) fun deposit(token: @{NonFungibleToken.NFT}) {
            let token <- token as! @QuoteNFT.NFT

            let id: UInt64 = token.id

            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
        }

        access(all) view fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        access(all) view fun borrowNFT(_ id: UInt64): &{NonFungibleToken.NFT}? {
            return (&self.ownedNFTs[id] as &{NonFungibleToken.NFT}?)
        }

        access(all) fun borrowQuoteNFT(id: UInt64): &QuoteNFT.NFT? {
            if self.ownedNFTs[id] != nil {
                let ref = (&self.ownedNFTs[id] as &{NonFungibleToken.NFT}?)!
                return ref as! &QuoteNFT.NFT
            }

            return nil
        }

        access(all) view fun borrowViewResolver(id: UInt64): &{ViewResolver.Resolver}? {
            let nft = (&self.ownedNFTs[id] as &{NonFungibleToken.NFT}?)!
            let quoteNFT = nft as! &QuoteNFT.NFT
            return quoteNFT as &{ViewResolver.Resolver}
        }

        access(all) view fun getSupportedNFTTypes(): {Type: Bool} {
            panic("implement me")
        }

        access(all) view fun isSupportedNFTType(type: Type): Bool {
            panic("implement me")
        }

        access(all) fun createEmptyCollection(): @{NonFungibleToken.Collection} {
            return <-create Collection()
        }
    }

    access(all) fun createEmptyCollection(nftType: Type): @{NonFungibleToken.Collection} {
        return <- create Collection()
    }

    access(all) view fun getContractViews(resourceType: Type?): [Type] {
        return []
    }

    access(all) fun resolveContractView(resourceType: Type?, viewType: Type): AnyStruct? {
        return nil
    }

    // Public mint function that anyone can call
    access(all) fun publicMintNFT(
        recipient: &QuoteNFT.Collection,
        quote: String,
        author: String,
        artwork: String
    ): UInt64 {
        // Get the minter from the contract account
        let minter = self.account.storage.borrow<&QuoteNFT.NFTMinter>(from: self.MinterStoragePath)
            ?? panic("Could not borrow minter reference")
        
        return minter.mintNFT(
            recipient: recipient,
            quote: quote,
            author: author,
            artwork: artwork
        )
    }

    access(all) resource NFTMinter {

        access(all) fun mintNFT(
            recipient: &QuoteNFT.Collection,
            quote: String,
            author: String,
            artwork: String
        ): UInt64 {
            let newNFT <- create NFT(
                id: QuoteNFT.totalSupply,
                quote: quote,
                author: author,
                artwork: artwork
            )

            let id = newNFT.id

            emit Minted(id: id, recipient: recipient.owner!.address, quote: quote, author: author)

            recipient.deposit(token: <-newNFT)

            QuoteNFT.totalSupply = QuoteNFT.totalSupply + 1

            return id
        }
    }

    init() {
        self.totalSupply = 0

        self.CollectionStoragePath = /storage/quoteNFTCollection
        self.CollectionPublicPath = /public/quoteNFTCollection
        self.MinterStoragePath = /storage/quoteNFTMinter

        let collection <- create Collection()
        self.account.storage.save(<-collection, to: self.CollectionStoragePath)

        self.account.capabilities.publish(
            self.account.capabilities.storage.issue<&QuoteNFT.Collection>(self.CollectionStoragePath),
            at: self.CollectionPublicPath
        )

        let minter <- create NFTMinter()
        self.account.storage.save(<-minter, to: self.MinterStoragePath)

        emit ContractInitialized()
    }
} 