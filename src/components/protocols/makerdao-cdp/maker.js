import React, { Component } from 'react';
import ImageIcon from '../../ImageIcon';

import { StackedCard, Address, Tooltip, Icon } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

import Web3 from 'web3';
let web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/nWQTOIHYhOavIVKVvNah")); 
  //web3 = new Web3(new Web3.providers.HttpProvider("https://freely-central-lark.quiknode.io/9fe4c4a0-2ea2-4ac1-ab64-f92990cd2914/118-xxADc8hKSSB9joCb-g==/"));
}  

class MakerCdp extends Component {

  constructor(args)
  {
    super(args);

    this.state = {
      "CDP": {
        "supply": {
          "principal": 0,
          "interestIndex": 0,
          "interestAmount": 0
        }, 
        "borrow": {
          "principal": 0,
          "interestIndex": 0
        },
        "fetched": false
      }
    }
  }

  async componentDidMount()
  {
    await this.getCdp()
  }

  getCurrentState(strKey)
  {
    return this.state[strKey];
  }

  async getCdp()
  {
    this.setState({
        "CDP": {}
    })
  }

  render() {
    return (
        <div>
            <div style={{width: '400px', display: 'inline-block', border: '1px solid #000'}}>
              <StackedCard key={0} heading="CDP" entries={[
                ['Something','foo']
              ]} />
            </div>      
        </div>
    );
  }
}

export default MakerCdp;
