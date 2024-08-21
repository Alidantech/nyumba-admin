import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
  }
}

type SetWalletAddress = (address: string) => void;
type SetWalletBalance = (balance: string) => void;

export const connectWallet = async (
  setWalletAddress: SetWalletAddress,
  setWalletBalance: SetWalletBalance
): Promise<void> => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      await getWalletBalance(accounts[0], setWalletBalance);
    } catch (err: any) {
      console.error(err.message);
    }
  } else {
    console.log("Please install MetaMask");
  }
};

export const getCurrentWalletConnected = async (
  setWalletAddress: SetWalletAddress,
  setWalletBalance: SetWalletBalance
): Promise<void> => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      const accounts: string[] = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
        await getWalletBalance(accounts[0], setWalletBalance);
      } else {
        console.log("Connect to MetaMask using the Connect button");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  } else {
    console.log("Please install MetaMask");
  }
};

export const addWalletListener = (
  setWalletAddress: SetWalletAddress,
  setWalletBalance: SetWalletBalance
): void => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.on("accountsChanged", async (accounts: string[]) => {
      setWalletAddress(accounts[0]);
      console.log(accounts[0]);
      await getWalletBalance(accounts[0], setWalletBalance);
    });
  } else {
    setWalletAddress("");
    setWalletBalance("");
    console.log("Please install MetaMask");
  }
};

export const disconnectWallet = (
  setWalletAddress: SetWalletAddress,
  setWalletBalance: SetWalletBalance
): void => {
  setWalletAddress("");
  setWalletBalance("");
  console.log("Wallet disconnected");
};

export const getWalletBalance = async (
  walletAddress: string,
  setWalletBalance: SetWalletBalance
): Promise<void> => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      const web3 = new Web3(window.ethereum);
      const balance: string = (await web3.eth.getBalance(walletAddress)).toString();
      // console.log(balance);
      setWalletBalance(balance);
    } catch (err: any) {
      console.error(err.message);
    }
  }
};


// Function to fetch the ETH/USD exchange rate
const fetchEthToUsdRate = async (): Promise<number> => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
    const data = await response.json();
    return data.ethereum.usd;
  } catch (error) {
    console.error("Failed to fetch ETH/USD rate:", error);
    return 0; // Default to 0 if there's an error
  }
};

// Function to format the balance to dollars
export const formatBalance = async (balance: string): Promise<string> => {
  const web3 = new Web3();
  const etherBalance = web3.utils.fromWei(balance, "ether");
  const ethToUsdRate = await fetchEthToUsdRate();
  const dollarBalance = parseFloat(etherBalance) * ethToUsdRate;
  return dollarBalance.toFixed(2);
};