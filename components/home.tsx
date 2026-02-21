"use client"
import {
    useConnection,
    useWallet,
  } from "@solana/wallet-adapter-react";
import {
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
import idl from "../app/idl.json" // your program's IDL JSON file
import { Button, Variant } from "./button";
import { CgCross } from "react-icons/cg";
import { useState } from "react";
import CreateCommitment from "./create-commitment";


const Home = () => {
  const [popup, setPopup] = useState(false);

  if(popup) {
    return (
      <CreateCommitment onClick={() => setPopup(false)}></CreateCommitment>
    )
  }
  //  bg-[#0e0f14] 
  return (  
            <section className="w-96 ring ring-gray-800 relative
            rounded-lg px-6 py-3 text-white/80 font-semibold">
            <CgCross className="-rotate-45 absolute 
            right-4 top-2 hover:text-gray-400" 
            size={20}
            onClick={() => {}}
            ></CgCross>
            <div className="text-xl mb-2 text-center">
                Put Your Money
            </div>

            <div className="flex-col space-y-4 gap-4">
                <p className="text-center text-gray-400">
                    where your goals are
                </p>
                <Button variant={Variant.PRIMARY}
                onClick={() => setPopup(true)}
                >
                    Create Commitment
                </Button>
                <Button variant={Variant.PRIMARY}
                onClick={() => {}}>
                    Join the Challenge
                </Button>

                <WalletMultiButton
                className="rounded-xl py-3"></WalletMultiButton>
            </div>
        </section>

  )
}

export default Home