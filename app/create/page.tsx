"use client";

import { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import ConfirmModal from "@/pages/confirm-modal";

export default function CreateCommitmentCard() {
  const [stake, setStake] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen text-neutral-400 bg-neutral-900/70  flex items-center justify-center px-6">
      <div className="w-full max-w-2xl bg-neutral-900/70 backdrop-blur-xl border border-neutral-800 rounded-3xl p-10 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create Commitment
          </h1>
          <WalletMultiButton />
        </div>

        <div className="space-y-8">

          {/* Goal */}
          <div>
            <label className="block text-sm text-neutral-400 mb-2">
              Goal Title
            </label>
            <input
              type="text"
              placeholder="Run 5km daily"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm text-neutral-400 mb-2">
              Duration
            </label>
            <div className="grid grid-cols-5 gap-3">
              {["15", "30", "45", "60", "Custom"].map((d) => (
                <button
                  key={d}
                  className="py-2 rounded-xl border border-neutral-700 bg-neutral-800 hover:border-green-500 transition"
                >
                  {d} {d !== "Custom" && "Days"}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm text-neutral-400 mb-2">
              Frequency
            </label>
            <div className="grid grid-cols-4 gap-3">
              {["4 Days/Week", "5 Days/Week", "6 Days/Week", "Custom"].map((f) => (
                <button
                  key={f}
                  className="py-2 rounded-xl border border-neutral-700 bg-neutral-800 hover:border-green-500 transition"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Stake */}
          <div>
            <label className="block text-sm text-neutral-400 mb-2">
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
            <div className="mt-3 text-lg font-semibold text-green-400">
              {stake} SOL
            </div>

            <div className="mt-4 p-4 rounded-xl bg-red-900/20 border border-red-800 text-red-400 text-sm">
              If you fail, {stake} SOL will be transferred to the penalty account.
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-500 transition font-semibold text-lg"
          >
            Create Commitment
          </button>
        </div>
      </div>

      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          alert("Send transaction here");
        }}
        stake={stake}
      />
    </div>
  );
}