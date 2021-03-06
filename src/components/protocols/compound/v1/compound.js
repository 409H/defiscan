import React, { Component } from 'react';
import AssetView from '../../asset-view';
import styled from 'styled-components';

import HasProfile from '../../../hasProfile'
import Currency from '../../../currency'

import LogoCompound from '../../../../images/compound.png'
import LogoDai from '../../../../images/dai.png'
import LogoWeth from '../../../../images/weth.png'
import LogoZrx from '../../../../images/zrx.png'
import LogoBat from '../../../../images/bat.png'
import LogoRep from '../../../../images/rep.png'

import { web3 } from '../../web3'
import { getPriceFeed } from '../../../PriceFeed';

const AssetContainer = styled.div`
`;

const CONTRACT_ADDR = "0x3fda67f7583380e67ef93072294a7fac882fd7e7";
const CONTRACT_ABI = [{"constant":true,"inputs":[{"name":"account","type":"address"},{"name":"asset","type":"address"}],"name":"getBorrowBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"originationFeeMantissa","type":"uint256"}],"name":"_setOriginationFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"requestedState","type":"bool"}],"name":"_setPaused","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"pendingAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOracle","type":"address"}],"name":"_setOracle","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"asset","type":"address"},{"name":"amount","type":"uint256"}],"name":"_withdrawEquity","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"asset","type":"address"},{"name":"amount","type":"uint256"}],"name":"borrow","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"asset","type":"address"},{"name":"interestRateModel","type":"address"}],"name":"_setMarketInterestRateModel","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"asset","type":"address"}],"name":"assetPrices","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"getAccountLiquidity","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCollateralMarketsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"oracle","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"liquidationDiscount","outputs":[{"name":"mantissa","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"markets","outputs":[{"name":"isSupported","type":"bool"},{"name":"blockNumber","type":"uint256"},{"name":"interestRateModel","type":"address"},{"name":"totalSupply","type":"uint256"},{"name":"supplyRateMantissa","type":"uint256"},{"name":"supplyIndex","type":"uint256"},{"name":"totalBorrows","type":"uint256"},{"name":"borrowRateMantissa","type":"uint256"},{"name":"borrowIndex","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"calculateAccountValues","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"asset","type":"address"},{"name":"amount","type":"uint256"}],"name":"repayBorrow","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"collateralRatio","outputs":[{"name":"mantissa","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newPendingAdmin","type":"address"}],"name":"_setPendingAdmin","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"supplyBalances","outputs":[{"name":"principal","type":"uint256"},{"name":"interestIndex","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"originationFee","outputs":[{"name":"mantissa","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"},{"name":"asset","type":"address"}],"name":"getSupplyBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"collateralMarkets","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"asset","type":"address"},{"name":"interestRateModel","type":"address"}],"name":"_supportMarket","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"collateralRatioMantissa","type":"uint256"},{"name":"liquidationDiscountMantissa","type":"uint256"}],"name":"_setRiskParameters","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"asset","type":"address"}],"name":"_suspendMarket","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"targetAccount","type":"address"},{"name":"assetBorrow","type":"address"},{"name":"assetCollateral","type":"address"},{"name":"requestedAmountClose","type":"uint256"}],"name":"liquidateBorrow","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"_acceptAdmin","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"asset","type":"address"},{"name":"amount","type":"uint256"}],"name":"supply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"asset","type":"address"},{"name":"requestedAmount","type":"uint256"}],"name":"withdraw","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"borrowBalances","outputs":[{"name":"principal","type":"uint256"},{"name":"interestIndex","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"},{"indexed":false,"name":"asset","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"startingBalance","type":"uint256"},{"indexed":false,"name":"newBalance","type":"uint256"}],"name":"SupplyReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"},{"indexed":false,"name":"asset","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"startingBalance","type":"uint256"},{"indexed":false,"name":"newBalance","type":"uint256"}],"name":"SupplyWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"},{"indexed":false,"name":"asset","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"startingBalance","type":"uint256"},{"indexed":false,"name":"borrowAmountWithFee","type":"uint256"},{"indexed":false,"name":"newBalance","type":"uint256"}],"name":"BorrowTaken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"},{"indexed":false,"name":"asset","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"startingBalance","type":"uint256"},{"indexed":false,"name":"newBalance","type":"uint256"}],"name":"BorrowRepaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"targetAccount","type":"address"},{"indexed":false,"name":"assetBorrow","type":"address"},{"indexed":false,"name":"borrowBalanceBefore","type":"uint256"},{"indexed":false,"name":"borrowBalanceAccumulated","type":"uint256"},{"indexed":false,"name":"amountRepaid","type":"uint256"},{"indexed":false,"name":"borrowBalanceAfter","type":"uint256"},{"indexed":false,"name":"liquidator","type":"address"},{"indexed":false,"name":"assetCollateral","type":"address"},{"indexed":false,"name":"collateralBalanceBefore","type":"uint256"},{"indexed":false,"name":"collateralBalanceAccumulated","type":"uint256"},{"indexed":false,"name":"amountSeized","type":"uint256"},{"indexed":false,"name":"collateralBalanceAfter","type":"uint256"}],"name":"BorrowLiquidated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldPendingAdmin","type":"address"},{"indexed":false,"name":"newPendingAdmin","type":"address"}],"name":"NewPendingAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldAdmin","type":"address"},{"indexed":false,"name":"newAdmin","type":"address"}],"name":"NewAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOracle","type":"address"},{"indexed":false,"name":"newOracle","type":"address"}],"name":"NewOracle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"asset","type":"address"},{"indexed":false,"name":"interestRateModel","type":"address"}],"name":"SupportedMarket","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldCollateralRatioMantissa","type":"uint256"},{"indexed":false,"name":"newCollateralRatioMantissa","type":"uint256"},{"indexed":false,"name":"oldLiquidationDiscountMantissa","type":"uint256"},{"indexed":false,"name":"newLiquidationDiscountMantissa","type":"uint256"}],"name":"NewRiskParameters","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOriginationFeeMantissa","type":"uint256"},{"indexed":false,"name":"newOriginationFeeMantissa","type":"uint256"}],"name":"NewOriginationFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"asset","type":"address"},{"indexed":false,"name":"interestRateModel","type":"address"}],"name":"SetMarketInterestRateModel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"asset","type":"address"},{"indexed":false,"name":"equityAvailableBefore","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"owner","type":"address"}],"name":"EquityWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"asset","type":"address"}],"name":"SuspendedMarket","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newState","type":"bool"}],"name":"SetPaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"error","type":"uint256"},{"indexed":false,"name":"info","type":"uint256"},{"indexed":false,"name":"detail","type":"uint256"}],"name":"Failure","type":"event"}];
const objContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDR)

