const { gql, request } = require("graphql-request");

const query = gql`
  mutation ($abcd: String!, $rpc: [BroadcastRpcServer!]) {
    broadcast_tx(hex: $abcd, rpc: $rpc) {
      txid: transaction_id
      broadcast {
        ip
        port
        elapsed
        ok
      }
    }
  }
`;

const variables = {
  abcd: "0x0123",
  // rpc: [
  // { ip: "1.1.1.1", port: 3032 },
  // { ip: "1.1.1.2", port: 3032 },
  // { ip: "1.1.1.3", port: 3032 },
  // ],
};

async function main() {
  const { broadcast_tx } = await request(
    "https://aleochain.io/graphql",
    query,
    variables
  );

  if (!broadcast_tx) {
    console.log("check rpc servers");
    return;
  }

  console.log(`transaction_id=${broadcast_tx.txid}`);

  for (const rpc of broadcast_tx.broadcast) {
    console.log(`${rpc.ip} ok=${rpc.ok} elapsed=${rpc.elapsed}`);
  }
}

main();
