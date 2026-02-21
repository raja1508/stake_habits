import React, { useRef } from 'react'
import { CgCross } from 'react-icons/cg'
import { Button, Variant } from './button'
import LabelInput from './label-input';
import { title } from 'process';

const CreateCommitment = ({onClick}: {onClick: () => void}) => {
    const inputRef = useRef(null);

  return (
    <section className="w-96 ring ring-gray-800
    rounded-lg px-6 py-3 text-white/80 font-semibold relative">
        <CgCross className="-rotate-45 absolute 
        right-2 top-2 hover:text-gray-400" 
        size={20}
        onClick={onClick}
        ></CgCross>
        
        <div className="text-2xl mb-5 text-center">
            Create Commitment
        </div>
        
        <div className="text-gray-400 
        leading-5 text-center px-6">
            
        </div>

        <LabelInput 
        type={"text"} 
        placeholder={"Goal Type"}
        title={"Goal Type"}>
        </LabelInput>

        <LabelInput 
        type={"text"} 
        placeholder={"Frequency"}
        title={"Frequency"}>

        </LabelInput>

        <LabelInput 
        type={"text"} 
        placeholder={"Frequency"}
        title={"Frequency"}>

        </LabelInput>

    
        <Button variant={Variant.SECONDARY} 
            styles={"font-semibold mt-20"} 
            onClick={() => {}}
            >
            Lock 1 SOL
        </Button>

        </section>
  )
}

export default CreateCommitment