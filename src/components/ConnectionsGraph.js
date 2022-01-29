import { is_follower, is_following } from "../pages/connections.data";
import dynamic from 'next/dynamic';
const NoSSRForceGraph = dynamic(() => import('./ForceGraph'), {
  ssr: false,
});

function genTree(cd){
  const ownAddress = "0x0";
  return {
    nodes: [{id: ownAddress}].concat(cd.map(([address, ]) => ({id: address}) )),
    links: cd
      .filter(([, opts]) => is_follower(opts))
      .map(([address,]) => ({ source: address, target: ownAddress })).concat(
        cd
          .filter(([, opts]) => is_following(opts))
          .map(([address,]) => ({ target: address, source: ownAddress }))
      )
  };
}

function get_color(node, props){
  const n = props.data.find(x => x[0] == node.id);
  if (n!== undefined ) {
    if (is_follower(n[1])){
      if(is_following(n[1])){
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

export default function ConnectionsGraph(props) {
  return (
    // TODO: https://github.com/ctrlplusb/react-sizeme
    <NoSSRForceGraph
      width={400}
      nodeLabel='id'
      graphData={genTree(props.data)}
      nodeAutoColorBy={n => get_color(n, props)}
    />
  );
}