"use client"
import {
    ConnectionProvider,
    WalletProvider,
    useConnection,
    useWallet,
  } from "@solana/wallet-adapter-react";
  import {
    WalletModalProvider,
    WalletMultiButton,
  } from "@solana/wallet-adapter-react-ui";
  
  
  import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
  import {
    AnchorProvider,
    Program,
    BN,
  } from "@project-serum/anchor";
  import type { Idl } from "@project-serum/anchor";
  import { PublicKey, clusterApiUrl } from "@solana/web3.js";
  import idl from "./idl.json"; // your program's IDL JSON file
import "@solana/wallet-adapter-react-ui/styles.css"
import Home from "@/pages/home";

  
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