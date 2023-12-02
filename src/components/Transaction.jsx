import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Transaction = () => {
  const history = useHistory();
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (!walletAddress.trim()) {
      setError('Wallet address cannot be empty');
      return;
    }

    // if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    //   setError('Enter a valid Ethereum address');
    //   return;
    // }

    if (isNaN(amount) || amount <= 0 || amount > 10000) {
      setError('Amount must be a number between 0 and 10,000');
      return;
    }

    try {
      // Save transaction data to Firebase
      await axios.post(
        'https://assignment01-8861a-default-rtdb.asia-southeast1.firebasedatabase.app/transtion.json?auth=v6iW8MmHObdMnllXZToIIQ4MZD6s8FvVv32QRRr7',
        {
          wallet_address: walletAddress,
          amount: parseInt(amount)
        }
      );


      // Redirect to home after successful transaction submission
      history.push('/');
    } catch (error) {
      setError('Failed to save transaction. Please try again.');
    }
  };

  return (
    <div>
      <div className="my-5">
        <h1 className="text-center">Transaction Page</h1>
      </div>
      {error && <p>{error}</p>}
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="walletAddress" className="form-label">
                  Wallet Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="walletAddress"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter Wallet Address"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                />
              </div>
              <div className="col-12">
                <button className="btn btn-outline-primary" type="submit">
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
