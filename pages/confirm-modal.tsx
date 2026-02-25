"use client";

import { motion, AnimatePresence } from "framer-motion";


interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    stake: number;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  stake,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-neutral-900 rounded-2xl p-8 w-full max-w-md border border-neutral-800 shadow-2xl"
          >
            <h2 className="text-xl text-white font-semibold mb-4">
              Confirm Commitment
            </h2>

            <p className="text-neutral-400 mb-6">
              You are staking{" "}
              <span className="text-green-400 font-semibold">
                {stake} SOL
              </span>.
              <br />
              This action is irreversible once confirmed on-chain.
            </p>

            <div className="flex gap-4 text-white">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 transition font-semibold"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}