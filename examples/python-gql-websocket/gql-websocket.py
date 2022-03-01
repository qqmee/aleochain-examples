import asyncio
import logging

from gql import Client, gql
from gql.transport.websockets import WebsocketsTransport

logging.basicConfig(level=logging.ERROR)


async def main():
    transport = WebsocketsTransport(
        url="wss://aleochain.io/graphql",
        keep_alive_timeout=60,
        subprotocols=[WebsocketsTransport.APOLLO_SUBPROTOCOL],
    )

    async with Client(
        transport=transport,
        fetch_schema_from_transport=False,
    ) as session:
        subscription = gql(
            """
subscription SubOnNode {
  on_node {
    ip
    port_network
    cumulative_weight
  }
}
"""
        )

        async for result in session.subscribe(subscription, parse_result=True):
            if result["on_node"] is not None:
                ip = result["on_node"]["ip"]
                port_network = result["on_node"]["port_network"] or 4132
                weight = result["on_node"]["cumulative_weight"]

                print(f"""weight={weight}, addr={ip}:{port_network}""")


asyncio.run(main())
