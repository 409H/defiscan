import React, { Component } from 'react';
import Logo from './../images/mycrypto.jpg';

import { Panel, light } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

const HeaderContainer = styled.div`
    display: block;
    box-sizing: border-box;
`;
const Heading = styled.h1`
    display: inline-block;
    padding-right: 0.5em;
`;
const MyCryptoLogo = styled.img`
    display: inline-block;
    height: 15px;
    width: 15px;
    margin-left: 0.2em;
    margin-right: 0.2em;
`;
const PoweredBy = styled.span`
    display: inline-block;
`
const Slogan = styled.span`
    display: block;
    margin-bottom: 2em;
`;
class Header extends Component {
  render() {
    return (
        <HeaderContainer>
            <Heading>DefiScan</Heading>

            <PoweredBy>Powered By</PoweredBy>
            <MyCryptoLogo src={Logo}></MyCryptoLogo>
            <PoweredBy>MyCrypto</PoweredBy>

            <Slogan>A read-only Defi profile explorer. Search by user 0x address or ENS name - no web3 injection needed</Slogan>
        </HeaderContainer>
    );
  }
}

export default Header;