class AddressSearch extends Component {
  _isMounted = false;

  constructor(args)
  {
    super(args);
    this.getSupplyBalances = this.getSupplyBalances.bind(this);
    this.getBorrowBalance = this.getBorrowBalance.bind(this);
    this.getInterestGained = this.getInterestGained.bind(this);
    this.getCurrentState = this.getCurrentState.bind(this);

    this.state = {
      "_USER": {
        "hasProfile": false,
        "allAssetsChecked": false,
        "totalStaked": 0,
        "totalBorrowed": 0
      },
      "DAI": {
        "ticker": "DAI",
        "value_in_usd": 0,
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
      },
      "WETH": {
        "ticker": "ETH",
        "value_in_usd": 0,
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
      },
      "ZRX": {
        "ticker": "ZRX",
        "value_in_usd": 0,
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
      },
      "REP": {
        "ticker": "REP",
        "value_in_usd": 0,
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
      },
      "BAT": {
        "ticker": "BAT",
        "value_in_usd": 0,
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
    this._isMounted = true;

    await this.getSupplyBalances("0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359", "DAI") //Get DAI
    await this.getSupplyBalances("0x0d8775f648430679a709e98d2b0cb6250d2887ef", "BAT") //Get BAT
    await this.getSupplyBalances("0x1985365e9f78359a9B6AD760e32412f4a445E862", "REP") //Get REP
    await this.getSupplyBalances("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", "WETH") //Get WETH
    await this.getSupplyBalances("0xe41d2489571d322189246dafa5ebde1f4699f498", "ZRX") //Get ZRX

    let objUser = this.getCurrentState("_USER");
    objUser.allAssetsChecked = true;
    this.setState({
      "_USER": objUser
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getCurrentState(strKey)
  {
    return this.state[strKey];
  }

  async getInterestGained(strAssetAddress)
  {
    return await objContract.methods.getSupplyBalance(this.props.address, strAssetAddress).call()
      .then(r => {
        return r;
      })
      .catch(e => {
        return 0;
      });
  }

  async getSupplyBalances(strAssetAddress, strAssetName)
  {
    await objContract.methods.supplyBalances(this.props.address, strAssetAddress).call()
      .then(async r => {

        if(this._isMounted === false) {
          return;
        }

        let objCurrentState = this.getCurrentState(strAssetName);
        objCurrentState.supply = {
          principal: web3.utils.fromWei(r.principal.toString(), "ether"),
          interestIndex: web3.utils.fromWei(r.interestIndex.toString(), "ether"),
          interestAmount: 0
        }
        objCurrentState.fetched = true;

        if(objCurrentState.supply.principal > 0) {
          // Calculate the interest gained
          const objInterest = await this.getInterestGained(strAssetAddress);
          objCurrentState.supply.interestAmount = web3.utils.fromWei((objInterest.toString() - r.principal.toString()).toString(), "ether")
        }

        // If principal or interest is > 0 then they have a profile
        let objUser = this.getCurrentState("_USER");
        if(objCurrentState.supply.principal > 0 || objCurrentState.supply.interestAmount) {
          objUser.hasProfile = true;
          objUser.totalStaked += parseFloat(objCurrentState.supply.principal)
          this.setState({
            "_USER": objUser
          });
        }

        if(objCurrentState.supply.principal > 0 || objCurrentState.supply.interestAmount > 0) {
          const priceData = await getPriceFeed(objCurrentState.ticker)
          objCurrentState.value_in_usd = priceData.error ? -1 : priceData.prices.price;
        }

        switch(strAssetName) {
          default:
            // Do nothing
          break;
          case 'DAI' :
            this.setState({
              "DAI": objCurrentState
            })
          break;
          case 'BAT' :
            this.setState({
              "BAT": objCurrentState
            })
          break;
          case 'WETH' :
            this.setState({
              "WETH": objCurrentState
            })
          break;
          case 'ZRX' :
          this.setState({
            "ZRX": objCurrentState
          })
          break;
        }

        await this.getBorrowBalance(strAssetAddress, strAssetName)

      }).catch(e => {
        console.log(e.message);
      });
  }

  async getBorrowBalance(strAssetAddress, strAssetName)
  {
    await objContract.methods.getBorrowBalance(this.props.address, strAssetAddress).call()
    .then(async r => {

      if(this._isMounted === false) {
        return;
      }
      
      let objCurrentState = this.getCurrentState(strAssetName);
      objCurrentState.borrow = {
        principal: web3.utils.fromWei(r.toString(), "ether")
      }

      // If borrow principal > 0 then they have a profile
      let objUser = this.getCurrentState("_USER");
      if(objCurrentState.borrow.principal > 0) {
        objUser.hasProfile = true;
        objUser.totalBorrowed += parseFloat(objCurrentState.borrow.principal)
        this.setState({
          "_USER": objUser
        });
      }
      
      if(objCurrentState.borrow.principal > 0) {
        const priceData = await getPriceFeed(objCurrentState.ticker)
        objCurrentState.value_in_usd = priceData.error ? -1 : priceData.prices.price;
      }

      switch(strAssetName) {
        default:
          // Do nothing
        break;
        case 'DAI' :
          this.setState({
            "DAI": objCurrentState
          })
        break;
        case 'BAT' :
          this.setState({
            "BAT": objCurrentState
          })
        break;
        case 'WETH' :
          this.setState({
            "WETH": objCurrentState
          })
        break;
        case 'ZRX' :
        this.setState({
          "ZRX": objCurrentState
        })
        break;
      }
    }).catch(e => {
      console.log(e);
    });
  }
    
  render() {
    const flStakedPerc = (this.state._USER.totalStaked / (this.state._USER.totalStaked+this.state._USER.totalBorrowed)*100).toFixed(4)
    const flBorrowPerc = (this.state._USER.totalBorrowed / (this.state._USER.totalStaked+this.state._USER.totalBorrowed)*100).toFixed(4)

    let flTotalStakedUsd = 0;
    let flTotalBorrowedUsd = 0;
    let flTotalInterestUsd = 0;

    if(this.state._USER.allAssetsChecked) {
      flTotalStakedUsd = 
        (parseFloat(this.state.DAI.value_in_usd) * (this.state.DAI.supply.principal))
        + (parseFloat(this.state.WETH.value_in_usd) * (this.state.WETH.supply.principal))
        + (parseFloat(this.state.ZRX.value_in_usd) * (this.state.ZRX.supply.principal))
        + (parseFloat(this.state.REP.value_in_usd) * (this.state.REP.supply.principal))
        + (parseFloat(this.state.BAT.value_in_usd) * (this.state.BAT.supply.principal))
      ;

      flTotalBorrowedUsd = 
        (parseFloat(this.state.DAI.value_in_usd) * (this.state.DAI.borrow.principal))
        + (parseFloat(this.state.WETH.value_in_usd) * (this.state.WETH.borrow.principal))
        + (parseFloat(this.state.ZRX.value_in_usd) * (this.state.ZRX.borrow.principal))
        + (parseFloat(this.state.REP.value_in_usd) * (this.state.REP.borrow.principal))
        + (parseFloat(this.state.BAT.value_in_usd) * (this.state.BAT.borrow.principal))
      ;

      flTotalInterestUsd = 
        (parseFloat(this.state.DAI.value_in_usd) * (this.state.DAI.supply.interestAmount))
        + (parseFloat(this.state.WETH.value_in_usd) * (this.state.WETH.supply.interestAmount))
        + (parseFloat(this.state.ZRX.value_in_usd) * (this.state.ZRX.supply.interestAmount))
        + (parseFloat(this.state.REP.value_in_usd) * (this.state.REP.supply.interestAmount))
        + (parseFloat(this.state.BAT.value_in_usd) * (this.state.BAT.supply.interestAmount))
      ;
    }

    return (
        <AssetContainer>
          
          <HasProfile profile="Compound Finance (v1)" bool={this.state._USER.hasProfile} />

          { this.state._USER.hasProfile
            ?
              <AssetView
                heading="OVERVIEW"
                icon={LogoCompound}
                rows={[
                  ["STAKED", <Currency value={flStakedPerc} symbol="%" usd_value={flTotalStakedUsd} interest_amount={flTotalInterestUsd} />],
                  ["BORROWED", <Currency value={flBorrowPerc} symbol="%" usd_value={flTotalBorrowedUsd} />],
                ]}
                pieChart={{
                  title: "STAKED & BORROWED",
                  data: [
                    {title: "STAKED", value: this.state._USER.totalStaked, color: "#007896"},
                    {title: "BORROWED", value: this.state._USER.totalBorrowed, color: "#004759"}
                  ]
                }}
                fetched={this.state._USER.allAssetsChecked}
              />
            :
              <AssetView 
                heading="OVERVIEW"
                icon={LogoCompound}
                rows={[
                  ["NO OVERVIEW", "No active profile"],
                ]}
                fetched={this.state._USER.allAssetsChecked}
              />
          }

          <AssetView 
            heading="DAI"
            icon={LogoDai}
            rows={[
              ["STAKED", <Currency value={this.state.DAI.supply.principal} symbol="DAI" usd_value={this.state.DAI.value_in_usd*parseFloat(this.state.DAI.supply.principal)} />],
              ["INTEREST GAINED", <Currency value={this.state.DAI.supply.interestAmount} symbol="DAI" usd_value={this.state.DAI.value_in_usd*parseFloat(this.state.DAI.supply.interestAmount)} />],
              ["BORROWED", <Currency value={this.state.DAI.borrow.principal} symbol="DAI" usd_value={this.state.DAI.value_in_usd*parseFloat(this.state.DAI.borrow.principal)} />],
            ]}
            fetched={this.state.DAI.fetched}
          />
          <AssetView 
            heading="WETH"
            icon={LogoWeth}
            rows={[
              ["STAKED", <Currency value={this.state.WETH.supply.principal} symbol="WETH" usd_value={this.state.WETH.value_in_usd*parseFloat(this.state.WETH.supply.principal)} />],
              ["INTEREST GAINED", <Currency value={this.state.WETH.supply.interestAmount} symbol="WETH" usd_value={this.state.WETH.value_in_usd*parseFloat(this.state.WETH.supply.interestAmount)} />],
              ["BORROWED", <Currency value={this.state.WETH.borrow.principal} symbol="WETH" usd_value={this.state.WETH.value_in_usd*parseFloat(this.state.WETH.borrow.principal)} />],
            ]}
            fetched={this.state.WETH.fetched}
          />
          <AssetView 
            heading="ZRX"
            icon={LogoZrx}
            rows={[
              ["STAKED", <Currency value={this.state.ZRX.supply.principal} symbol="ZRX" usd_value={this.state.ZRX.value_in_usd*parseFloat(this.state.ZRX.borrow.principal)} />],
              ["INTEREST GAINED", <Currency value={this.state.ZRX.supply.interestAmount} symbol="ZRX" usd_value={this.state.ZRX.value_in_usd*parseFloat(this.state.ZRX.supply.interestAmount)} />],
              ["BORROWED", <Currency value={this.state.ZRX.borrow.principal} symbol="ZRX" usd_value={this.state.ZRX.value_in_usd*parseFloat(this.state.ZRX.borrow.principal)} />],
            ]}
            fetched={this.state.ZRX.fetched}
          />
          <AssetView 
            heading="REP"
            icon={LogoRep}
            rows={[
              ["STAKED", <Currency value={this.state.REP.supply.principal} symbol="REP" usd_value={this.state.REP.value_in_usd*parseFloat(this.state.REP.borrow.principal)} />],
              ["INTEREST GAINED", <Currency value={this.state.REP.supply.interestAmount} symbol="REP" usd_value={this.state.REP.value_in_usd*parseFloat(this.state.REP.supply.interestAmount)} />],
              ["BORROWED", <Currency value={this.state.REP.borrow.principal} symbol="REP" usd_value={this.state.REP.value_in_usd*parseFloat(this.state.REP.borrow.principal)} />],
            ]}
            fetched={this.state.REP.fetched}
          />
          <AssetView 
            heading="BAT"
            icon={LogoBat}
            rows={[
              ["STAKED", <Currency value={this.state.BAT.supply.principal} symbol="BAT" usd_value={this.state.BAT.value_in_usd*parseFloat(this.state.BAT.borrow.principal)} />],
              ["INTEREST GAINED", <Currency value={this.state.BAT.supply.interestAmount} symbol="BAT" usd_value={this.state.BAT.value_in_usd*parseFloat(this.state.BAT.supply.interestAmount)} />],
              ["BORROWED", <Currency value={this.state.BAT.borrow.principal} symbol="BAT" usd_value={this.state.BAT.value_in_usd*parseFloat(this.state.BAT.borrow.principal)} />],
            ]}
            fetched={this.state.BAT.fetched}
          />
        </AssetContainer>
    );
  }
}

export default AddressSearch;
