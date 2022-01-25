import React from "react";
import { Button, Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';

class ConnectionsTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {maxView: 6};
    }
    render() {
        return (
            <Table variant='striped' colorScheme='black'>
            <Thead><Tr><Th textColor={this.props.hColor}>{this.props.heading}</Th></Tr></Thead>
            <Tbody>
                {this.props.addresses.slice(0,this.state.maxView).map(address => (
                    <Tr key={address.address.toString()}><Th>{address.address.slice(0,4)}....{address.address.slice(-5,-1)}</Th></Tr>
                ))}
                    {this.state.maxView < this.props.addresses.length ?
                        < Tr key="more"><Th><Button onClick={
                            () => { this.setState((state) => ({ maxView: state.maxView + 10 })) }
                        }> View more ... </Button></Th></Tr>
                        :
                        < Tr key="more"><Th><Button onClick={
                            () => { this.setState(() => ({ maxView: 6 })) }
                        }> Collapse </Button></Th></Tr>
                }
            </Tbody>
            </Table>);
    }
}

export default ConnectionsTable;