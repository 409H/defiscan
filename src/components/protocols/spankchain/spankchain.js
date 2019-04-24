import React, { Component } from 'react';
import AssetView from '../asset-view';
import styled, { ThemeProvider } from 'styled-components';

import HasProfile from '../../hasProfile'

import LogoSpank from '../../../images/spankBankChainsaw.svg'
import { Identicon, Copyable, Table } from '@mycrypto/ui';

import Web3 from 'web3';

let web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/nWQTOIHYhOavIVKVvNah")); 
  //web3 = new Web3(new Web3.providers.HttpProvider("https://freely-central-lark.quiknode.io/9fe4c4a0-2ea2-4ac1-ab64-f92990cd2914/118-xxADc8hKSSB9joCb-g==/"));
}  

const CONTRACT_ADDR = "0x1ecb60873e495ddfa2a13a8f4140e490dd574e6f";
const CONTRACT_ABI = [{"constant":true,"inputs":[],"name":"currentPeriod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"voteToClose","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newDelegateKey","type":"address"}],"name":"updateDelegateKey","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spankAmount","type":"uint256"},{"name":"stakePeriods","type":"uint256"},{"name":"delegateKey","type":"address"},{"name":"bootyBase","type":"address"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"stakerAddress","type":"address"},{"name":"period","type":"uint256"}],"name":"getSpankPoints","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bootyToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxPeriods","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"mintBooty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"stakerByDelegateKey","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"stakerAddress","type":"address"},{"name":"period","type":"uint256"}],"name":"getVote","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"delegateAddress","type":"address"}],"name":"getStakerFromDelegateKey","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"amount","type":"uint256"},{"name":"tokenContract","type":"address"},{"name":"extraData","type":"bytes"}],"name":"receiveApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"stakers","outputs":[{"name":"spankStaked","type":"uint256"},{"name":"startingPeriod","type":"uint256"},{"name":"endingPeriod","type":"uint256"},{"name":"delegateKey","type":"address"},{"name":"bootyBase","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"spankToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newBootyBase","type":"address"}],"name":"updateBootyBase","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pointsTable","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"claimPeriod","type":"uint256"}],"name":"claimBooty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"updatePeriod","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAddress","type":"address"},{"name":"newDelegateKey","type":"address"},{"name":"newBootyBase","type":"address"},{"name":"spankAmount","type":"uint256"}],"name":"splitStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isClosed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"stakerAddress","type":"address"},{"name":"period","type":"uint256"}],"name":"getDidClaimBooty","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSpankStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"updatedEndingPeriod","type":"uint256"}],"name":"checkIn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"periods","outputs":[{"name":"bootyFees","type":"uint256"},{"name":"totalSpankPoints","type":"uint256"},{"name":"bootyMinted","type":"uint256"},{"name":"mintingComplete","type":"bool"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"closingVotes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"bootyAmount","type":"uint256"}],"name":"sendFees","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_periodLength","type":"uint256"},{"name":"_maxPeriods","type":"uint256"},{"name":"spankAddress","type":"address"},{"name":"initialBootySupply","type":"uint256"},{"name":"bootyTokenName","type":"string"},{"name":"bootyDecimalUnits","type":"uint8"},{"name":"bootySymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"periodLength","type":"uint256"},{"indexed":false,"name":"maxPeriods","type":"uint256"},{"indexed":false,"name":"spankAddress","type":"address"},{"indexed":false,"name":"initialBootySupply","type":"uint256"},{"indexed":false,"name":"bootyTokenName","type":"string"},{"indexed":false,"name":"bootyDecimalUnits","type":"uint8"},{"indexed":false,"name":"bootySymbol","type":"string"}],"name":"SpankBankCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"period","type":"uint256"},{"indexed":false,"name":"spankPoints","type":"uint256"},{"indexed":false,"name":"spankAmount","type":"uint256"},{"indexed":false,"name":"stakePeriods","type":"uint256"},{"indexed":false,"name":"delegateKey","type":"address"},{"indexed":false,"name":"bootyBase","type":"address"}],"name":"StakeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"bootyAmount","type":"uint256"}],"name":"SendFeesEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"targetBootySupply","type":"uint256"},{"indexed":false,"name":"totalBootySupply","type":"uint256"}],"name":"MintBootyEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"period","type":"uint256"},{"indexed":false,"name":"spankPoints","type":"uint256"},{"indexed":false,"name":"stakerEndingPeriod","type":"uint256"}],"name":"CheckInEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"period","type":"uint256"},{"indexed":false,"name":"bootyOwed","type":"uint256"}],"name":"ClaimBootyEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"totalSpankToWithdraw","type":"uint256"}],"name":"WithdrawStakeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"newAddress","type":"address"},{"indexed":false,"name":"newDelegateKey","type":"address"},{"indexed":false,"name":"newBootyBase","type":"address"},{"indexed":false,"name":"spankAmount","type":"uint256"}],"name":"SplitStakeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"period","type":"uint256"}],"name":"VoteToCloseEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"newDelegateKey","type":"address"}],"name":"UpdateDelegateKeyEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"staker","type":"address"},{"indexed":false,"name":"newBootyBase","type":"address"}],"name":"UpdateBootyBaseEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"tokenContract","type":"address"}],"name":"ReceiveApprovalEvent","type":"event"}];
const objContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDR)


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

  constructor(args)
  {
    super(args);
    this.getStakers = this.getStakers.bind(this);
    this.getPeriod = this.getPeriod.bind(this);
    this.getCurrentState = this.getCurrentState.bind(this);

    this.state = {
        "_USER": {
            "hasProfile": false
        },
        "STAKE": {
            "bootyBase": 0,
            "delegateKey": 0,
            "spankStaked": 0,
            "endingPeriod": 0,
            "startingPeriod": 0,
            "fetched": false
        },
        "PERIOD": {
            "currentPeriod": 0,
            "maxPeriods": 0,
            "claimedCurrentPeriod": false,
            "votedCurrentPeriod": false,
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
        objStake.spankStaked = r.spankStaked;
        objStake.endingPeriod = r.endingPeriod;
        objStake.startingPeriod = r.startingPeriod;
        objStake.fetched = true

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

        let objPeriod = this.getCurrentState("PERIOD");

        if(this.state._USER.hasProfile === false) {
            objPeriod.fetched = true;
            this.setState({
                "PERIOD": objPeriod
            })
            return;
        }

        objPeriod.currentPeriod = r;
        objPeriod.maxPeriods = await objContract.methods.maxPeriods().call();

        // Get the vote and claim for each period up to their ending period
        let arrVoteAndClaims = [];
        for(var intPeriod = 1; intPeriod <= this.state.STAKE.endingPeriod; intPeriod++) {
            let objVoteAndClaim = {
                "period": intPeriod,
                "voted": await objContract.methods.getVote(this.props.address, intPeriod).call(),
                "claimed": await objContract.methods.getDidClaimBooty(this.props.address, intPeriod).call(),
            };

            if(intPeriod === objPeriod.currentPeriod) {
                objPeriod.claimedCurrentPeriod = objVoteAndClaim.claimed;
                objPeriod.votedCurrentPeriod = objVoteAndClaim.voted;
            }

            arrVoteAndClaims.push(objVoteAndClaim);
        }
        objPeriod.CLAIMED = arrVoteAndClaims;
        objPeriod.fetched = true;

        this.setState({
            "PERIOD": objPeriod
        })

      }).catch(e => {
        console.log(e.message);
      });
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

  formatCurrentPeriod(intCurrentPeriod, intMaxPeriod, intEndingPeriod)
  {
      return(
          <div>
              {intCurrentPeriod} / {intMaxPeriod}
              {intEndingPeriod > 0
                ? <div style={{ fontSize: "10pt", display: "inline-block", fontStyle: "italic", color: "#b5b5b5", marginLeft: "1em" }}>Your stake {intEndingPeriod < intCurrentPeriod ? "ended" : "ends"} at period {intEndingPeriod}</div>
                : ``
              }
          </div>
      )
  }

  formatVoteAndClaim(arrVoteAndClaim)
  {
      if(arrVoteAndClaim.length == 0) {
        return(
            <NoParticipationContainer>No participation from {this.formatAddress(this.props.address)}</NoParticipationContainer>
        )
      }
    
      let arrTableBody = [];
      arrVoteAndClaim.forEach(a => {
          arrTableBody.push([
              a.period,
              this.formatBoolean(a.voted),
              this.formatBoolean(a.claimed)
          ])
      });

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
          </VoteAndClaimTable>
      )
  }

  formatBoolean(blValue) {
      return blValue ? <BoolVal bool={true}>YES</BoolVal>: <BoolVal bool={false}>NO</BoolVal>;
  }

  render() {
    return (
        <div>

          <HasProfile profile="SpankChain Bank" bool={this.state._USER.hasProfile} />

          <AssetView 
            heading="STAKER PROFILE"
            icon={LogoSpank}
            rows={[
                ["STAKED", this.state.STAKE.spankStaked],
                ["BOOTY BASE", this.formatAddress(this.state.STAKE.bootyBase)],
                ["DELEGATE KEY", this.formatAddress(this.state.STAKE.delegateKey)]
            ]}
            fetched={this.state.STAKE.fetched}
          />

        <AssetView 
            heading="PERIOD VIEW"
            icon={LogoSpank}
            rows={[
                ["PERIOD", this.formatCurrentPeriod(this.state.PERIOD.currentPeriod, this.state.PERIOD.maxPeriods, this.state.STAKE.endingPeriod)],
                ["CLAIMED CURRENT PERIOD", this.formatBoolean(this.state.PERIOD.claimedCurrentPeriod)],
                ["VOTED CURRENT PERIOD", this.formatBoolean(this.state.PERIOD.votedCurrentPeriod)]
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
