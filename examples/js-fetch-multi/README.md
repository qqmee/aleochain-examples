# fetch

This example shows how to receive blocks using native `fetch`

## How to use

```bash
npm i
node js-fetch-multi.js
```

## GraphQL query

```
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
```
