## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized.

However, it incoporates Public Key Cryptography. By using Elliptic Curve Digital Signatures, the server only allows transfers that have been signed for by the person who owns the associated address.

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the server

The application should connect to the default server port (3042) automatically!

If you want to play around, follow these steps:

1. Run `node generate.js` as many times as you want to generate a private key, its public key and its address.
2. Update the balances mapping in the server to the generated addresses and you're good to go.

### Notes

At this moment, a malicious party can intercept the message from the client to the server and replicate it as many times as he wants.
There should be a way to include some piece in the message that would make the transaction be unique and non-repeatable. Like: a nonce; the current balance; the current number of transactions; etc;
