import { ethers, Eip1193Provider } from "ethers";
import { useState, useEffect } from "react";
import contractABI from "./abi/abi.json";

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}

function App() {
  const contractAddress = "0x23D4D86Da3498A4B1D625742125D4bA46768F6b6";
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const [base, setBase] = useState("");
  const [height, setHeight] = useState("");
  const [triangleArea, setTriangleArea] = useState<string | null>(null);

  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [rectangleArea, setRectangleArea] = useState<string | null>(null);

  const [side, setSide] = useState("");
  const [squareArea, setSquareArea] = useState<string | null>(null);

  useEffect(() => {
    if (signer) {
      const initContract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(initContract);
      console.log("Contract initialized with signer");
    }
  }, [signer, contractAddress]);

  async function login() {
    console.log("Connecting to wallet...");

    if (!window.ethereum) {
      console.log("MetaMask not installed");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const user = await provider.getSigner();

      setSigner(user);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  }

  async function getAreaOfTriangle() {
    try {
      if (!contract) {
        console.error("Contract is not initialized yet. Please connect your wallet first.");
        alert("Contract is not initialized yet. Please connect your wallet first.");
        return;
      }

      if (!base || !height) {
        console.error("Please enter both base and height values.");
        return;
      }

      const baseValue = ethers.parseUnits(base, 0);
      const heightValue = ethers.parseUnits(height, 0);

      const area = await contract.areaOfTriangle(baseValue, heightValue);

      setTriangleArea(ethers.formatUnits(area, 0));
    } catch (error) {
      console.error("Error calculating triangle area:", error);
    }
  }

  async function getAreaOfRectangle() {
    try {
      if (!contract) {
        console.error("Contract is not initialized yet. Please connect your wallet first.");
        return;
      }

      if (!length || !breadth) {
        console.error("Please enter both length and breadth values.");
        return;
      }

      const lengthValue = ethers.parseUnits(length, 0);
      const breadthValue = ethers.parseUnits(breadth, 0);

      const area = await contract.areaOfRectangle(lengthValue, breadthValue);

      setRectangleArea(ethers.formatUnits(area, 0));
    } catch (error) {
      console.error("Error calculating rectangle area:", error);
    }
  }

  async function getAreaOfSquare() {
    try {
      if (!contract) {
        console.error("Contract is not initialized yet. Please connect your wallet first.");
        return;
      }

      if (!side) {
        console.error("Please enter the side value.");
        return;
      }

      const sideValue = ethers.parseUnits(side, 0);

      const area = await contract.areaOfSquare(sideValue);

      setSquareArea(ethers.formatUnits(area, 0));
    } catch (error) {
      console.error("Error calculating square area:", error);
    }
  }

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Area Calculator</span>
        </div>
        <div>
          <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={login}>
            {signer ? "Connected" : "Connect Wallet"}
          </button>
        </div>
      </nav>

      <section>
        <div className="flex justify-center pt-60 flex-col items-center">
          <h1 className="text-3xl">Instantly Calculate Your Area Shapes Here!</h1>
          <div>
            <button className="inline-block text-sm px-10 py-4 leading-none border rounded text-white border-white hover:border-teal-500 hover:text-teal-500 bg-teal-500 hover:bg-white mt-4 lg:mt-8" onClick={login}>
              {signer ? "Connected" : "Connect Wallet"}
            </button>
          </div>
          {signer && <p className="mt-2">Your wallet address is: {signer.address}</p>}

        </div>
      </section>

      <section className="flex justify-center py-10 flex-col items-center bg-teal-500 mt-[160px]">
        <h2 className="text-3xl text-white pb-3">Calculate Triangle</h2>
        <div className="w-1/2">
          <form className="bg-teal-500 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Base
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder-white leading-tight focus:outline-none focus:shadow-outline"
                id="base"
                type="text"
                placeholder="Input base"
                onChange={(e) => setBase(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Height
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="height"
                type="text"
                placeholder="Input height"
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-white hover:bg-white text-teal-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={getAreaOfTriangle}
                disabled={!contract}
              >
                Calculate
              </button>
            </div>
          </form>
          {triangleArea && (
            <p className="text-white">
              Given the base {base} and height {height}, the area of this triangle is {triangleArea}
            </p>
          )}
        </div>
      </section>

      <section className="flex justify-center py-10 flex-col items-center bg-white mt-[60px]">
        <h2 className="text-3xl text-teal-500 pb-3">Calculate Rectangle</h2>
        <div className="w-1/2">
          <form className="bg-teal-500 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Length
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder-white leading-tight focus:outline-none focus:shadow-outline"
                id="length"
                type="text"
                placeholder="Input length"
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Breadth
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="breadth"
                type="text"
                placeholder="Input breadth"
                onChange={(e) => setBreadth(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-white hover:bg-white text-teal-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={getAreaOfRectangle}
                disabled={!contract}
              >
                Calculate
              </button>
            </div>
          </form>
          {rectangleArea && (
            <p className="text-teal-500">
              Given the length {length} and breadth {breadth}, the area of this rectangle is {rectangleArea}
            </p>
          )}
        </div>
      </section>

      <section className="flex justify-center py-10 flex-col items-center bg-teal-500 mt-[60px]">
        <h2 className="text-3xl text-white pb-3">Calculate Square</h2>
        <div className="w-1/2">
          <form className="bg-teal-500 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Side
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder-white leading-tight focus:outline-none focus:shadow-outline"
                id="side"
                type="text"
                placeholder="Input side"
                onChange={(e) => setSide(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-white hover:bg-white text-teal-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={getAreaOfSquare}
                disabled={!contract}
              >
                Calculate
              </button>
            </div>
          </form>
          {squareArea && (
            <p className="text-white">
              Given the side {side}, the area of this square is {squareArea}
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
