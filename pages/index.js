import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState } from "react";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        11155111: "https://rpc.sepolia.org", // Public Sepolia RPC
      },
    },
  },
};

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);

  async function connect() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
    });

    try {
      const provider = await web3Modal.connect();
      const accounts = await provider.request({ method: "eth_accounts" });
      const address = accounts[0];
      console.log("Connected wallet:", address);
      setWalletAddress(address);
    } catch (error) {
      if (error.message === "User closed modal") {
        console.log("User canceled wallet connection.");
      } else {
        console.error("Connection error:", error);
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Web3Modal Example</title>
      </Head>

      <main>
        <h1>Connect Your Wallet</h1>
        {!walletAddress ? (
          <button onClick={connect}>Connect Wallet</button>
        ) : (
          <p>✅ Connected: {walletAddress}</p>
        )}
      </main>
    </div>
  );
}
