import { ConnectionsData } from "@/utils/types";
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useRef, useState } from 'react';
const NoSSRForceGraph = dynamic(() => import('./ForceGraph'), {
  ssr: false,
});

function genTree(cd: ConnectionsData){
  const ownAddress = "0x0";
  return {
    nodes: [{id: ownAddress}].concat(cd.data.map(conn => ({id: conn.address}) )),
    links: cd.data
      .filter((conn) => conn.is_follower)
      .map((conn) => ({ source: conn.address, target: ownAddress })).concat(
        cd.data
          .filter(conn => conn.is_following)
          .map((conn) => ({ target: conn.address, source: ownAddress }))
      )
  };
}

function get_color(node:any, props: ConnectionsData, address: string){
  const n = props.data.find(x => x.address == node.id);
  console.log(address);
  console.log(node.id);
  if (n!== undefined ) {
    if(node.id !== undefined && node.id == address) {
      console.log('here: ');
      return "0";
    }
    if (n.is_follower){
      if(n.is_following){
        // follower and following
        return "2";
      } else {
        // // follower
        return "3";
      }
    } else {
      // following
      return "4";
    }
  } else {
    // own node
    return "5";
  }
}

// function get_size(node:any, highlightAddress:string): number{
//   if(node.id == highlightAddress) {
//     return 8;
//   } else {
//     return 4;
//   }
// }

interface ConnectionsGraphProps {
    connections: ConnectionsData;
    width: number;
    height: number;
    highlightAddress: string,
    setHighlight: (highlightAddress: string) => void,
}


export default function ConnectionsGraph(props: ConnectionsGraphProps) {
  const handleClick = (node:any) => {
    console.log(node);
    props.setHighlight(node.id);
  };

  const [hoverNode, setHoverNode] = useState(null);

  const handleNodeHover = (node:any) => {
        // highlightNodes.clear();
        // highlightLinks.clear();
        if (node) {
          // highlightNodes.add(node);
          // node.neighbors.forEach((neighbor:any) => highlightNodes.add(neighbor));
          // node.links.forEach((link:any) => highlightLinks.add(link));
        }

        setHoverNode(node || null);
        // updateHighlight();
      };

      const NODE_R = 4;

  const paintRing = useCallback((node, ctx) => {
    const nodeProps = props.connections.data.find((entity) => entity.address === node.id);
    // add ring just for highlighted nodes
    if (node.id === props.highlightAddress) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R * 1.8, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'gray';
      ctx.fill();
    }
    if (node === hoverNode) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'red';
      ctx.fill();
    }
    if (nodeProps?.is_follower && nodeProps?.is_following) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R, 0.5 * Math.PI, 1.5 * Math.PI, false);
      ctx.fillStyle = 'green';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R, -0.5 * Math.PI, 0.5 * Math.PI, false);
      ctx.fillStyle = 'orange';
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R, 0, 2 * Math.PI, false);
      ctx.fillStyle = nodeProps?.is_follower ? 'green' : 'orange';
      ctx.fill();
    }
  }, [hoverNode, props.highlightAddress, props.connections]);

      const treeData = useMemo(() => genTree(props.connections), [props.connections]);

  const fgRef = useRef();
  return (
    <Box w='100%' h='100%' minHeight='300px'>
      <NoSSRForceGraph
        linkWidth={1}
        linkDirectionalArrowLength={2}
        width={props.width}
        height={props.height}
        nodeLabel='id'
        graphData={treeData}
        onNodeClick={(node)=>handleClick(node)}
        onNodeHover={handleNodeHover}
        nodeCanvasObject={paintRing}
      />
    </Box>
  );
}