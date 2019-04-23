import React, { Component } from 'react';

import { Panel, Heading } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

import Web3 from 'web3';
import Compound from './compound/compound';
import MakerCdp from './makerdao-cdp/maker';
import Uniswap from './uniswap/uniswap';

import ImageBrand from '../ImageBrand'
import LogoCompound from '../../images/compound_light.png'

class ProtocolIndex extends Component {
    
  constructor()
  {
    super();    
  }

  render() {
    return (
        <div>
           <Panel style={{display: 'block'}}>
            <Heading as="h3">Compound</Heading>
            <Compound address={this.props.address} web3={this.getWeb3}></Compound>
           </Panel>
           <Panel style={{display: 'block'}}>
            <Heading as="h3">Uniswap</Heading>
            <Uniswap address={this.props.address} web3={this.getWeb3}></Uniswap>
           </Panel>
           {/* <Panel style={{display: 'block'}}>
            <Heading as="h3">MakerCDP</Heading>
            <MakerCdp address={this.props.address} web3={this.getWeb3}></MakerCdp>
           </Panel>            */}
        </div>
    );
  }
}

export default ProtocolIndex;
