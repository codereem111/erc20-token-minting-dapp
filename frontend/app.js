(function () {
  // Use ethers v5 syntax as per your library import
  const { ethers } = window;

  // UI Elements
  const connectBtn = document.getElementById('connectBtn');
  const accountEl = document.getElementById('account');
  const networkEl = document.getElementById('network');
  const contractAddressInput = document.getElementById('contractAddress');
  const abiInput = document.getElementById('abiInput');
  const loadBtn = document.getElementById('loadBtn');
  const balanceEl = document.getElementById('balance');
  const statusEl = document.getElementById('status');
  const transferStatusEl = document.getElementById('transferStatus');

  let provider, signer, userAddress, contract;
  let currentSymbol = "Tokens";

  function log(msg, isError) {
    const time = new Date().toLocaleTimeString();
    statusEl.textContent = `[${time}] ${msg}\n` + statusEl.textContent;
    statusEl.style.color = isError ? '#ff6b6b' : '#9aa6b2';
  }

  // FIX: Better MetaMask Detection for 2026 browsers
  async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      log("Error: MetaMask not found.", true);
      alert("MetaMask not detected! If you are opening this file directly (file://), try using VS Code 'Live Server' or uploading to a host like GitHub Pages.");
      return;
    }

    try {
      provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      userAddress = await signer.getAddress();
      
      const net = await provider.getNetwork();
      accountEl.textContent = `Connected: ${userAddress.substring(0, 6)}...${userAddress.slice(-4)}`;
      networkEl.textContent = `Network: ${net.name} (ChainID: ${net.chainId})`;
      
      log("Wallet connected.");
      if (contract) refreshBalance();
    } catch (err) {
      log("Connection failed: " + err.message, true);
    }
  }

  async function loadContract() {
    const addr = contractAddressInput.value.trim();
    const abiStr = abiInput.value.trim();

    if (!addr || !abiStr) {
      log("Error: Missing Address or ABI.", true);
      return;
    }

    try {
      const abi = JSON.parse(abiStr);
      contract = new ethers.Contract(addr, abi, signer || provider);
      
      // DYNAMIC: Auto-detect Token Details
      currentSymbol = await contract.symbol();
      const name = await contract.name();
      
      // Update all labels in the HTML automatically
      document.querySelectorAll('.token-symbol-label').forEach(el => el.textContent = currentSymbol);
      log(`Success: Loaded ${name} (${currentSymbol})`);
      
      refreshBalance();
    } catch (err) {
      log("Load failed. Check ABI format and Address.", true);
    }
  }

  async function refreshBalance() {
    if (!contract || !userAddress) return;
    try {
      const decimals = await contract.decimals();
      const rawBal = await contract.balanceOf(userAddress);
      const formatted = ethers.utils.formatUnits(rawBal, decimals);
      balanceEl.textContent = `${formatted} ${currentSymbol}`;
    } catch (err) {
      log("Balance check failed.", true);
    }
  }

  async function transferTokens() {
    const to = document.getElementById('recipientAddress').value;
    const amt = document.getElementById('transferAmount').value;
    
    if (!contract || !signer) return log("Connect wallet first!", true);

    try {
      transferStatusEl.textContent = "Sign in MetaMask...";
      const decimals = await contract.decimals();
      const amount = ethers.utils.parseUnits(amt, decimals);

      const tx = await contract.transfer(to, amount);
      transferStatusEl.textContent = "Transaction pending...";
      await tx.wait();
      
      transferStatusEl.textContent = "Success!";
      log(`Sent ${amt} ${currentSymbol} to ${to.substring(0,6)}...`);
      refreshBalance();
    } catch (err) {
      transferStatusEl.textContent = "Failed: " + (err.reason || "Error");
    }
  }

  // Event Listeners
  connectBtn.addEventListener('click', connectWallet);
  loadBtn.addEventListener('click', loadContract);
  document.getElementById('sendBtn').addEventListener('click', transferTokens);
  document.getElementById('refreshBalance').addEventListener('click', refreshBalance);
})();