import React from 'react'

const LabelInput = () => {
  return (
    <>
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
            </div>
    </>
  )
}

export default LabelInput