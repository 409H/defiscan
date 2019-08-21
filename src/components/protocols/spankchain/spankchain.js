import React, { Component } from 'react';
import AssetView from '../asset-view';
import { BigNumber as BN } from 'bignumber.js'
import styled from 'styled-components';

import HasProfile from '../../hasProfile'
import Currency from '../../currency'

import LogoSpank from '../../../images/spankBankChainsaw.svg'
import { Identicon, Copyable, Table } from '@mycrypto/ui';

import { web3 } from '../web3'
import { getPriceFeed } from '../../PriceFeed';

const CONTRACT_ADDR = "0x1ecb60873e495ddfa2a13a8f4140e490dd574e6f";
const CONTRACT_ABI = [{"constant":true,"inputs":[],"name":"currentPeriod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"voteToClose","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newDelegateKey","type":"address"}],"name":"updateDelegateKey","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spankAmount","type":"uint256"},{"name":"stakePeriods","type":"uint256"},{"name":"delegateKey","type":"address"},{"name":"bootyBase","type":"address"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"stakerAddress","type":"address"},{"name":"period","type":"uint256"}],"name":"getSpankPoints","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bootyToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxPeriods","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"mintBooty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"stakerByDelegateKey","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"stakerAddress","type":"address"},{"name":"period","type":"uint256"}],"name":"getVote","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"delegateAddress","type":"address"}],"name":"getStakerFromDelegateKey","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"amount","type":"uint256"},{"name":"tokenContract","type":"address"},{"name":"extraData","type":"bytes"}],"name":"receiveApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"stakers","outputs":[{"name":"spankStaked","type":"uint256"},{"name":"startingPeriod","type":"uint256"},{"name":"endingPeriod","type":"uint256"},{"name":"delegateKey","type":"address"},{"name":"bootyBase","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"spankToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newBootyBase","type":"address"}],"name":"updateBootyBase","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pointsTable","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"claimPeriod","type":"uint256"}],"name":"claimBooty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"updatePeriod","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAddress","type":"address"},{"name":"newDelegateKey","type":"address"},{"name":"newBootyBase","type":"address"},{"name":"spankAmount","type":"uint256"}],"name":"splitStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isClosed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"stakerAddress","type":"address"},{"name":"period","type":"uint256"}],"name":"getDidClaimBooty","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSpankStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"updatedEndingPeriod","type":"uint256"}],"name":"checkIn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"periods","outputs":[{"name":"bootyFees","type":"uint256"},{"name":"totalSpankPoints","type":"uint256"},{"name":"bootyMinted","type":"uint256"},{"name":"mintingComplete","type":"bool"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"closingVotes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"bootyAmount","type":"uint256"}],"name":"sendFees","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_periodLength","type":"uint256"},{"name":"_maxPeriods","type":"uint256"},{"name":"spankAddress","type":"address"},{"name":"initialBootySupply","type":"uint256"},{"name":"bootyTokenName","type":"string"},{"name":"bootyDecimalUnits","type":"uint8"},{"name":"bootySymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"periodLength","type":"uint256"},{"indexed":false,"name":"maxPeriods","type":"uint256"},{"indexed":false,"name":"spankAddress","type":"address"},{"indexed":false,"name":"initialBootySupply","type":"uint256"},{"indexed":false,"name":"bootyTokenName","type":"string"},{"indexed":false,"name":"bootyDecimalUnits","type":"uint8"},{"indexed":false,"name":"bootySymbol","type":"string"}],"name":"SpankBankCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"period","type":"uint256"},{"indexed":false,"name":"spankPoints","type":"uint256"},{"indexed":false,"name":"spankAmount","type":"uint256"},{"indexed":false,"name":"stakePeriods","type":"uint256"},{"indexed":false,"name":"delegateKey","type":"address"},{"indexed":false,"name":"bootyBase","type":"address"}],"name":"StakeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"bootyAmount","type":"uint256"}],"name":"SendFeesEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"targetBootySupply","type":"uint256"},{"indexed":false,"name":"totalBootySupply","type":"uint256"}],"name":"MintBootyEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"period","type":"uint256"},{"indexed":false,"name":"spankPoints","type":"uint256"},{"indexed":false,"name":"stakerEndingPeriod","type":"uint256"}],"name":"CheckInEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"period","type":"uint256"},{"indexed":false,"name":"bootyOwed","type":"uint256"}],"name":"ClaimBootyEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"totalSpankToWithdraw","type":"uint256"}],"name":"WithdrawStakeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"newAddress","type":"address"},{"indexed":false,"name":"newDelegateKey","type":"address"},{"indexed":false,"name":"newBootyBase","type":"address"},{"indexed":false,"name":"spankAmount","type":"uint256"}],"name":"SplitStakeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"period","type":"uint256"}],"name":"VoteToCloseEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"newDelegateKey","type":"address"}],"name":"UpdateDelegateKeyEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"newBootyBase","type":"address"}],"name":"UpdateBootyBaseEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"tokenContract","type":"address"}],"name":"ReceiveApprovalEvent","type":"event"}];
const objContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDR)

