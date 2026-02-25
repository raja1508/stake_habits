"use client"
import { useState } from "react";
import ConfirmModal from "./confirm-modal";
import LabelInput from "@/components/LabelInput";
import { title } from "process";
import { stringify } from "querystring";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";

interface Data {
    title: string,
    category: string,
    duration: number,
    frequency: number,
    stake: number,
    proof_method: string
}

// title: : string,
// category: string,
// proof_method: string

// "id": "1",
// "user": "3UhGGqTBSjHTTtTnngpULspXA7hU7bktafQgDhhzuoBY",
// "penaltyAccount": "3UhGGqTBSjHTTtTnngpULspXA7hU7bktafQgDhhzuoBY",
// "stakeAmount": "100000000",
// "startTime": "1771637339",
// "endTime": "1871637339",
// "completedCheckins": "0",
// "requiredCheckins": "2",
// "lastCheckins": "1771645099",
// "status": {
//   "active": {}
// },
// "bump": 253

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import {
  AnchorProvider,
  Program,
  BN,
  Wallet,
} from "@project-serum/anchor";
import type { Idl } from "@project-serum/anchor";
import idl from "../idl/idl.json";
import { StakeHabits } from "@/idl/types";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";


export default function CreateCommitment() {
    const DURATIONS = ["15 days", "30 days", "45 days", "60 days", "Custom"];
    const CATERGORIES = ["Study", "Workout", "Coding", "Meditation", "Custom"];
    const FREQEUENCIES = ["2 days/week", "3 days/week", "4 days/week", "5 days/week", "6 days/week"]
    const PROOF_METHODS = [
        { id: "manual", label: "Manual Proof" },
        { id: "photo", label: "Photo Upload" },
        { id: "gps", label: "GPS Check-in" },
        { id: "streak", label: "Streak Tracking" },
    ]
    const [stake, setStake] = useState(1);
    const [category, setCategory] = useState("Workout")
    const [customCategory, setCustomCategory] = useState("");
    const [duration, setDuration] = useState("30")
    const [customDuration, setCustomDuration] = useState("")
    const [frequency, setFrequency] = useState("5");
    const [verification, setVerification] = useState("manual");
    const [modalOpen, setModalOpen] = useState(false);


    const wallet = useWallet();
    const user = useAnchorWallet()
    const {connection} = useConnection();
    const provider = new AnchorProvider(connection, wallet as any, {
        preflightCommitment: "confirmed",
      })

    const programAddress = new PublicKey("nJoMrPBAnTyTn551UvMvaRqzVfQFQSUhDf6TTkzQkxE")
    const program = new Program<StakeHabits>(idl as StakeHabits, programAddress, provider)

    
    async function handleCreateCommitment() {
      try {
        if (!program) {
          console.log("Program not ready");
          return;
        }
    
        if (!wallet || !wallet.publicKey) {
          console.log("Wallet not connected");
          return;
        }
    
        console.log("RPC:", connection.rpcEndpoint);
        console.log("Wallet:", wallet.publicKey.toBase58());
    
        // Example values
        const commitmentId = new BN(Date.now());
        const stakeAmount = new BN(stake * LAMPORTS_PER_SOL); // SOL to lamports
        const startTime = new BN(Math.floor(Date.now() / 1000));
        const endTime = new BN(startTime.toNumber() + 30 * 24 * 60 * 60);
        const requiredCheckins = new BN(5);
    
        // Example PDA (adjust seeds to your program logic)
        const [commitmentPda] = await PublicKey.findProgramAddress(
          [
            Buffer.from("commitment"),
            wallet.publicKey.toBuffer(),
            commitmentId.toArrayLike(Buffer, "le", 8),
          ],
          program.programId
        );
    
        const txSignature = await program.methods
          .createCommitment(
            commitmentId,
            stakeAmount,
            startTime,
            endTime,
            requiredCheckins
          )
          .accounts({
            user: wallet.publicKey,
            commitmentAccount: commitmentPda,
            failureAccount: wallet.publicKey, // or another account
            systemProgram: SystemProgram.programId,
          })
          .rpc();
    
        console.log("Transaction Signature:", txSignature);
        const status = await connection.getSignatureStatus(txSignature);
        console.log(status.value?.confirmationStatus);
    
      } catch (err) {
        console.error("Transaction failed:", err);
      }


    }
  return (
      <div className=" bg-zinc-900 w-[45%] rounded-2xl my-10 shadow-xl p-8 border border-zinc-800">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold relative text-white/90
         mb-6 text-center uppercase">
          Create Commitment
          {/* Create a Custom Button */}
          <span className="absolute -right-2 -top-2">
          <WalletMultiButton></WalletMultiButton>
          </span>
        </h1>

        {/* Goal Section */}
        <div className="space-y-5">
          
          {/* Title Input */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Goal Title
            </label>
            <input
              type="text"
              placeholder="Run 5km daily"
              className="w-full bg-zinc-800 text-white rounded-xl px-4 py-3 outline-none focus:ring focus:ring-green-500"
            />
          </div>

          {/* Category */}
            <LabelInput 
                label="Category"
                INPUT_TYPES={CATERGORIES}
                inputType={category}
                setInputType={setCategory}
                customInputType={customCategory}
                setCustomInputType={setCustomCategory}>

            </LabelInput>

          {/* Duration */}

          <LabelInput 
            label="Duration (Days)"
            INPUT_TYPES={DURATIONS}
            inputType={duration}
            setInputType={setDuration}
            customInputType={customDuration}
            setCustomInputType={setCustomDuration}>
          </LabelInput>

          {/* Frequency */}
            <LabelInput
                label="Frequency (Days/Week)"
                INPUT_TYPES={FREQEUENCIES}
                inputType={frequency}
                setInputType={setFrequency}
                >

            </LabelInput>

          {/* Stake Amount */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Stake Amount (SOL)
            </label>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={stake}
              onChange={(e) => setStake(Number(e.target.value))}
              className="w-full accent-green-500"
            />
            <div className="mt-2 text-green-400 font-semibold">
              {stake} SOL
            </div>

            {/* Risk Preview */}
            <div className="mt-3 p-3 bg-red-900/20 border border-red-800 rounded-lg text-sm text-red-400">
              If you fail, <span className="font-semibold">{stake} SOL</span> will be transferred to the penalty account.
            </div>
          </div>

          {/* Verification Method */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Verification Method
            </label>
            <div className="grid grid-cols-4 gap-3">
              {PROOF_METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setVerification(method.id)}
                  className={`py-2.5 rounded-xl border ${
                    verification === method.id
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-zinc-800 border-zinc-700 text-zinc-300"
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
            onClick={() => setModalOpen(true)}
            disabled={!wallet.connected}
          className="mt-8 w-full bg-green-600 hover:bg-green-500 transition-all text-white py-3 rounded-xl font-semibold"
        >
          Create Commitment
        </button>

        <p className="text-xs text-zinc-500 text-center mt-4">
          This action is irreversible once confirmed on-chain.
        </p>

        <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          handleCreateCommitment()
        }}
        stake={stake}
      />
      </div>
  );
}