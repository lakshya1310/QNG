# 📜 Quote NFT Generator

A sophisticated NFT application built on the Flow blockchain that transforms inspirational quotes into unique, algorithmically-generated digital artwork. Each quote becomes a one-of-a-kind NFT with personalized visual elements.

## 🎨 What It Does

The Quote NFT Generator creates unique digital art pieces from inspirational quotes using advanced algorithmic generation. Each quote produces:

- **Unique SVG Artwork**: Sophisticated generative art with 8+ pattern types, advanced color palettes, and artistic effects
- **Blockchain Integration**: Full Flow blockchain integration with smart contracts for minting and ownership
- **NFT Metadata**: Complete metadata including title, author, creation date, and uniqueness identifiers
- **Wallet Integration**: Seamless connection with Flow wallets for minting and collection management

## ✨ Features

### 🎯 Core Functionality
- **Quote Generation**: Curated collection of inspirational quotes from various authors
- **Algorithmic Art**: Advanced SVG generation with 500x500 resolution and sophisticated visual effects
- **NFT Minting**: Direct minting to Flow blockchain with MetadataViews compatibility
- **Collection Management**: View and manage your NFT collection with gallery interface

### 🎨 Advanced Artwork Generation
- **8 Pattern Types**: Geometric circles, mandala patterns, organic flows, crystalline structures, Art Deco, tribal, futuristic, and dot matrix
- **4 Texture Types**: Paper, canvas, marble, and silk textures for premium feel
- **Multi-layer Composition**: Sophisticated layering with depth effects, gradients, and animations
- **Color Harmony**: Advanced color theory implementation with 3-color background gradients
- **Visual Effects**: Glow, shimmer, emboss, noise, and metallic sheen effects

### 🔗 Blockchain Features
- **Flow Integration**: Built on Flow blockchain for fast, low-cost transactions
- **Smart Contracts**: Custom QuoteNFT contract with full NFT standard compliance
- **Wallet Connection**: FCL integration for seamless wallet interaction
- **Transaction Monitoring**: Real-time transaction status and confirmation

## 🚀 Technology Stack

- **Frontend**: React 18 with Vite for fast development and modern UX
- **Blockchain**: Flow blockchain with Cadence smart contracts
- **Wallet**: Flow Client Library (FCL) for wallet integration
- **Art Generation**: Advanced SVG generation with algorithmic design
- **Styling**: Modern CSS with gradient backgrounds and responsive design

## 📱 Application Structure

### Pages
- **Home**: Welcome page with project overview and navigation
- **Quote Generator**: Main application for generating and minting quote NFTs
- **NFT Gallery**: Collection viewer for browsing owned NFTs
- **Flow Demo**: Blockchain interaction demonstration
- **About**: Project information and technical details

### Smart Contracts
- **QuoteNFT.cdc**: Main NFT contract with minting and collection management
- **Counter.cdc**: Basic counter contract for testing

### Key Components
- **Artwork Generator**: Sophisticated SVG generation engine
- **Wallet Integration**: FCL-based wallet connection and transaction handling
- **NFT Collection**: Gallery interface for viewing and managing NFTs

## 🎯 How It Works

1. **Quote Selection**: Choose from curated inspirational quotes or generate random selections
2. **Art Generation**: Unique SVG artwork is created using algorithmic design based on quote content
3. **Preview**: See the generated artwork and metadata before minting
4. **Wallet Connection**: Connect your Flow wallet for blockchain interaction
5. **Minting**: Mint your quote as an NFT directly to the Flow blockchain
6. **Collection**: View and manage your NFT collection in the gallery

## 🔮 Future Enhancements

This project is actively being developed with planned improvements:

- **Marketplace Integration**: Buy and sell Quote NFTs
- **Custom Quote Input**: Allow users to input their own quotes
- **Advanced Art Styles**: Additional artistic styles and customization options
- **Social Features**: Share quotes and collections with others
- **Mobile App**: Native mobile application for iOS and Android
- **Print Services**: Physical prints of NFT artwork

## 🌟 Unique Value Proposition

Unlike generic NFT generators, this application:
- Creates meaningful content through inspirational quotes
- Uses sophisticated algorithmic art generation
- Ensures each NFT is truly unique and tied to its content
- Provides a complete end-to-end experience from generation to collection
- Built on Flow blockchain for optimal performance and low costs

## 🛠️ Development

This project uses modern web development practices with Flow blockchain integration. The smart contracts are written in Cadence and deployed to the Flow emulator for development and testing.

For development setup, ensure you have:
- Node.js and npm installed
- Flow CLI for blockchain interaction
- Flow emulator running locally

## 📄 License

This project is a personal application developed for the Flow ecosystem. All rights reserved.

---

*Built with ❤️ on the Flow blockchain*

## 🔨 Getting Started

Here are some essential resources to help you hit the ground running:

