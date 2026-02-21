interface LabelInputProps {
    type: String,
    title: String,
    placeholder: String,
    onChange?: () => void
}

const LabelInput = ({type, placeholder, onChange, title}: LabelInputProps) => {
  return (
    <label>
    {title}
    <input type={type.toString()} placeholder={placeholder.toString()}
    className="bg-[#202127] outline-none 
    py-2 px-4 w-full
    rounded-xl ring ring-gray-700 mt-2">
    </input>

</label>
  )
}

export default LabelInput