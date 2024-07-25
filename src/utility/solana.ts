// src/solanaTransaction.js
import {
  Connection,
  PublicKey,
  VersionedTransaction,
  SystemProgram,
  TransactionMessage,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  transact,
  Web3MobileWallet,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { getStoredAuthToken, storeAuthToken, removeStoredAuthToken } from './storage';

export const APP_IDENTITY = {
  name: 'ZetaFit',
  uri:  'https://ZetaFit.com',
  icon: "favicon.ico", // Full path resolves to https://yourdapp.com/favicon.ico
};

const toByteArray = (base64String: string) => {
  const raw = atob(base64String);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
      bytes[i] = raw.charCodeAt(i);
  }
  return bytes;
}

export const connectToWallet = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const storedAuthToken = await getStoredAuthToken();

    const walletConnection = await transact(async (wallet: Web3MobileWallet) => {
      const authorizationResult = await wallet.authorize({
        chain: 'solana:devnet',
        identity: APP_IDENTITY,
        auth_token: storedAuthToken ? storedAuthToken: undefined,
      });

      const authorizedPubkey = new PublicKey(
        toByteArray(authorizationResult.accounts[0].address)
      );

      const balance = await connection.getBalance(authorizedPubkey)
      console.log("Connected to: " + authorizedPubkey)
      console.log("Balance:  " + balance)
      console.log("Account Address:  " + authorizedPubkey)

      await storeAuthToken(authorizationResult.auth_token);
      
      return { authorizationResult, balance };
    });

    return walletConnection;
  } catch (error) {
    console.error("Error during wallet authorization:", error);
    
    // Remove stored auth token if authorization fails
    await removeStoredAuthToken();
    
    throw error;
  }
}
  
export const createAndSendTransaction = async (toPublicKeyString: string, sol: number) => {
  try {
    // const authorizationResult = await connectToWallet()
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const latestBlockhash = await connection.getLatestBlockhash();
    const storedAuthToken = await getStoredAuthToken();

    /* After approval, signing requests are available in the session. */

    const txSignature = await transact(async (wallet: Web3MobileWallet) => {
      const authorizationResult = await wallet.authorize({
        chain: 'solana:devnet',
        identity: APP_IDENTITY,
        auth_token: storedAuthToken ? storedAuthToken: undefined,
      });

      await storeAuthToken(authorizationResult.auth_token);
      /* After approval, signing requests are available in the session. */

      const authorizedPubkey = new PublicKey(
        toByteArray(authorizationResult.accounts[0].address)
      );

      const toPublicKey = new PublicKey(toPublicKeyString);

      // Create a list of Program instructions to execute.
      const instructions = [
        SystemProgram.transfer({
          fromPubkey: authorizedPubkey,
          toPubkey: toPublicKey,
          lamports: sol * LAMPORTS_PER_SOL,
        }),
      ];

      // Connect to an RPC endpoint and get the latest blockhash, to include in the transaction.
      
      // Create the "message" of a transaction and compile to `V0Message` format.
      const txMessage = new TransactionMessage({
        payerKey: authorizedPubkey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions,
      }).compileToV0Message();

      // Construct the Versioned Transaction passing in the message.
      const transferTx = new VersionedTransaction(txMessage);

      const transactionSignatures = await wallet.signAndSendTransactions({
        transactions: [transferTx],
      });

      return transactionSignatures[0];
    })

    const confirmationResult = await connection.confirmTransaction({
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      signature: txSignature,
    });

    if (confirmationResult.value.err) {
      throw new Error(JSON.stringify(confirmationResult.value.err));
    } else {
      console.log("Transaction successfully submitted!");
    }

    console.log('Transaction ID:', txSignature);
    return txSignature;
  } catch (error) {
    console.error("Error creating or sending transaction:", error);
    throw error;
  }
};

export const disconnectWallet = async () => {
  const storedAuthToken = await getStoredAuthToken();

  await transact(async (wallet) => {
    if (!storedAuthToken) {
      return;
    }
  
    // Pass in the prior auth token to invalidate it.
    await wallet.deauthorize({ auth_token: storedAuthToken });
    await removeStoredAuthToken();
  });
}