const SubText = styled.div`
    display: inline-block;
    font-size: 10pt;
    margin-left: 0.5em;
    ${props => props.isError ? "color: #ff9898;" : ""}
`

const AddressContainer = styled.div`
    display: flex;
    > img {
        height: 25px;
        width: 25px;
        display: inline-block;
        margin-right: 0.5em;
    }

    > div {
        display: inline-block;   
    }
`

const VoteAndClaimTable = styled.div`
    > table {
        > thead {
            > tr {
                > th {
                    font-size: 10pt;
                }
            }
        }
        > tbody {
            > tr {
                > td {
                    font-size: 10pt;
                }
            }
        }
    }
`

const NoParticipationContainer = styled.div`
    font-size: 10pt;
    display: inline-block;

    > div {
        display: inline-block;
        > div {
            > div {
                > button {
                    font-size: 10pt;
                }
            }
        }
    }
`

const BoolVal = styled.span`
    color: ${props => props.bool ? "#33dc59" : "#ff9898"};
`

class SpankChain extends Component {
  _isMounted = false;
  _blGettingPeriodInBg = false;

  constructor(args)
  {
    super(args);
    this.getStakers = this.getStakers.bind(this);
    this.getPeriod = this.getPeriod.bind(this);
    this.getMorePeriods = this.getMorePeriods.bind(this);
    this.getCurrentState = this.getCurrentState.bind(this);

    this.state = {
        "_USER": {
            "hasProfile": false
        },
        "STAKE": {
            "ticker": "SPANK",
            "value_in_usd": 0,
            "bootyBase": 0,
            "delegateKey": 0,
            "spankStaked": 0,
            "endingPeriod": 0,
            "startingPeriod": 0,
            "fetched": false,
            "stakeAddress": null
        },
        "PERIOD": {
            "currentPeriod": 0,
            "claimedCurrentPeriod": false,
            "votedCurrentPeriod": false,
            "getMorePeriodInBg": false,
            "startTime": 0,
            "endTime": 0,
            "CLAIMED": [
                // An array holding period and bool for claimed or not
            ],
            "fetched": false
        }
      }
  }

