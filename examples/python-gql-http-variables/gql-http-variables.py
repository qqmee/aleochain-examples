import asyncio
import logging

from gql import Client, gql
from gql.transport.aiohttp import AIOHTTPTransport

logging.basicConfig(level=logging.ERROR)


async def main():
    transport = AIOHTTPTransport(url="https://aleochain.io/graphql")

    async with Client(
        transport=transport,
        fetch_schema_from_transport=False,
    ) as session:
        query = gql(
            """
query($is_canon: Boolean!, $limit: Int!) {
  blocks(
    filter: { is_canon: $is_canon }
    orderBy: { field: BlockHeight, direction: DESC }
    limit: $limit
  ) {
    edges {
      owner
      block_height
    }
  }
}
"""
        )

        result = await session.execute(
            query, variable_values={"is_canon": True, "limit": 15}
        )

        for block in result["blocks"]["edges"]:
            print(f"""{block['block_height']} / {block['owner']}""")


asyncio.run(main())
