# graphql-request

This example shows how to broadcast transaction hex using `graphql-request` & variables

## How to use

```bash
npm i
node js-graphql.js
```

## GraphQL query

```
mutation($hex: String!) {
  broadcast_tx(hex: $hex) {
    transaction_id
    broadcast {
      ip
      port
      elapsed
      ok
    }
  }
}
```