- **[Flow Documentation](https://developers.flow.com/)** - The official Flow Documentation is a great starting point to start learning about about [building](https://developers.flow.com/build/flow) on Flow.
- **[Cadence Documentation](https://cadence-lang.org/docs/language)** - Cadence is the native language for the Flow Blockchain. It is a resource-oriented programming language that is designed for developing smart contracts.  The documentation is a great place to start learning about the language.
- **[Visual Studio Code](https://code.visualstudio.com/)** and the **[Cadence Extension](https://marketplace.visualstudio.com/items?itemName=onflow.cadence)** - It is recommended to use the Visual Studio Code IDE with the Cadence extension installed.  This will provide syntax highlighting, code completion, and other features to support Cadence development.
- **[Flow Clients](https://developers.flow.com/tools/clients)** - There are clients available in multiple languages to interact with the Flow Blockchain.  You can use these clients to interact with your smart contracts, run transactions, and query data from the network.
- **[Block Explorers](https://developers.flow.com/ecosystem/block-explorers)** - Block explorers are tools that allow you to explore on-chain data.  You can use them to view transactions, accounts, events, and other information.  [Flowser](https://flowser.dev/) is a powerful block explorer for local development on the Flow Emulator.

## 📦 Project Structure

Your project has been set up with the following structure:

- `flow.json` - This is the configuration file for your project (analogous to a `package.json` file for NPM).  It has been initialized with a basic configuration and your selected Core Contract dependencies to get started.

  Your project has also been configured with the following dependencies.  You can add more dependencies using the `flow deps add` command:
    - `FlowToken`
    - `FungibleToken`
    - `ViewResolver`
    - `Burner`
    - `MetadataViews`
    - `NonFungibleToken`
    - `FungibleTokenMetadataViews`

- `/cadence` - This is where your Cadence smart contracts code lives

Inside the `cadence` folder you will find:
- `/contracts` - This folder contains your Cadence contracts (these are deployed to the network and contain the business logic for your application)
  - `Counter.cdc`
- `/scripts` - This folder contains your Cadence scripts (read-only operations)
  - `GetCounter.cdc`
- `/transactions` - This folder contains your Cadence transactions (state-changing operations)
  - `IncrementCounter.cdc`
- `/tests` - This folder contains your Cadence tests (integration tests for your contracts, scripts, and transactions to verify they behave as expected)
  - `Counter_test.cdc`

## Running the Existing Project

### Executing the `GetCounter` Script

To run the `GetCounter` script, use the following command:

```shell
flow scripts execute cadence/scripts/GetCounter.cdc
```

### Sending the `IncrementCounter` Transaction

To run the `IncrementCounter` transaction, use the following command:

```shell
flow transactions send cadence/transactions/IncrementCounter.cdc
```

To learn more about using the CLI, check out the [Flow CLI Documentation](https://developers.flow.com/tools/flow-cli).

## 👨‍💻 Start Developing

### Creating a New Contract

To add a new contract to your project, run the following command:

```shell
flow generate contract
```

This command will create a new contract file and add it to the `flow.json` configuration file.

### Creating a New Script

To add a new script to your project, run the following command:

```shell
flow generate script
```

This command will create a new script file.  Scripts are used to read data from the blockchain and do not modify state (i.e. get the current balance of an account, get a user's NFTs, etc).

You can import any of your own contracts or installed dependencies in your script file using the `import` keyword.  For example:

```cadence
import "Counter"
```

### Creating a New Transaction

To add a new transaction to your project you can use the following command:

```shell
flow generate transaction
```

This command will create a new transaction file.  Transactions are used to modify the state of the blockchain (i.e purchase an NFT, transfer tokens, etc).

You can import any dependencies as you would in a script file.

### Creating a New Test

To add a new test to your project you can use the following command:

```shell
flow generate test
```

This command will create a new test file.  Tests are used to verify that your contracts, scripts, and transactions are working as expected.

### Installing External Dependencies

If you want to use external contract dependencies (such as NonFungibleToken, FlowToken, FungibleToken, etc.) you can install them using [Flow CLI Dependency Manager](https://developers.flow.com/tools/flow-cli/dependency-manager).

For example, to install the NonFungibleToken contract you can use the following command:

```shell
flow deps add mainnet://1d7e57aa55817448.NonFungibleToken
```

Contracts can be found using [ContractBrowser](https://contractbrowser.com/), but be sure to verify the authenticity before using third-party contracts in your project.

## 🧪 Testing

To verify that your project is working as expected you can run the tests using the following command:

```shell
flow test
```

This command will run all tests with the `_test.cdc` suffix (these can be found in the `cadence/tests` folder). You can add more tests here using the `flow generate test` command (or by creating them manually).

To learn more about testing in Cadence, check out the [Cadence Test Framework Documentation](https://cadence-lang.org/docs/testing-framework).

## 🚀 Deploying Your Project

To deploy your project to the Flow network, you must first have a Flow account and have configured your deployment targets in the `flow.json` configuration file.

You can create a new Flow account using the following command:

```shell
flow accounts create
```

Learn more about setting up deployment targets in the [Flow CLI documentation](https://developers.flow.com/tools/flow-cli/deployment/project-contracts).

### Deploying to the Flow Emulator

To deploy your project to the Flow Emulator, start the emulator using the following command:

```shell
flow emulator --start
```

To deploy your project, run the following command:

```shell
flow project deploy --network=emulator
```

This command will start the Flow Emulator and deploy your project to it. You can now interact with your project using the Flow CLI or alternate [client](https://developers.flow.com/tools/clients).

### Deploying to Flow Testnet

To deploy your project to Flow Testnet you can use the following command:

```shell
flow project deploy --network=testnet
```

This command will deploy your project to Flow Testnet. You can now interact with your project on this network using the Flow CLI or any other Flow client.

### Deploying to Flow Mainnet

To deploy your project to Flow Mainnet you can use the following command:

```shell
flow project deploy --network=mainnet
```

This command will deploy your project to Flow Mainnet. You can now interact with your project using the Flow CLI or alternate [client](https://developers.flow.com/tools/clients).

## 📚 Other Resources

- [Cadence Design Patterns](https://cadence-lang.org/docs/design-patterns)
- [Cadence Anti-Patterns](https://cadence-lang.org/docs/anti-patterns)
- [Flow Core Contracts](https://developers.flow.com/build/core-contracts)

## 🤝 Community
- [Flow Community Forum](https://forum.flow.com/)
- [Flow Discord](https://discord.gg/flow)
- [Flow Twitter](https://x.com/flow_blockchain)
