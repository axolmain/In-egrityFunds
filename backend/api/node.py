from pythonp2p import Node
import asyncio


async def run_node():
    node = Node()
    node.start()
    print(f"Node started with Peer ID: {node.get_id()}")
    # Keep the node running
    await asyncio.Event().wait()


asyncio.run(run_node())
