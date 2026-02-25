
interface LabelInputProps {
    label: string,
    INPUT_TYPES: string[],
    inputType: string,
    setInputType: (inputType: string) => void,
    customInputType?: string,
    setCustomInputType?: (input: string) => void,
    placeholder?: string,
}


const LabelInput = ({label, INPUT_TYPES, inputType, setInputType, customInputType, setCustomInputType, placeholder}: LabelInputProps) => {
  return (
    <>
            {/* Input */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                {label}
              </label>
              <div className="grid grid-cols-5 gap-3">
                {INPUT_TYPES.map((item) => (
                    <button
                    key={item}
                    onClick={() => setInputType(item)}
                    className={`py-2 rounded-xl border ${
                        inputType === item
                        ? "bg-green-600 border-green-600 text-white"
                        : "bg-zinc-800 border-zinc-700 text-zinc-300"
                    }`}
                    >
                    {item} 
                  </button>
  
                ))}
              </div>
  

            {/* Custom Input */}
              {inputType.toLowerCase() === "custom" && setCustomInputType && (
                  <input
                  type="text"
                  placeholder={placeholder}
                  className="mt-4 w-full bg-zinc-800 text-white 
                  rounded-xl px-4 py-3 outline-none focus:ring focus:ring-green-500"
                  value={customInputType}
                  onChange={(e) => setCustomInputType(e.target.value)}
                  />
                )}
            </div>

    </>
  )
}

export default LabelInput