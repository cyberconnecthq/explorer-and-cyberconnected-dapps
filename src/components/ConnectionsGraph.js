import dynamic from 'next/dynamic';
const NoSSRForceGraph = dynamic(() => import('./ForceGraph'), {
  ssr: false,
});

function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
    .filter(id => id)
    .map(id => ({
      [reverse ? 'target' : 'source']: id,
      [reverse ? 'source' : 'target']: Math.round(Math.random() * (id-1))
    }))
  };
}

export default function ConnectionsGraph() {

  return (
    <NoSSRForceGraph graphData={genRandomTree()}/>
  );
}