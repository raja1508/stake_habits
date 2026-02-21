import { CgCross } from "react-icons/cg"
import { Button, Variant } from "./button"

export const AddWalletPopup = () => {
  return (
    <div className="min-h-screen flex justify-center items-center
     bg-[#0e0f14] relative">

            <div className="w-96 ring ring-gray-800 absolute
            rounded-lg px-6 py-3 text-white/80 font-semibold">
            <CgCross className="-rotate-45 absolute 
            right-4 top-2 hover:text-gray-400" 
            size={20}
            onClick={() => {}}
            ></CgCross>
            <div className="text-xl mb-5 text-center">
                Add Solana Wallet
            </div>

            <div className="flex-col space-y-4 gap-4">
                <p className="text-center text-gray-400">
                    Use existing recovery phrase
                </p>
                <Button variant={Variant.PRIMARY}
                styles={"hover:bg-[#14151b]"}
                onClick={() => {}}
                >
                    Create a wallet
                </Button>

                <p className="text-center text-gray-400">
                    Import Wallet
                </p>
                <Button variant={Variant.PRIMARY}
                styles={"hover:bg-[#14151b]"}
                onClick={() => {}}>
                    Recovery Phrase
                </Button>
                <Button variant={Variant.PRIMARY}
                styles={"hover:bg-[#14151b]"}
                onClick={() => {}}>
                    Private Key
                </Button>
            </div>



        </div>
    </div>
  )
}
