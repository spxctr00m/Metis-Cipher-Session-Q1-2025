
import { useState, useEffect } from 'react';
import { 
  checkIfWhitelisted, 
  claimTokens, 
  checkIfClaimed, 
  getTokenBalance 
} from '../utils/blockchain';
import { FaCheckCircle, FaTimesCircle, FaGift } from 'react-icons/fa';

function ClaimCard({ address }) {
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');
  const [tokenBalance, setTokenBalance] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      if (!address) return;

      // Check if address is whitelisted
      const whitelisted = checkIfWhitelisted(address);
      setIsWhitelisted(whitelisted);

      if (whitelisted) {
        try {
          // Check if already claimed
          const claimed = await checkIfClaimed(address);
          setHasClaimed(claimed);

          // Get token balance
          const balance = await getTokenBalance(address);
          setTokenBalance(balance);
        } catch (err) {
          console.error('Error checking status:', err);
        }
      }
    };

    setError('');
    checkStatus();
  }, [address]);

  const handleClaim = async () => {
    if (!address || !isWhitelisted || hasClaimed) return;

    setIsLoading(true);
    setError('');
    setTxHash('');

    try {
      const receipt = await claimTokens(address);
      setTxHash(receipt.hash);
      setHasClaimed(true);
      
      // Update token balance after claim
      const balance = await getTokenBalance(address);
      setTokenBalance(balance);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!address) {
    return (
      <div className="card text-center">
        <div className="text-gray-500">
          Please connect your wallet to check eligibility
        </div>
      </div>
    );
  }

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Airdrop Status</h2>

      <div className="mb-4 flex items-center gap-2">
        <span className="font-medium">Eligibility:</span>
        {isWhitelisted ? (
          <span className="flex items-center text-green-600">
            <FaCheckCircle className="mr-1" /> Eligible
          </span>
        ) : (
          <span className="flex items-center text-red-600">
            <FaTimesCircle className="mr-1" /> Not Eligible
          </span>
        )}
      </div>

      {isWhitelisted && (
        <>
          <div className="mb-4 flex items-center gap-2">
            <span className="font-medium">Claim Status:</span>
            {hasClaimed ? (
              <span className="flex items-center text-green-600">
                <FaCheckCircle className="mr-1" /> Claimed
              </span>
            ) : (
              <span className="flex items-center text-blue-600">
                <FaGift className="mr-1" /> Available
              </span>
            )}
          </div>

          {tokenBalance && (
            <div className="mb-4">
              <span className="font-medium">Token Balance:</span>
              <div className="text-lg font-bold">
                {tokenBalance.balance} {tokenBalance.symbol}
              </div>
            </div>
          )}

          <button
            className={`w-full mt-2 ${
              !hasClaimed && isWhitelisted
                ? 'btn-primary'
                : 'btn-disabled'
            }`}
            onClick={handleClaim}
            disabled={hasClaimed || !isWhitelisted || isLoading}
          >
            {isLoading ? 'Processing...' : hasClaimed ? 'Already Claimed' : 'Claim Tokens'}
          </button>

          {txHash && (
            <div className="mt-4 text-green-600 text-sm">
              Transaction successful! Hash: {txHash.substring(0, 10)}...
            </div>
          )}
        </>
      )}

      {error && (
        <div className="mt-4 text-danger text-sm p-2 bg-red-50 rounded">
          Error: {error}
        </div>
      )}
    </div>
  );
}

export default ClaimCard;