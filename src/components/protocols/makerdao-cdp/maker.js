import React, { Component } from 'react';
import ImageIcon from '../../ImageIcon';

import { StackedCard, Address, Tooltip, Icon } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

import Maker from '@makerdao/dai';

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
        "debt": {
          "usd": 0,
        },
        "fetched": false
      }
    }
  }

  async componentDidMount()
  {
    await this.getCdp()
  }

  async getCdp()
  {

    const maker = await Maker.create("http", {
        privateKey: 'dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb',
        url: 'https://mainnet.infura.io/nWQTOIHYhOavIVKVvNah'
    });

//   await maker.authenticate();
//   const cdp = await maker.getCdp(420);
//   console.log(cdp);

    //   await Maker.authenticate(); 
    //   const objCdp = await Maker.getCdp(4335);
    //   const debtLevel = objCdp.getDebtValue(Maker.USD);

    //   this.setState({
    //       CDP: {
    //           Debt: {
    //               usd: debtLevel
    //           }
    //       }
    //   });
  }

  getCurrentState(strKey)
  {
    return this.state[strKey];
  }

  render() {
    return (
        <div>
            <div style={{width: '400px', display: 'inline-block', border: '1px solid #000'}}>
              <StackedCard key={0} heading="CDP" entries={[
                ['Coming Soon',"Idk when"]
              ]} />
            </div>      
        </div>
    );
  }
}

export default MakerCdp;
