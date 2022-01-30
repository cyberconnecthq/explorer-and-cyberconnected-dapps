import dynamic from 'next/dynamic';
import { ConnectionsData } from "@/utils/types";
import { Box } from '@chakra-ui/react';
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

function get_color(node:any, props: ConnectionsData){
  const n = props.data.find(x => x.address == node.id);
  if (n!== undefined ) {
    if (n.is_follower){
      if(n.is_following){
        // follower and following
        return '#ffffff';
      } else {
        // // follower
        return '#00ff00';
      }
    } else {
      // following
      return '#00ffff'
    }
  } else {
    // own node
    return '#ff0000'
  }
}

interface ConnectionsGraphProps {
    connections: ConnectionsData;
    width: number;
    height: number;
}

export default function ConnectionsGraph(props: ConnectionsGraphProps) {
  return (
    <Box w='100%' h='100%' minHeight='300px'>
      <NoSSRForceGraph
        width={props.width}
        height={props.height}
        nodeLabel='id'
        graphData={genTree(props.connections)}
        nodeAutoColorBy={n => get_color(n, props.connections)}
      />
    </Box>
  );
}