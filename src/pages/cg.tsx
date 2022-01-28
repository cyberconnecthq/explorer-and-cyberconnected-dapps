import { NextPage } from "next";
import dynamic from 'next/dynamic'
const ConnectionsGraph = dynamic(() => import('../components/ConnectionsGraph'))

const ConnectionsGraphPage: NextPage = () => {
    return (<>
    <ConnectionsGraph />
    </>)
}

export default ConnectionsGraphPage;