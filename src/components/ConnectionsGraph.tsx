import dynamic from 'next/dynamic';
import { ConnectionsData } from "@/utils/types";
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
}

export default function ConnectionsGraph(props: ConnectionsGraphProps) {
  return (
    // TODO: https://github.com/ctrlplusb/react-sizeme
    <NoSSRForceGraph
      width={400}
      nodeLabel='id'
      graphData={genTree(props.connections)}
      nodeAutoColorBy={n => get_color(n, props.connections)}
    />
  );
}