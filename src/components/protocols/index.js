import React, { Component } from 'react';

import { Panel, Heading } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

import Web3 from 'web3';
import Compound from './compound/compound';
import MakerCdp from './makerdao-cdp/maker';
import Uniswap from './uniswap/uniswap';
import SpankChain from './spankchain/spankchain';

import LogoUniswap from '../../images/uniswap.png'
import LogoCompound from '../../images/compound.png'
import LogoSpankchain from '../../images/spankchain.svg'

const Container = styled.div`
  width: 100%;
`;

const Description = styled.div`
  color: #424242;
  margin-bottom: 1em;
`;

const ProtocolContainer = styled.div`

  @media (min-width: 1001px) {
    position: relative;
    overflow: hidden;
    background: url(${props => props.background}) 100% 0 no-repeat;
    background-size: 75px;
  }

  @media (max-width: 1000px) {
    &:before {
      position: absolute;
      overflow: hidden;
      background: url(${props => props.background}) 10px 10px no-repeat;
      background-size: 100px;
      content: " ";
      height: 110px;
      width: 110px;
      opacity: 0.2;
      ${props => props.rotate ? "transform: rotate(-20deg)" : ""}
    }
  }
`

class ProtocolIndex extends Component {
    
  constructor()
  {
    super();    
  }

  render() {
    return (
        <Container>

          <ProtocolContainer background={LogoCompound} rotate={false}>
           <Panel style={{display: 'block'}}>
              <Heading as="h3">Compound</Heading>
              <Description>
                  Compound is an open-source protocol for algorithmic, efficient Money Markets on the Ethereum blockchain. <br />
                  <a href="https://compound.finance/" target="_blank" rel="nofollow">https://compound.finance</a>
              </Description>
            <Compound address={this.props.address} web3={this.getWeb3}></Compound>
           </Panel>
           </ProtocolContainer>

           <ProtocolContainer background={LogoUniswap} rotate={true}>
            <Panel style={{display: 'block'}}>
                <Heading as="h3">Uniswap</Heading>
                <Description>
                A protocol for automated token exchange on Ethereum. <br />
                    <a href="https://uniswap.io/" target="_blank" rel="nofollow">https://uniswap.io</a>
                </Description>           
              <Uniswap address={this.props.address} web3={this.getWeb3}></Uniswap>
            </Panel>
           </ProtocolContainer>

           <ProtocolContainer background={LogoSpankchain} rotate={true}>
            <Panel style={{display: 'block'}}>
                <Heading as="h3">SpankChain</Heading>
                <Description>
                A cryptoeconomic powered adult entertainment ecosystem built on the Ethereum network. <br />
                    <a href="https://spankchain.com/" target="_blank" rel="nofollow">https://spankchain.com/</a>
                </Description>            
              <SpankChain address={this.props.address} web3={this.getWeb3}></SpankChain>
            </Panel>
           </ProtocolContainer>

           {/* <Panel style={{display: 'block'}}>
            <Heading as="h3">MakerCDP</Heading>
            <MakerCdp address={this.props.address} web3={this.getWeb3}></MakerCdp>
           </Panel>            */}
        </Container>
    );
  }
}

export default ProtocolIndex;
