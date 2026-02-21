import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";


import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import {
  AnchorProvider,
  Program,
  BN,
} from "@project-serum/anchor";
import type { Idl } from "@project-serum/anchor";
import { PublicKey, clusterApiUrl } from "@solana/web3.js";
// import idl from "./idl.json"; // your program's IDL JSON file

import "@solana/wallet-adapter-react-ui/styles.css";

const PROGRAM_ID = new PublicKey("AxrxjfFsTTai8kP2BX9Wprw1ht1GeNbyQFzrU17hEfPo"); // replace this
const queryClient = new QueryClient();

export default function Favorite() {
  const endpoint = clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);
  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <MainApp />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  );
}

function Page() {
  const wallet = useWallet();
  const {connection} = useConnection() 


  // 1️⃣ Set up provider + program (no CLI needed)
  const provider = useMemo(() => {
    if (!wallet) return null;
    return new AnchorProvider(connection, wallet as any, {
      preflightCommitment: "confirmed",
    });
  }, [wallet, connection]);

  const program = useMemo(() => {
    if (!provider) return null;
    return new Program(idl as Idl, PROGRAM_ID, provider);
  }, [provider]);

  // 2️⃣ Derive user PDA
  const [pda, bump] = useMemo(() => {
    if (!wallet.publicKey) return [null, null];
    return PublicKey.findProgramAddressSync(
      [Buffer.from("favorite"), wallet.publicKey.toBuffer()],
      PROGRAM_ID
    );
  }, [wallet.publicKey]);


  interface Ifavorite{
    color: string,
    number: number, 
    hobbies: string []

  }

  // 4️⃣ Local input state
  const [number, setNumber] = useState("");
  const inputRef= useRef<HTMLInputElement>(null)
  const [hobbies, setHobbies] = useState<string []>([]);
  const [color, setColor] = useState("");
  const [favorite, setFavorite] = useState<Ifavorite>(JSON.parse(localStorage.getItem("favorite")!) || {
    color: "",
    number: 0, 
    hobbies: []
  })

  async function handleSetFavorite() {
    if (!wallet.publicKey || !program || !pda) return;

    try {
      const txSig = await program.methods
        .setFavorites(color, new BN(Number(number)), hobbies)
        .accounts({
          user: wallet.publicKey,
          favoriteAcc: pda,
          systemProgram: new PublicKey("11111111111111111111111111111111"),
        })
        .rpc();

      console.log("TX:", txSig);
      setNumber("");
      setHobbies([]);
      alert("Favorite saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving favorite");
    }
  }

  // 3️⃣ Fetch favorite data from PDA
  async function handleFetch() {
    if (!pda || !program) return null;
      try {
        console.log("Fetching start ...")
        const account = await program.account.favorites.fetch(pda);
        console.log(account.color);
        console.log(account.number.toNumber())
        console.log(JSON.stringify(account.hobbies))
        localStorage.setItem("favorite", JSON.stringify({
          color : account.color,
          number: account.number.toNumber(),
          hobbies: account.hobbies,
        }))
        setFavorite({
          color : account.color,
          number: account.number.toNumber(),
          hobbies: account.hobbies,
          // timestamp: account.timestamp.toNumber(),
        })
      } catch {
        console.log("no pda found yet of address " + pda)
        return null;
      }
    
  }

  const handleChange = () => {
   
    //@ts-ignore
    const inputValue = inputRef.current.value;
    const hobbies = inputValue.split(",")
    .map((x) => x.trim())
    .filter(Boolean);
    console.log(hobbies)
    setHobbies(hobbies);
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Solana Favorite App (PDA)</h1>
          <WalletMultiButton />
        </header>

        {wallet.connected ? (
          <>
            <p className="text-gray-600 mb-2">
              <b>Wallet:</b> {wallet.publicKey?.toBase58()}
            </p>
            <p className="text-gray-600 mb-4">
              <b>PDA:</b> {pda?.toBase58()}
            </p>

            <div className="bg-gray-100 p-3 rounded mb-4">
              {favorite.number && favorite.color ? (
                <>
                  <p>
                    <b>number:</b> {favorite.number}
                  </p>
                  <p>
                    <b>color:</b> {favorite.color}
                  </p>
                  <p>
                    <b>hobbies:</b> {favorite.hobbies.map((hobbie, index) => (<span key={index + 1}>{hobbie}, </span>))}
                  </p>
        
                </>
              ) : (
                <p className="text-gray-500">No favorite found — set one!</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <input
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Favorite number"
                className="border rounded p-2"
              />
               <input
      
                onChange={(e) => setColor(e.target.value)}
                placeholder="Favorite Color"
                className="border rounded p-2"
              />
              <input
                // onChange={(e) => setHobbies(["CS", "Football"])}
                ref={inputRef} 
                onChange={handleChange}
                placeholder="Hobbies"
                className="border rounded p-2"
              />
              <button
                onClick={handleSetFavorite}
                disabled={!number || !hobbies}
                className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 disabled:opacity-60"
              >
                Save Favorite
              </button>
              <br></br>
              <button
                onClick={handleFetch}
                className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 disabled:opacity-60"
              >
                Fetch
              </button>
              
            </div>
          </>
        ) : (
          <div className="text-gray-600">Please connect your wallet.</div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          <div>
            This app uses:
            <ul className="list-disc ml-5">
              <li>@project-serum/anchor (JS only — no CLI)</li>
              <li>TanStack Query for data fetching</li>
              <li>PDA derived using seed “favorite”</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
