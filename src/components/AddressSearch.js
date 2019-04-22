import React, { Component } from 'react';

import { Button, Input, Heading } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

import Protocols from './protocols/index';

import namehash from 'eth-ens-namehash'
import ens from 'ez-ens';

import Web3 from 'web3';
let web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
  console.log(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/nWQTOIHYhOavIVKVvNah")); 
  //web3 = new Web3(new Web3.providers.HttpProvider("https://freely-central-lark.quiknode.io/9fe4c4a0-2ea2-4ac1-ab64-f92990cd2914/118-xxADc8hKSSB9joCb-g==/"));
}  

const Error = styled.div`
    text-align: center;
    font-weight: 600;
    padding: 2em;
`;

class AddressSearch extends Component {
  constructor()
  {
    super();
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
        search: {
            address: null,
            ens: false,
            ens_name: null
        }
    }

  }

  async handleSearch(objEvent)
  {
    const strInput = objEvent.target.value;
    this.setState({search: {address: null, ens: false}, "error": null})
    // Are we searching for a 0x address or via ENS name?
    if(strInput.match(/^(0x)?[a-fA-F0-9]{40}$/, "g") !== null) {
        this.setState({search: {address: strInput, ens: false}})
    } else if(strInput.match(/[A-z0-0\_]+?\.eth$/, "g") !== null) {
        let strNormalised = namehash.normalize(strInput);
        let hash = namehash.hash(strInput);
        let strAddress = await ens.resolve(strNormalised, {web3: web3}).catch(e => this.setState({"error": "No resolver for ENS name!"}));
        this.setState({search: {address: strAddress, ens: true, ens_name: strNormalised}});
    } else {
        this.setState({search: {address: null, ens: false}})
    }
  }
    
  render() {
    return (
        <div>
            <div style={{width: '400px', display: 'inline-block'}}>
                <Input onClick={e => e.inputEntry = ""} onChange={this.handleSearch} placeholder="Search by address/ENS name"></Input> 
                <Button>Search</Button>
            </div>
            {this.state.error
                ?
                    <Error>
                        {this.state.error}
                    </Error>
                :
                    this.state.search.address !== null 
                        ?
                            <div>
                                <Heading as="h4">Defi Profile for {this.state.search.ens ? this.state.search.ens_name : this.state.search.address}</Heading>
                                <Protocols address={this.state.search.address} />
                            </div>
                        :
                            ``
                
            }
        </div>
    );
  }
}

export default AddressSearch;
