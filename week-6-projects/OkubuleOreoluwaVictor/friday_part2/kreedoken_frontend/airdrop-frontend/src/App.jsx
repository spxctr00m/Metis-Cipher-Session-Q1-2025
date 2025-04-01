
import { useState } from 'react';
import WalletConnector from './components/WalletConnector';
import ClaimCard from './components/ClaimCard';

function App() {
  const [address, setAddress] = useState('');

  const handleConnect = (userAddress) => {
    setAddress(userAddress);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">KreedOken Airdrop</h1>
        <p className="text-gray-600">Connect your wallet to claim your KKK tokens</p>
      </header>

      <div className="w-full max-w-lg">
        <div className="mb-6 flex justify-center">
          <WalletConnector onConnect={handleConnect} address={address} />
        </div>
        
        <ClaimCard address={address} />
        
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Make sure you're connected to the Metis Sepolia network</p>
        </div>
      </div>
    </div>
  );
}

export default App;