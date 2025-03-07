"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Wallet, ChevronRight, CheckCircle, Copy, ExternalLink, AlertCircle } from "lucide-react"
import { Eip1193Provider, ethers } from "ethers"
// import contractABI from "@/abi/abi.json"
// import merkleProofs from "@/data/merkleProofs.json"

// ABI and merkle proofs
const contractABI = [
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "merkleProof",
        type: "bytes32[]",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]

interface MerkleProofs {
  [key: string]: string[];
}


const merkleProofs: MerkleProofs = {
  "0xF2aE212BfC755508a088bfADc985Db391bBFDec8": [
    "0x4adaa55a1ec52d60a2765522c7caa5a9fc7b4f872af5fb264f64b223476a4142",
    "0x648fed09dd6f45b3f0990c4c2113fe0a07c2080cd14941c4815c00c75b1745ee",
    "0x77f2c1aa79622da5e76bf471fd213a6d50ee4b3140e233a4a92292b9eaf2d0bc",
  ],
  "0xfb1573907b4c47A1e367C887Eb7bbB20069963fb": [
    "0x6d5ef22a5df7705cb73500d89b8c2fe46c54d67110f6dc3bdb5980d0b4666104",
    "0x648fed09dd6f45b3f0990c4c2113fe0a07c2080cd14941c4815c00c75b1745ee",
    "0x77f2c1aa79622da5e76bf471fd213a6d50ee4b3140e233a4a92292b9eaf2d0bc",
  ],
  "0x50e20E505b173e94A4337F324434eF48AAF2bC7F": [
    "0xc57ad6e64387a66020d162358e276f836c07dda945db4adef48863c8ee758d1f",
    "0x91e01616a19b0e05ad87c3bde93e353203b2119c8d3f861b4bdff3a2030f3b8a",
    "0x77f2c1aa79622da5e76bf471fd213a6d50ee4b3140e233a4a92292b9eaf2d0bc",
  ],
  "0x022792c5bFBfA056b80D38c6B672d6e2918e8673": [
    "0x8f66ed6367da324c1ab0ecab7af7ad1574994691ed386749a39002bd63f82d82",
    "0x91e01616a19b0e05ad87c3bde93e353203b2119c8d3f861b4bdff3a2030f3b8a",
    "0x77f2c1aa79622da5e76bf471fd213a6d50ee4b3140e233a4a92292b9eaf2d0bc",
  ],
  "0x1e7d0d69e047D4Df5996D5382E67485161b33855": [
    "0xc0d1757a11ac5f3bb86bc44746457e17ef8212a7bb828ef1b1eb8e7465d6ded6",
    "0xd13e002713e6cf9efc3257f1a7a1a1b19e888e655dce35ea99b6de7f142d5d25",
  ],
  "0x6e5294609A847687e06008d639a8103dcAebFbed": [
    "0x187aece0a1c1ed0ed8487a3e6c262d93f62873220a10e0db08f81b6d46311ad3",
    "0xd13e002713e6cf9efc3257f1a7a1a1b19e888e655dce35ea99b6de7f142d5d25",
  ],
}


// Contract address (example)
const CONTRACT_ADDRESS = "0xc60a3c8229FccF456208cEe3F71CcD23252bbCdc"

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}