  async componentDidMount()
  {
    this._isMounted = true;

    await this.getStakers();
    await this.getPeriod();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getCurrentState(strKey)
  {
    return this.state[strKey];
  }

  async getStakers()
  {
    await objContract.methods.stakers(this.props.address).call()
      .then(async r => {

        if(this._isMounted === false) {
          return;
        }

        let objStake = this.getCurrentState("STAKE");
        objStake.bootyBase = r.bootyBase;
        objStake.delegateKey = r.delegateKey;
        objStake.stakeAddress = await objContract.methods.getStakerFromDelegateKey(objStake.delegateKey);
        objStake.spankStaked = BN(r.spankStaked).dividedBy(10**18).toFixed(7);
        objStake.endingPeriod = r.endingPeriod;
        objStake.startingPeriod = r.startingPeriod;
        objStake.fetched = true

        const priceData = await getPriceFeed(objStake.ticker)
        objStake.value_in_usd = priceData.error ? -1 : priceData.prices.price;

        this.setState({
            "STAKE": objStake
        })

        let objUser = this.getCurrentState("_USER");
        if(objStake.startingPeriod > 0) {
            objUser.hasProfile = true;
            this.setState({
                "_USER": objUser
            });
        }

      }).catch(e => {
        console.log(e.message);
      });
  }

  async getPeriod()
  {
    await objContract.methods.currentPeriod().call()
      .then(async r => {

        if(this._isMounted === false) {
          return;
        }

        if(this.state._USER.hasProfile === false) {
            let objPeriod = this.getCurrentState("PERIOD");
            objPeriod.fetched = true;
            this.setState({
                "PERIOD": objPeriod
            })
            return;
        }
        
        let objPeriod = this.getCurrentState("PERIOD");
        objPeriod.currentPeriod = r;
        objPeriod.getMorePeriodInBg = true;
        objPeriod.fetched = true;

        this.setState({
            "PERIOD": objPeriod
        })

        await this.getPeriodDetails(r);

      }).catch(e => {
        console.log(e.message);
      });
  }

  async getPeriodDetails(intPeriod)
  {
    await objContract.methods.periods(intPeriod).call()
    .then(async r => {

      if(this._isMounted === false) {
        return;
      }

      if(this.state._USER.hasProfile === false) {
          let objPeriod = this.getCurrentState("PERIOD");
          objPeriod.fetched = true;
          this.setState({
              "PERIOD": objPeriod
          })
          return;
      }
      
      let objPeriod = this.getCurrentState("PERIOD");
      objPeriod.startTime = r.startTime;
      objPeriod.endTime = r.endTime;

      this.setState({
          "PERIOD": objPeriod
      })

    }).catch(e => {
      console.log(e.message);
    });
  }
  
  async getMorePeriods(intStartingPeriod = this.state.STAKE.startingPeriod, intEndPeriod = this.state.STAKE.endingPeriod)
  {
    // Get the vote and claim for each period up to their ending period
    intStartingPeriod = parseInt(intStartingPeriod);
    intEndPeriod = parseInt(intEndPeriod);

    const arrPeriods = Array((intEndPeriod-intStartingPeriod)+1).fill().map((_, i) => i + intStartingPeriod);
    let objPeriod = this.getCurrentState("PERIOD");
    let arrVoteAndClaims = objPeriod.CLAIMED;
    let blDefaultToNo = false;

    arrPeriods.forEach(async (intPeriod) => {

        if(parseInt(intPeriod) > parseInt(objPeriod.currentPeriod)) {
            blDefaultToNo = true;
        } 

        let objVoteAndClaim = {
            "period": intPeriod,
            "voted": blDefaultToNo ? false : await objContract.methods.getVote(this.props.address, intPeriod).call(),
            "claimed": blDefaultToNo ? false: await objContract.methods.getDidClaimBooty(this.props.address, intPeriod).call(),
        };

        if(intPeriod === objPeriod.currentPeriod) {
            objPeriod.claimedCurrentPeriod = objVoteAndClaim.claimed;
            objPeriod.votedCurrentPeriod = objVoteAndClaim.voted;
        }

        arrVoteAndClaims.push(objVoteAndClaim);
        objPeriod.CLAIMED = arrVoteAndClaims;
        this.setState({
            "PERIOD": objPeriod
        })
    })
  }

  formatAddress(strAddress)
  {
      return(
          <AddressContainer>
              <Identicon address={strAddress} />
              <Copyable text={strAddress} truncate={e => [e.slice(0, 5), e.slice(e.length-3, e.length)].join("...")}/>
          </AddressContainer>
      )
  }

  formatVoteAndClaim(arrVoteAndClaim)
  {
      if(this.state.STAKE.fetched && this.state.PERIOD.getMorePeriodInBg === false) {
        return(
            <NoParticipationContainer>No participation from {this.formatAddress(this.props.address)}</NoParticipationContainer>
        )
      } else {
        let arrTableBody = [];

        arrVoteAndClaim.sort((a, b) => {
            if(a.period < b.period) {
                return -1;
            }
            if(a.period > b.period) {
                return 1;
            }
            return 0;
        })

        arrVoteAndClaim.forEach(a => {
            arrTableBody.push([
                a.period,
                this.formatBoolean(a.voted),
                this.formatBoolean(a.claimed)
            ])
        });

        let blShowFetchingMore = false;
        if(this._blGettingPeriodInBg === false
            && this.state.PERIOD.getMorePeriodInBg 
        ) {
            this._blGettingPeriodInBg = true;
            blShowFetchingMore = true;
            this.getMorePeriods();
        }

        return(
            <VoteAndClaimTable>
                    <Table 
                        head={[
                            'PERIOD',
                            'VOTED',
                            'CLAIMED'
                        ]}
                        body={arrTableBody}
                    />
                    {
                        blShowFetchingMore
                            ? `Fetching ${(this.state.STAKE.endingPeriod - this.state.STAKE.startingPeriod)-3} more period data`
                            : ``
                    }
            </VoteAndClaimTable>
        )
      }
  }

  formatBoolean(blValue) {
      return blValue ? <BoolVal bool={true}>YES</BoolVal>: <BoolVal bool={false}>NO</BoolVal>;
  }

  formatTimestamp(intTimestamp) {
      const objDate = new Date(intTimestamp*1000);
      return(
          <span>
              {objDate.toDateString()}
          </span>
      )
  }

  formatEndPeriod() {
    return(
        <span>
            {this.state.STAKE.endingPeriod}

            {
                parseInt(this.state.STAKE.endingPeriod) < parseInt(this.state.PERIOD.currentPeriod)
                    ?
                        <SubText isError={true}>STAKING ENDED</SubText>
                    :
                        ``
            }
        </span>
    )
  }

  render() {
    return (
        <div>

          <HasProfile profile="SpankChain Bank" bool={this.state._USER.hasProfile} />

          <AssetView 
            heading="STAKER PROFILE"
            icon={LogoSpank}
            rows={[
                ["STAKED", <Currency value={this.state.STAKE.spankStaked} symbol="SPANK" usd_value={this.state.STAKE.value_in_usd*parseFloat(this.state.STAKE.spankStaked)} />],
                ["BOOTY BASE", this.formatAddress(this.state.STAKE.bootyBase)],
                ["DELEGATE KEY", this.formatAddress(this.state.STAKE.delegateKey)],
                ["PERIOD STARTED", this.state.STAKE.startingPeriod],
                ["STAKE END PERIOD", this.formatEndPeriod()]
            ]}
            fetched={this.state.STAKE.fetched}
          />

        <AssetView 
            heading="PERIOD VIEW"
            icon={LogoSpank}
            rows={[
                ["CURRENT PERIOD", this.state.PERIOD.currentPeriod],
                ["START TIME", this.formatTimestamp(this.state.PERIOD.startTime)],
                ["END TIME", this.formatTimestamp(this.state.PERIOD.endTime)]
            ]}
            fetched={this.state.PERIOD.fetched}
          />

        <AssetView
            heading="VOTED AND CLAIMED"
            icon={LogoSpank}
            rows={[
                ["Overview", this.formatVoteAndClaim(this.state.PERIOD.CLAIMED)]
            ]}
            fetched={this.state.STAKE.fetched}
            />
        </div>
    );
  }
}

export default SpankChain;
