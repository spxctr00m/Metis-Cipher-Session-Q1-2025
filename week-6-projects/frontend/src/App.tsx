import { ethers, Eip1193Provider } from "ethers";
import { useState } from "react";
import contractABI from "./abi/abi.json";


declare global {
  interface Window {
    ethereum: Eip1193Provider
  }
}

function App() {
  const contractAddress = "0xC3Db9B072D2595F695BF063cc1BFa9d31266531c";
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [base, setBase] = useState("");
  const [height, setHeight] = useState("");
  const [triangleArea, setTriangleArea] = useState(null);



  async function login() {
    console.log("I worked!");

    if (!window.ethereum) {
      console.log("MetaMask not installed; using read-only defaults");
      return;
    }

    try {

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const user = await provider.getSigner();

      setSigner(user);

      const initContract = new ethers.Contract(contractAddress, contractABI, provider);
      setContract(initContract);

      console.log("Connected:", await user.getAddress());
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  }

  async function getAreaOfTriangle() {
    try {
      if (!contract) {
        console.error("Contract is not initialized yet.");
        return;
      }

      // const baseValue = ethers.getBigInt(base);
      // const heightValue = ethers.getBigInt(height);


      // const area = await contract.triangleArea(baseValue, heightValue);
      const area = await contract.totalVotes();

      console.log("nationality:", area);
      // setTriangleArea(area);
    } catch (error) {
      console.error("Error calculating area:", error);
    }
  }

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Area Calculator</span>
        </div>
        <div>
          <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={login}>{signer ? "Connected" : "Connect Wallet"}
          </button>
        </div>
      </nav >

      <section>
        <div className="flex justify-center pt-60 flex-col items-center">
          <h1 className="text-3xl">Instantly Calulate Your Area Shapes Here!</h1>
          <div>
            <button className="inline-block text-sm px-10 py-4 leading-none border rounded text-white border-white hover:border-teal-500 hover:text-teal-500  bg-teal-500 hover:bg-white mt-4 lg:mt-8" onClick={login}>{signer ? "Connected" : "Connect Wallet"}
            </button>
          </div>
          <p className="mt-2">{signer ? `Your wallet address is: ${signer.address}` : ""}</p>


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
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="base" type="text" placeholder="Input base" onChange={(e) => setBase(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Height
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Input height" onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-white hover:bg-white text-teal-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={getAreaOfTriangle}>
                Calculate
              </button>
            </div>
          </form>
          <p className="text-white">Given the {base} and {height}, The area of this triangle is {triangleArea}</p>
        </div>
      </section>

      <section className="flex justify-center py-10 flex-col items-center bg-white mt-[60px]">
        <h2 className="text-3xl text-teal-500 pb-3">Calculate Rectangle</h2>
        <div className="w-1/2">
          <form className="bg-teal-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Length
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="base" type="text" placeholder="Input length" />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Breath
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Input breath" />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-white hover:bg-white text-teal-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Calculate
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="flex justify-center py-10 flex-col items-center bg-teal-500 mt-[60px]">
        <h2 className="text-3xl text-white pb-3">Calculate Square</h2>
        <div className="w-1/2">
          <form className="bg-teal-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Side
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="base" type="text" placeholder="Input side" />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-white hover:bg-white text-teal-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Calculate
              </button>
            </div>
          </form>
        </div>
      </section>


    </>
  )
}

export default App
