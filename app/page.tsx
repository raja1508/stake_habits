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
import Home from "@/components/home";
import { AddWalletPopup } from "@/components/wallet";
import "@solana/wallet-adapter-react-ui/styles.css"

  
  const Page = () => {
    return (
      <main className="min-h-screen flex justify-center items-center">
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