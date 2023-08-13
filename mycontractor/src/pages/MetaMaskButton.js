import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function MetaMaskButton({account, setAccount}) {
    // const [account, setAccount] = useState(null);

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            // If MetaMask is installed
            window.ethereum.request({ method: 'eth_accounts' })
            .then(handleAccountsChanged)
            .catch(err => console.error(err));
        }
    }, []);

    // This will run whenever accounts are changed
    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== account) {
            setAccount(accounts[0]);
        }
    };

    const connectToMetaMask = () => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(handleAccountsChanged)
            .catch(err => {
                if (err.code === 4001) {
                    // User rejected request
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
        } else {
            alert("MetaMask is not installed. Please consider installing it!");
        }
    };

    return (
        <div>
            {account ? (
                <Button variant="outline-success" >
                    {account.substring(0,6) + '...' + account.substring(account.length-4,account.length)}
                </Button>
            ) : (
                <Button variant="primary" onClick={connectToMetaMask}>
                    Connect to MetaMask
                </Button>
            )}
        </div>
    );
}

export default MetaMaskButton;
