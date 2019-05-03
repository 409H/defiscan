import React, { Component } from 'react';
import AssetView from '../asset-view';
import { BigNumber as BN } from 'bignumber.js'
import styled, { ThemeProvider } from 'styled-components';

import HasProfile from '../../hasProfile'
import Currency from '../../currency'

import LogoDai from '../../../images/dai.png'
import LogoMkr from '../../../images/maker.png'
import LogoSpank from '../../../images/spankchain.svg'
import LogoAnt from '../../../images/aragon.png'
import LogoZrx from '../../../images/zrx.png'
import LogoRep from '../../../images/rep.png'
import LogoBat from '../../../images/bat.png'

import LogoUniswap from '../../../images/uniswap.png'

import { web3 } from '../web3' 

const SubText = styled.div`
    display: inline-block;
    font-size: 10pt;
    margin-left: 0.5em;
    ${props => props.isError ? "color: #ff9898;" : ""}
`

const CONTRACT_ADDR = "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95";
const CONTRACT_FACTORY_ABI = 
[{"name": "TokenPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "eth_sold", "indexed": true}, {"type": "uint256", "name": "tokens_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "EthPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "tokens_sold", "indexed": true}, {"type": "uint256", "name": "eth_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "AddLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "RemoveLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "Transfer", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "address", "name": "_to", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "Approval", "inputs": [{"type": "address", "name": "_owner", "indexed": true}, {"type": "address", "name": "_spender", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "setup", "outputs": [], "inputs": [{"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 175875}, {"name": "addLiquidity", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_liquidity"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 82605}, {"name": "removeLiquidity", "outputs": [{"type": "uint256", "name": "out"}, {"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "amount"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 116814}, {"name": "__default__", "outputs": [], "inputs": [], "constant": false, "payable": true, "type": "function"}, {"name": "ethToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 12757}, {"name": "ethToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 12965}, {"name": "ethToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 50463}, {"name": "ethToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 50671}, {"name": "tokenToEthSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 47503}, {"name": "tokenToEthTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 47712}, {"name": "tokenToEthSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 50175}, {"name": "tokenToEthTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 50384}, {"name": "tokenToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51007}, {"name": "tokenToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51098}, {"name": "tokenToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 54928}, {"name": "tokenToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 55019}, {"name": "tokenToExchangeSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49342}, {"name": "tokenToExchangeTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49532}, {"name": "tokenToExchangeSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53233}, {"name": "tokenToExchangeTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53423}, {"name": "getEthToTokenInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5542}, {"name": "getEthToTokenOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6872}, {"name": "getTokenToEthInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5637}, {"name": "getTokenToEthOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6897}, {"name": "tokenAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1413}, {"name": "factoryAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1443}, {"name": "balanceOf", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}], "constant": true, "payable": false, "type": "function", "gas": 1645}, {"name": "transfer", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 75034}, {"name": "transferFrom", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_from"}, {"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 110907}, {"name": "approve", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_spender"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 38769}, {"name": "allowance", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}, {"type": "address", "name": "_spender"}], "constant": true, "payable": false, "type": "function", "gas": 1925}, {"name": "name", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1623}, {"name": "symbol", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1653}, {"name": "decimals", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1683}, {"name": "totalSupply", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1713}];

const CONTRACT_EXCHANGE_ABI = [{"name": "TokenPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "eth_sold", "indexed": true}, {"type": "uint256", "name": "tokens_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "EthPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "tokens_sold", "indexed": true}, {"type": "uint256", "name": "eth_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "AddLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "RemoveLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "Transfer", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "address", "name": "_to", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "Approval", "inputs": [{"type": "address", "name": "_owner", "indexed": true}, {"type": "address", "name": "_spender", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "setup", "outputs": [], "inputs": [{"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 175875}, {"name": "addLiquidity", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_liquidity"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 82616}, {"name": "removeLiquidity", "outputs": [{"type": "uint256", "name": "out"}, {"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "amount"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 116814}, {"name": "__default__", "outputs": [], "inputs": [], "constant": false, "payable": true, "type": "function"}, {"name": "ethToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 12757}, {"name": "ethToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 12965}, {"name": "ethToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 50463}, {"name": "ethToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 50671}, {"name": "tokenToEthSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 47503}, {"name": "tokenToEthTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 47712}, {"name": "tokenToEthSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 50175}, {"name": "tokenToEthTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 50384}, {"name": "tokenToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51007}, {"name": "tokenToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51098}, {"name": "tokenToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 54928}, {"name": "tokenToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 55019}, {"name": "tokenToExchangeSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49342}, {"name": "tokenToExchangeTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49532}, {"name": "tokenToExchangeSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53233}, {"name": "tokenToExchangeTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53423}, {"name": "getEthToTokenInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5542}, {"name": "getEthToTokenOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6872}, {"name": "getTokenToEthInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5637}, {"name": "getTokenToEthOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6897}, {"name": "tokenAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1413}, {"name": "factoryAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1443}, {"name": "balanceOf", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}], "constant": true, "payable": false, "type": "function", "gas": 1645}, {"name": "transfer", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 75034}, {"name": "transferFrom", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_from"}, {"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 110907}, {"name": "approve", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_spender"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 38769}, {"name": "allowance", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}, {"type": "address", "name": "_spender"}], "constant": true, "payable": false, "type": "function", "gas": 1925}, {"name": "name", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1623}, {"name": "symbol", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1653}, {"name": "decimals", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1683}, {"name": "totalSupply", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1713}];

const CONTRACT_TOKEN_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"guy","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"symbol_","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"}];

class Uniswap extends Component {
  _isMounted = false;

  constructor(args)
  {
    super(args);
    this.populateRecord = this.populateRecord.bind(this);

    // https://github.com/Uniswap/uniswap-frontend/blob/f8b8cd0ed01f7f4e612a76d8882b723ddfb20f47/src/ducks/addresses.js
    this.state = {
      "_USER": {
        "hasProfile": false,
        "totalShare": 0,
        "totalOtherShare": 100,
        "allAssetsChecked": false
      },
      "DAI": {
        "addresses": {
            "exchange": "0x09cabec1ead1c0ba254b09efb3ee13841712be14",
            "token": "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359"
        },
        "meta": {
            "decimals": 18,
        },
        "price": {
          "EthToToken": 0,
          "TokenToEth": 1
        }, 
        "user": {
          "balance": 0,
          "liquidityBalance": 0,
          "balance_in_eth": 0,
          "share_perc": 0
        },
        "exchange": {
            "totalSupply": 0,
            "currentPool": 0
        },
        "fetched": false
      },
      "MKR": {
        "addresses": {
            "exchange": "0x2C4Bd064b998838076fa341A83d007FC2FA50957",
            "token": "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2"
        },
        "meta": {
            "decimals": 18,
        },
        "price": {
            "EthToToken": 0,
            "TokenToEth": 1
        }, 
        "user": {
            "balance": 0,
            "liquidityBalance": 0,
            "balance_in_eth": 0,
            "share_perc": 0
        },
        "exchange": {
            "totalSupply": 0,
            "currentPool": 0
        },
        "fetched": false
      },
      "SPANK": {
        "addresses": {
            "exchange": "0x4e395304655F0796bc3bc63709DB72173b9DdF98",
            "token": "0x42d6622deCe394b54999Fbd73D108123806f6a18"
        },
        "meta": {
            "decimals": 18,
        },
        "price": {
          "EthToToken": 0,
          "TokenToEth": 1
        }, 
        "user": {
          "balance": 0,
          "liquidityBalance": 0,
          "balance_in_eth": 0,
          "share_perc": 0
        },
        "exchange": {
            "totalSupply": 0,
            "currentPool": 0
        },
        "fetched": false
      },
      "ANT": {
        "addresses": {
            "exchange": "0x077d52B047735976dfdA76feF74d4d988AC25196",
            "token": "0x960b236A07cf122663c4303350609A66A7B288C0"
        },
        "meta": {
            "decimals": 18,
        },
        "price": {
          "EthToToken": 0,
          "TokenToEth": 1
        }, 
        "user": {
          "balance": 0,
          "liquidityBalance": 0,
          "balance_in_eth": 0,
          "share_perc": 0
        },
        "exchange": {
            "totalSupply": 0,
            "currentPool": 0
        },
        "fetched": false
      },
      "ZRX": {
        "addresses": {
            "exchange": "0xaE76c84C9262Cdb9abc0C2c8888e62Db8E22A0bF",
            "token": "0xE41d2489571d322189246DaFA5ebDe1F4699F498"
        },
        "meta": {
            "decimals": 18,
        },
        "price": {
          "EthToToken": 0,
          "TokenToEth": 1
        }, 
        "user": {
          "balance": 0,
          "liquidityBalance": 0,
          "balance_in_eth": 0,
          "share_perc": 0
        },
        "exchange": {
            "totalSupply": 0,
            "currentPool": 0
        },
        "fetched": false
      },
      "REP": {
        "addresses": {
            "exchange": "0x48B04d2A05B6B604d8d5223Fd1984f191DED51af",
            "token": "0x1985365e9f78359a9B6AD760e32412f4a445E862"
        },
        "meta": {
            "decimals": 18,
        },
        "price": {
          "EthToToken": 0,
          "TokenToEth": 1
        }, 
        "user": {
          "balance": 0,
          "liquidityBalance": 0,
          "balance_in_eth": 0,
          "share_perc": 0
        },
        "exchange": {
            "totalSupply": 0,
            "currentPool": 0
        },
        "fetched": false
      },
      "BAT": {
        "addresses": {
            "exchange": "0x2E642b8D59B45a1D8c5aEf716A84FF44ea665914",
            "token": "0x0D8775F648430679A709E98d2b0Cb6250d2887EF"
        },
        "meta": {
            "decimals": 18,
        },
        "price": {
          "EthToToken": 0,
          "TokenToEth": 1
        }, 
        "user": {
          "balance": 0,
          "liquidityBalance": 0,
          "balance_in_eth": 0,
          "share_perc": 0
        },
        "exchange": {
            "totalSupply": 0,
            "currentPool": 0
        },
        "fetched": false
      }            
    }
  }

  async componentDidMount()
  {
    this._isMounted = true;

    await this.populateRecord("DAI")
    await this.populateRecord("MKR")
    await this.populateRecord("SPANK")
    await this.populateRecord("ANT")
    await this.populateRecord("ZRX")
    await this.populateRecord("REP")
    await this.populateRecord("BAT")

    let objUser = this.getCurrentState("_USER")
    objUser.allAssetsChecked = true
    this.setState({
      "_USER": objUser
    })

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getCurrentState(strKey)
  {
    return this.state[strKey];
  }

  async populateRecord(strAssetName)
  {
    const objContract = new web3.eth.Contract(CONTRACT_EXCHANGE_ABI, this.state[strAssetName].addresses.exchange);

    await objContract.methods.balanceOf(this.props.address).call()
      .then(async intAddressLiquidityBalance => {
        if(this._isMounted === false) {
            return;
        }

        let objCurrentState = this.getCurrentState(strAssetName);

        objCurrentState.price.EthToToken = await objContract.methods.getEthToTokenInputPrice(1).call();
        objCurrentState.price.TokenToEth = await objContract.methods.getTokenToEthOutputPrice(1).call();

        const totalSupply = await objContract.methods.totalSupply().call();
        objCurrentState.exchange.totalSupply = BN(totalSupply).dividedBy(10 ** this.state[strAssetName].meta.decimals).toFixed(this.state[strAssetName].meta.decimals);

        const decimals = this.state[strAssetName].meta.decimals // coolio

        const objTokenContract = new web3.eth.Contract(CONTRACT_TOKEN_ABI, this.state[strAssetName].addresses.token);
        let intTokenValue = await objTokenContract.methods.balanceOf(this.state[strAssetName].addresses.exchange).call()
        const tokenValue = BN(intTokenValue)
        const liquidityBalance = BN(intAddressLiquidityBalance)
        const ethValue = BN(objCurrentState.price.EthToToken) // getBalance(exchangeAddress)

        const ownership = liquidityBalance.dividedBy(totalSupply) //mirror
        const ethPer = ethValue.dividedBy(totalSupply) //mirror
        const tokenPer = tokenValue.dividedBy(totalSupply) //mirror
        const ownedEth = ethPer.multipliedBy(liquidityBalance).dividedBy(10 ** 18) //mirror
        const ownedToken = tokenPer.multipliedBy(liquidityBalance).dividedBy(10 ** decimals) //mirror

        objCurrentState.exchange.currentPool = tokenValue.dividedBy(10 ** decimals).toFixed(decimals)
        
        objCurrentState.user = {
          balance: ownedToken.toFixed(decimals),
          balance_in_eth: ownedToken.dividedBy(objCurrentState.price.TokenToEth).toFixed(18),
          liquidityBalance: liquidityBalance,
          share_perc: ownership.multipliedBy(100).toFixed(4)
        }

        objCurrentState.fetched = true;

        // If pooled > 0
        let objUser = this.getCurrentState("_USER");
        if(objCurrentState.user.balance > 0) {
          objUser.hasProfile = true;
          this.setState({
            "_USER": objUser
          });
        }

        switch(strAssetName) {
            case 'DAI' :
              this.setState({
                "DAI": objCurrentState
              })
            break;
            case 'MKR' :
              this.setState({
                "MKR": objCurrentState
              })
            break;
            case 'SPANK' :
              this.setState({
                "SPANK": objCurrentState
              })
            break;    
            case 'ANT' :
              this.setState({
                "ANT": objCurrentState
              })
            break;
            case 'ZRX' :
              this.setState({
                "ZRX": objCurrentState
              })
            break;
            case 'REP' :
              this.setState({
                "REP": objCurrentState
              })
            break;
            case 'BAT' :
              this.setState({
                "BAT": objCurrentState
              })
            break;                                
          }
        }).catch(e => {
          console.log(e.message);
        });
  }
    
  render() {
    return (
        <div>

          <HasProfile profile="Uniswap" bool={this.state._USER.hasProfile} />

          {/* { 
            (this.state._USER.totalShare / this.state._USER.totalOtherShare)*100 > 3
              ? 
                <AssetView
                  heading="OVERVIEW"
                  icon={LogoUniswap}
                  rows={[
                    ["ADDRESS SHARE", (this.state._USER.totalShare/(this.state._USER.totalShare+this.state._USER.totalOtherShare)*100).toFixed(2)+"%"],
                    ["OTHERS SHARE", (this.state._USER.totalOtherShare/(this.state._USER.totalShare+this.state._USER.totalOtherShare)*100).toFixed(2)+"%"]
                  ]}
                  pieChart={{
                    title: "SHARE",
                    data: [
                      {title: "YOUR SHARE", value: this.state._USER.totalShare, color: "#007896"},
                      {title: "OTHER SHARE", value: this.state._USER.totalOtherShare, color: "#004759"}
                    ]
                  }}
                  fetched={this.state._USER.allAssetsChecked}
                />
              :
                <AssetView
                  heading="OVERVIEW"
                  icon={LogoUniswap}
                  rows={[
                    ["TOTAL ADDRESS SHARE", ((this.state._USER.totalShare / this.state._USER.totalOtherShare)*100).toFixed(2) + "%"]
                  ]}
                  fetched={this.state._USER.allAssetsChecked}
                />              
          } */}

          <AssetView
            heading="DAI"
            icon={LogoDai}
            rows={[
              ["POOLED", <Currency value={this.state.DAI.user.balance} symbol="DAI" />],
              //["ETH VALUE", <Currency value={this.state.DAI.user.balance_in_eth} symbol="ETH" />],
              ["POOL SIZE", <Currency value={this.state.DAI.exchange.currentPool} symbol="DAI" />],
              ["ADDRESS SHARE", this.state.DAI.user.share_perc + "%"]
            ]}
            fetched={this.state.DAI.fetched}
          />
          <AssetView 
            heading="MKR"
            icon={LogoMkr}
            rows={[
              ["POOLED", <Currency value={this.state.MKR.user.balance} symbol="MKR" />],
              //["ETH VALUE", <Currency value={this.state.MKR.user.balance_in_eth} symbol="ETH" />],
              ["POOL SIZE", <Currency value={this.state.MKR.exchange.currentPool} symbol="MKR" />],
              ["ADDRESS SHARE", this.state.MKR.user.share_perc + "%"]
            ]}
            fetched={this.state.MKR.fetched}
          />
          <AssetView 
            heading="SPANK"
            icon={LogoSpank}
            rows={[
              ["POOLED", <Currency value={this.state.SPANK.user.balance} symbol="SPANK" />],
              //["ETH VALUE", <Currency value={this.state.SPANK.user.balance_in_eth} symbol="ETH" />],
              ["POOL SIZE", <Currency value={this.state.SPANK.exchange.currentPool} symbol="SPANK" />],
              ["ADDRESS SHARE", this.state.SPANK.user.share_perc + "%"]
            ]}
            fetched={this.state.SPANK.fetched}
          />
          <AssetView 
            heading="ANT"
            icon={LogoAnt}
            rows={[
              ["POOLED", <Currency value={this.state.ANT.user.balance} symbol="ANT" />],
              //["ETH VALUE", <Currency value={this.state.ANT.user.balance_in_eth} symbol="ETH" />],
              ["POOL SIZE", <Currency value={this.state.ANT.exchange.currentPool} symbol="ANT" />],
              ["ADDRESS SHARE", this.state.ANT.user.share_perc + "%"]
            ]}
            fetched={this.state.ANT.fetched}
          />
          <AssetView 
            heading="ZRX"
            icon={LogoZrx}
            rows={[
              ["POOLED", <Currency value={this.state.ZRX.user.balance} symbol="ZRX" />],
              //["ETH VALUE", <Currency value={this.state.ZRX.user.balance_in_eth} symbol="ETH" />],
              ["POOL SIZE", <Currency value={this.state.ZRX.exchange.currentPool} symbol="ZRX" />],
              ["ADDRESS SHARE", this.state.ZRX.user.share_perc + "%"]
            ]}
            fetched={this.state.ZRX.fetched}
          />
          <AssetView 
            heading="BAT"
            icon={LogoBat}
            rows={[
              ["POOLED", <Currency value={this.state.BAT.user.balance} symbol="BAT" />],
              //["ETH VALUE", <Currency value={this.state.BAT.user.balance_in_eth} symbol="ETH" />],
              ["POOL SIZE", <Currency value={this.state.BAT.exchange.currentPool} symbol="BAT" />],
              ["ADDRESS SHARE", this.state.BAT.user.share_perc + "%"]
            ]}
            fetched={this.state.BAT.fetched}
          />                       
        </div>
    );
  }
}

export default Uniswap;
