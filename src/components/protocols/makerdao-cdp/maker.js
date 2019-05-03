import React, { Component } from 'react';
import ImageIcon from '../../ImageIcon';

import { StackedCard, Address, Tooltip, Icon } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

import Maker from '@makerdao/dai';
import { web3 } from '../web3'

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
