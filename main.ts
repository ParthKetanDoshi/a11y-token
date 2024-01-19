import { clusterApiUrl, Keypair, Transaction } from '@solana/web3.js';

async signTransaction(encodedTransaction: string, fromPrivateKey: string) : Promise<any> {
  try {    
    const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');
    const feePayer = Keypair.fromSecretKey(decode(fromPrivateKey));
    const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, 'base64'));
    const signedTrasaction = recoveredTransaction.partialSign(feePayer);
    const txnSignature = await connection.sendRawTransaction(
      signedTrasaction.serialize(),
    );
    return txnSignature;
  } catch (error) {
    console.log(error);    
  }
}

signTransaction("", "");