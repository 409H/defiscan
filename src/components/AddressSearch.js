import React, { Component } from 'react';

import { Button, Input, Heading, Address } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

import Protocols from './protocols/index';

import namehash from 'eth-ens-namehash'
import ens from 'ez-ens';
import { web3 } from './protocols/web3'

const Container = styled.div`
    width: 100%;
    margin-bottom: 5em;
`;

const SearchContainer = styled.div`
    display: inline-block;
    width: inherit;
`;

const Error = styled.div`
    text-align: center;
    font-weight: 600;
    padding: 2em;
`;

const NetworkNoticeContainer = styled.div`
    color: #697685;
    font-size: 600;
    padding-bottom: 1em;
`

class AddressSearch extends Component {
  constructor()
  {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.isOnCorrectNetwork = this.isOnCorrectNetwork.bind(this)

    this.state = {
        network: {
            mainnet: true
        },
        search: {
            address: null,
            ens: false,
            ens_name: null
        }
    }

  }

  async handleSearch(objEvent, strValue = "")
  {
      let strInput = "";
      if(objEvent) {
        strInput = objEvent.target.value;
      } else {
          strInput = strValue;
      }

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

    window.location.hash = strInput;
  }

  clearInput(objEvent)
  {
      objEvent.target.value = "";
  }

  componentDidMount()
  {
      this.isOnCorrectNetwork()
      if(window.location.hash.substr(1).length > 0) {
          document.getElementById("SearchInput").value = window.location.hash.substr(1);
          this.handleSearch(null, window.location.hash.substr(1));
      }
  }

  isOnCorrectNetwork()
  {
        web3.eth.net.getNetworkType().then(n => {
            if(n.toUpperCase() !== "MAIN") {
                this.setState({network: {main: false}})
            }
        })
  }
    
  render() {

    let networkNotice;
    if(this.state.network.main === false) {
        networkNotice = <NetworkNoticeContainer>⚠️ Web3 network is not on mainnet - results could be funky!</NetworkNoticeContainer>
    }

    return (
        <Container>
            {networkNotice}
            <SearchContainer>
                <Input id="SearchInput" onPaste={this.handleSearch} onKeyUp={this.handleSearch} type="search" placeholder="Search by address/ENS name"></Input> 
                <Button>Search</Button>
            </SearchContainer>
            {this.state.error
                ?
                    <Error>
                        {this.state.error}
                    </Error>
                :
                    this.state.search.address !== null 
                        ?
                            <div>
                                <Heading as="h4">Defi Profile for 
                                {this.state.search.ens 
                                    ? 
                                        <Address title={this.state.search.ens_name} address={this.state.search.address} truncate={e => [e.slice(0, 5), e.slice(e.length-3, e.length)].join("...")} />
                                    : 
                                        <Address title={this.state.search.address} address={this.state.search.address} truncate={e => [e.slice(0, 5), e.slice(e.length-3, e.length)].join("...")} />
                                }</Heading>
                                <Protocols address={this.state.search.address} />
                            </div>
                        :
                            ``
                
            }
        </Container>
    );
  }
}

export default AddressSearch;
