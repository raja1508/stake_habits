import { useState } from "react";
import ConfirmModal from "./confirm-modal";

export default function CreateCommitment() {
  const [stake, setStake] = useState(1);
  const [category, setCategory] = useState("Workout")
  const [duration, setDuration] = useState("30");
  const [frequency, setFrequency] = useState("5");
  const [verification, setVerification] = useState("manual");
  const [modalOpen, setModalOpen] = useState(false);

  return (
      <div className=" bg-zinc-900 w-[45%] rounded-2xl my-10 shadow-xl p-8 border border-zinc-800">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Create Commitment
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
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Category
            </label>
            <div className="grid grid-cols-5 gap-2">
              {["Study", "Workout", "Coding", "Meditation", "Custom"].map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`py-2 rounded-xl border ${
                    category === item
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-zinc-800 border-zinc-700 text-zinc-300"
                  }`}
                >
                  {item} 
                </button>

              ))}
            </div>

            {category === "Custom" && (
                <input
                type="text"
                placeholder="Run 5km daily"
                className="mt-4 w-full bg-zinc-800 text-white 
                rounded-xl px-4 py-3 outline-none focus:ring focus:ring-green-500"
                />
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Duration
            </label>
            <div className="grid grid-cols-5 gap-3">
              {["15", "30", "45", "60", "custom"].map((item) => (
                <button
                  key={item}
                  onClick={() => setDuration(item)}
                  className={`py-2 rounded-xl border ${
                    duration === item
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-zinc-800 border-zinc-700 text-zinc-300"
                  }`}
                >
                  {item === "custom" ? "Custom" : `${item} days`}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Frequency
            </label>
            <div className="grid grid-cols-4 gap-3">
              {["4", "5", "6", "custom"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFrequency(item)}
                  className={`py-2 rounded-xl border ${
                    frequency === item
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-zinc-800 border-zinc-700 text-zinc-300"
                  }`}
                >
                  {item === "custom"
                    ? "Custom"
                    : `${item} days/week`}
                </button>
              ))}
            </div>
          </div>

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
              {[
                { id: "manual", label: "Manual Proof" },
                { id: "photo", label: "Photo Upload" },
                { id: "gps", label: "GPS Check-in" },
                { id: "streak", label: "Streak Tracking" },
              ].map((method) => (
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
          alert("Send transaction here");
        }}
        stake={stake}
      />
      </div>
  );
}