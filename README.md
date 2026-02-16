

## Project Overview

This software is a decentralized dashboard built during **Day 46** of my Solidity learning journey. It is designed to be a "Universal" interface, meaning it can interact with any ERC20 token deployed on the blockchain by simply providing the Contract Address (CA) and the ABI.

To test the system, I successfully engineered and deployed two separate tokens on the **Sepolia Testnet**:

* **$MKT (MyToken)**: A utility token for general ecosystem testing.
* **$CODE (DeveloperToken)**: A specialty token featuring restricted `mint` functions for developer rewards.

## 🛠 Features

* **MetaMask Integration**: Securely connects to the user's wallet to read balances and sign transactions.
* **Dynamic Data Fetching**: The app automatically detects token decimals and symbols from the blockchain, ensuring that both **$MKT** and **$CODE** display correctly without hard-coding values.
* **Minting (Owner Only)**: Includes a dedicated UI for the contract owner to mint new tokens directly to their wallet or a specified recipient.
* **Transfer System**: A streamlined "Send" interface with real-time transaction status logs.
* **Real-time Activity Logs**: A built-in terminal that tracks every interaction (Connect, Load, Mint, Transfer) for better debugging.

## 🏗 Technical Stack

* **Smart Contracts**: Solidity 0.8.18, OpenZeppelin ERC20 & Ownable standards.
* **Frontend**: HTML5, CSS3 (Custom Glassmorphism UI).
* **Blockchain Library**: Ethers.js (v5.7.2).
* **Network**: Sepolia Testnet.

## 📁 File Structure

* `index.html`: The user interface, featuring a "Card" layout for setup, balance, and transfers.
* `app.js`: The core logic that handles MetaMask connections, ABI parsing, and blockchain communication.
* `style.css`: Modern, dark-mode styling with a focus on Web3 aesthetics and mobile responsiveness.

## 🚀 How to Run Locally

1. Ensure you have **MetaMask** installed in your browser.
2. Open the project folder in **VS Code**.
3. Right-click `index.html` and select **"Open with Live Server"** (this is required for MetaMask to detect the site correctly).
4. Paste your Contract Address and ABI into the Setup card and click **Load Contract**.

---

**This README is ready to be added t