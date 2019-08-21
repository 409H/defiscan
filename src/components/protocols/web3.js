import React from 'react';
import styled from 'styled-components'

import Web3 from 'web3';

import LogoMetamask from '../../images/providers/metamask.png'
import LogoCoinbase from '../../images/providers/coinbase.jpg'
import LogoStatus from '../../images/providers/status.png'
import LogoTrust from '../../images/providers/trust.png'
import LogoBoE from '../../images/built-on-ethereum.svg'
import LogoDefiPulse from '../../images/defipulse.svg'

const Web3FooterContainer = styled.div`
    width: 100%;
    background: #fff;
    z-index: 1;
    position: fixed;
    bottom: 0em;
    left: 0em;
    padding: 1em;
    font-size: 8pt;
    text-align: center;

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
    web3 = new Web3(new Web3.providers.HttpProvider("https://freely-central-lark.quiknode.io/9fe4c4a0-2ea2-4ac1-ab64-f92990cd2914/118-xxADc8hKSSB9joCb-g==/"))
}

function getWeb3Footer(web3, blIsMainnet) 
{
    let provider = "";
    let logo = "";

    if(window.web3) {
        switch(true) {
            case window.web3.currentProvider.isMetaMask :
                provider = 'MetaMask'
                logo = <img src={LogoMetamask} alt="MetaMask Logo"/>
            break;
            case window.web3.currentProvider.isTrust :
                provider = 'Trust'
                logo = <img src={LogoTrust} alt="Trust Logo"/>
            break;
            case window.web3.currentProvider.isStatus :
                provider = 'Status'
                logo = <img src={LogoStatus} alt="Status Logo"/>
            break;       
            case window.web3.currentProvider.isToshi :
                provider = 'Coinbase Wallet'
                logo = <img src={LogoCoinbase} alt="Coinbase Logo"/>
            break;           
            default:
                provider = 'an unnamed'
                logo = ''
            break;
        }
    }

    let strFooterPriceFeedText = ``;

    return(
        <Web3FooterContainer>
            { provider !== "" 
                ?
                    <span>{logo} Web3 provided with {provider} injection<br /></span>
                :
                    ``
            }
            <span>Prices sourced from <a href="https://nomics.com/" target="_blank" rel="noopener noreferrer">https://nomics.com/</a> {strFooterPriceFeedText}</span>
            <br /><br />
            <center><a href="https://defipulse.com/" target="_blank" rel="noopener noreferrer"><img src={LogoDefiPulse} alt="DefiPulse Logo" title="Partnered with DefiPulse" height="15px" /></a></center>
            <br />
            <center><img src={LogoBoE} title="Built on Ethereum" alt="Built on Ethereum" height="30px" /></center>
        </Web3FooterContainer>
    )
}

export { web3, getWeb3Footer }