import React, { Component } from 'react';
import styled from 'styled-components'

import Web3 from 'web3';

import LogoMetamask from '../../images/providers/metamask.png'
import LogoCoinbase from '../../images/providers/coinbase.jpg'
import LogoStatus from '../../images/providers/status.png'
import LogoTrust from '../../images/providers/trust.png'

const Web3FooterContainer = styled.div`
    width: 100%;
    background: #fff;
    z-index: 1;
    position: fixed;
    bottom: 0em;
    left: 0em;
    padding: 0.5em;
    font-size: 8pt;

    > span {
        margin-right: 3em;
        > img {
            height: 15px;
            width: 15px;
            display: inline-block;
            margin-right: 0.5em;
        }
    }
`

let web3
if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/nWQTOIHYhOavIVKVvNah"))
}

function getWeb3Footer(web3, blIsMainnet) {
    if (!window.web3) return '';

    let provider;
    let logo;

    switch(true) {
        case window.web3.currentProvider.isMetaMask :
            provider = 'MetaMask'
            logo = <img src={LogoMetamask} />
        break;
        case window.web3.currentProvider.isTrust :
            provider = 'Trust'
            logo = <img src={LogoTrust} />
        break;
        case window.web3.currentProvider.isStatus :
            provider = 'Status'
            logo = <img src={LogoStatus} />
        break;       
        case window.web3.currentProvider.isToshi :
            provider = 'Coinbase Wallet'
            logo = <img src={LogoCoinbase} />
        break;           
        default:
            provider = 'an unnamed'
            logo = ''
        break;
    }

    return(
        <Web3FooterContainer>
            { provider !== "" 
                ?
                    <span>{logo} Web3 provided with {provider} injection</span>
                :
                    ``
            }
        </Web3FooterContainer>
    )
}

export { web3, getWeb3Footer }