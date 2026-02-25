"use client"
import {
    ConnectionProvider,
    WalletProvider,
    useConnection,
    useWallet,
  } from "@solana/wallet-adapter-react";
  import {
    WalletModalProvider,
  } from "@solana/wallet-adapter-react-ui";
  
  

import "@solana/wallet-adapter-react-ui/styles.css"
import Home from "@/pages/home";
import { clusterApiUrl } from "@solana/web3.js";

  
  const Page = () => {
    return (
      <main className="min-h-screen flex bg-black/95
      justify-center items-center">
        <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
          <WalletProvider wallets={[]}>
            <WalletModalProvider>
            {/* <AddWalletPopup></AddWalletPopup> */}
            <Home></Home>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </main>
      )
  }
  
  export default Page