import type { ReactElement } from "react"


// export type Variant = "Primary" | "Secondary" | "Tertiary"

export const Variant = {
    PRIMARY : "bg-[#202127] hover:bg-[#14151b]",
    SECONDARY: `bg-violet-800 text-white/80
     hover:bg-violet-700 hover:text-white `,
    TERTIARY: `bg-violet-950 text-violet-300 
      hover:bg-voilet-900 text-white-400`


}

interface Button {
    children: ReactElement | String,
    variant: String,
    styles?: String,
    icons?: Boolean,
    onClick?: () => void 

}

export const Button = ({children, styles, variant, onClick}: Button) => {
  return (

    <button className={`
        ${styles}
        ${variant}
    rounded-xl py-3
    w-full`}
    onClick={onClick}
    >
            {children}
        </button>
    )
}

{/* <BiArrowBack size={20}  */}
// className="-rotate-180"></BiArrowBack>