require("isomorphic-fetch");

const query = `
query($limit: Int!) {
  abc: node_count_version {
    name
    value
  }
  blocks(
    filter: { is_canon: true }
    limit: $limit
    orderBy: { field: BlockHeight, direction: DESC }
  ) {
    edges {
      block_height
      block_hash
      timestamp
      owner
      transactions {
        transaction_id
        inner_circuit_id
      }
    }
  }
}
`;

async function main() {
  const res = await fetch("https://aleochain.io/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables: { limit: 2 } }),
  });

  const data = await res.json();

  console.log("\nNode group by version:");
  for (const row of data.data.abc) {
    const version = row.name || "unknown";
    console.log("version=%s, count=%d", version, row.value);
  }

  console.log("\nLatest blocks:");
  for (const row of data.data.blocks.edges) {
    const hash = row.block_hash.slice(-8);
    console.log(`height: ${row.block_height} (${hash}) ${row.timestamp}`);
  }
}

main();
