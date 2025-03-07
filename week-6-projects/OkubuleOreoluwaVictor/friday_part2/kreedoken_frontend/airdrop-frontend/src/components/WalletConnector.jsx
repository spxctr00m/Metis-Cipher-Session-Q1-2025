
import { useState, useEffect } from 'react';
import { connectWallet } from '../utils/blockchain';
import { FaWallet } from 'react-icons/fa';

function WalletConnector({ onConnect, address }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    setIsConnecting(true);
    setError('');
    
    try {
      const userAddress = await connectWallet();
      onConnect(userAddress);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {!address ? (
        <button 
          className={`btn-primary flex items-center gap-2 ${isConnecting ? 'opacity-70' : ''}`}
          onClick={handleConnect}
          disabled={isConnecting}
        >
          <FaWallet />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="font-medium">{formatAddress(address)}</span>
        </div>
      )}
      
      {error && (
        <div className="text-danger text-sm mt-1">{error}</div>
      )}
    </div>
  );
}

export default WalletConnector;