export default function AirdropPage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [account, setAccount] = useState("")
  const [isEligible, setIsEligible] = useState(false)
  const [hasClaimed, setHasClaimed] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [alertInfo, setAlertInfo] = useState({ show: false, type: "", message: "" })

  // Check if MetaMask is installed
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        showAlert("error", "MetaMask is not installed. Please install MetaMask to continue.")
        return false
      }
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  // Connect wallet
  const handleConnectWallet = async () => {
    try {
      const hasWallet = await checkIfWalletIsConnected()
      if (!hasWallet) return

      const { ethereum } = window
      const accounts = await ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length > 0) {
        const account = accounts[0]
        setAccount(account)
        setWalletConnected(true)

        checkEligibility(account)
        checkIfClaimed(account)
      } else {
        showAlert("error", "No authorized accounts found.")
      }
    } catch (error: unknown) {
      console.error(error)
      if ((error as { code: number }).code === 4001) {
        showAlert("error", "User rejected the connection request.")
      } else {
        showAlert("error", "Error connecting wallet. Please try again.")
      }
    }
  }

  // Check if address is eligible for airdrop
  const checkEligibility = (address: string) => {
    const normalizedAddress = address.toLowerCase()
    const isInList = Object.keys(merkleProofs).some((addr) => addr.toLowerCase() === normalizedAddress)

    setIsEligible(isInList)

    if (!isInList) {
      showAlert("warning", "Your address is not eligible for this airdrop.")
    } else {
      showAlert("success", "Congratulations! Your address is eligible for the airdrop.")
    }
  }

  // Check if address has already claimed
  const checkIfClaimed = async (address: string) => {
    try {
      const { ethereum } = window;
      if (!ethereum) return

      const provider = new ethers.BrowserProvider(ethereum)
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider)

      const claimed = await contract.hasClaimed(address)
      setHasClaimed(claimed)

      if (claimed) {
        showAlert("info", "You have already claimed your tokens.")
      }
    } catch (error) {
      console.error("Error checking claim status:", error)
    }
  }

  // Claim tokens
  const handleClaim = async () => {
    if (!isEligible) {
      showAlert("error", "Your address is not eligible for this airdrop.")
      return
    }

    if (hasClaimed) {
      showAlert("warning", "You have already claimed your tokens.")
      return
    }

    try {
      setClaiming(true)
      const { ethereum } = window;
      if (!ethereum) return
      // Get the Merkle proof for the connected address;
      const proof = merkleProofs["0x50e20E505b173e94A4337F324434eF48AAF2bC7F"]
      console.log("Merkle proof for account:", proof)
      if (!proof || proof.length === 0) {
        showAlert("error", "No Merkle proof found for your address.");
        return;
      }

      const proofBytes32 = proof.map(p => ethers.getBytes(p))
      console.log("Proof bytes32", proofBytes32)
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer)

      // // Call claim function
      const tx = await contract.claim(proofBytes32)
      setTxHash(tx.hash)

      // Wait for transaction to be mined
      await tx.wait()

      setHasClaimed(true)
      showAlert("success", "Successfully claimed 1000 CTK tokens!")
    } catch (error: unknown) {
      console.error("Error claiming tokens:", error)
      if ((error as { code: number }).code === 4001) {
        showAlert("error", "Transaction rejected by user.")
      } else {
        showAlert("error", "Error claiming tokens. Please try again.")
      }
    } finally {
      setClaiming(false)
    }
  }

  // Show alert
  const showAlert = (type: string, message: string) => {
    setAlertInfo({ show: true, type, message })

    // Hide alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({ show: false, type: "", message: "" })
    }, 5000)
  }

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
              <span className="font-bold text-lg">CTK</span>
            </div>
            <h1 className="text-2xl font-bold">ChiefToken</h1>
          </div>

          {!walletConnected ? (
            <Button
              onClick={handleConnectWallet}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">{formatAddress(account)}</span>
            </div>
          )}
        </header>

        {/* Alerts */}
        {alertInfo.show && (
          <Alert
            className={`mb-6 ${alertInfo.type === "error"
                ? "bg-red-900/20 border-red-900 text-red-300"
                : alertInfo.type === "warning"
                  ? "bg-yellow-900/20 border-yellow-900 text-yellow-300"
                  : alertInfo.type === "success"
                    ? "bg-green-900/20 border-green-900 text-green-300"
                    : "bg-blue-900/20 border-blue-900 text-blue-300"
              }`}
          >
            {alertInfo.type === "error" && <AlertCircle className="h-4 w-4" />}
            {alertInfo.type === "warning" && <AlertCircle className="h-4 w-4" />}
            {alertInfo.type === "success" && <CheckCircle className="h-4 w-4" />}
            {alertInfo.type === "info" && <AlertCircle className="h-4 w-4" />}
            <AlertTitle>
              {alertInfo.type === "error"
                ? "Error"
                : alertInfo.type === "warning"
                  ? "Warning"
                  : alertInfo.type === "success"
                    ? "Success"
                    : "Information"}
            </AlertTitle>
            <AlertDescription>{alertInfo.message}</AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <main className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                ChiefToken Airdrop
              </span>
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto">
              Claim your CTK tokens and join the future of decentralized governance. Limited time offer for early
              community members.
            </p>
          </div>

          {/* Airdrop Card */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
                  <span className="font-bold text-sm">CTK</span>
                </div>
                ChiefToken Airdrop
              </CardTitle>
              <CardDescription className="text-slate-400">Claim your tokens before the airdrop ends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Token Info */}
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">Available to claim:</span>
                  <span className="text-xl font-bold">1,000 CTK</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Token price:</span>
                  <span className="font-medium">$0.42 USD</span>
                </div>
              </div>

              {/* Eligibility Status */}
              {walletConnected && (
                <div
                  className={`bg-slate-900/50 rounded-lg p-4 border ${isEligible ? "border-green-700" : "border-red-700"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isEligible ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span className="font-medium">
                      {isEligible
                        ? "Your address is eligible for the airdrop"
                        : "Your address is not eligible for the airdrop"}
                    </span>
                  </div>
                  {isEligible && hasClaimed && (
                    <div className="mt-2 flex items-center gap-2 text-yellow-400">
                      <AlertCircle className="h-4 w-4" />
                      <span>You have already claimed your tokens</span>
                    </div>
                  )}
                </div>
              )}

              {/* Airdrop Progress */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Airdrop progress</span>
                  <span className="text-slate-400">76% claimed</span>
                </div>
                <Progress value={76} className="h-2 bg-slate-700" />
              </div>

              {/* Time Remaining */}
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Time remaining:</span>
                  <div className="flex gap-2">
                    <div className="bg-slate-800 px-2 py-1 rounded">
                      <span className="font-mono">02</span>
                      <span className="text-xs text-slate-400 ml-1">d</span>
                    </div>
                    <div className="bg-slate-800 px-2 py-1 rounded">
                      <span className="font-mono">14</span>
                      <span className="text-xs text-slate-400 ml-1">h</span>
                    </div>
                    <div className="bg-slate-800 px-2 py-1 rounded">
                      <span className="font-mono">36</span>
                      <span className="text-xs text-slate-400 ml-1">m</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {!walletConnected ? (
                <Button
                  onClick={handleConnectWallet}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet to Claim
                </Button>
              ) : hasClaimed ? (
                <div className="w-full">
                  <Button
                    disabled
                    className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Tokens Claimed Successfully
                  </Button>
                  {txHash && (
                    <div className="flex justify-center mt-4 gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-slate-300 border-slate-700"
                        onClick={() => {
                          navigator.clipboard.writeText(txHash)
                          showAlert("info", "Transaction hash copied to clipboard")
                        }}
                      >
                        <Copy className="mr-2 h-3 w-3" />
                        Copy Tx
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-slate-300 border-slate-700"
                        onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, "_blank")}
                      >
                        <ExternalLink className="mr-2 h-3 w-3" />
                        View on Explorer
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={handleClaim}
                  disabled={!isEligible || claiming}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 group"
                >
                  {claiming ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      Claim 1,000 CTK Tokens
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Token Details</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex justify-between">
                    <span>Symbol:</span>
                    <span className="font-medium">CTK</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Network:</span>
                    <span className="font-medium">Ethereum</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Total Supply:</span>
                    <span className="font-medium">100,000,000</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Eligibility</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Early community members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Testnet participants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Discord members</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Whitepaper
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Tokenomics
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Community Discord
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  )
}

