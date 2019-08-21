import React, { Component } from 'react';
import styled from 'styled-components';

const CurrencySymbol = styled.div`
    display: inline-block;
    font-size: 10pt;
    margin-left: 0.5em;
`;
const ValueInUSD = styled.span`
  font-size: 8pt;
`
const InterestAmount = styled.span`
  color: #22c146;
  font-size: 7pt;
  font-weight: 600;
  padding-left: 1em;
`

class Currency extends Component {

  formatAsCurrency(flValue)
  {
    return (flValue).toLocaleString('en-US',{style:'currency',currency:'USD'});
  }

  render() {
    return (
        <div>
            {this.props.value} <CurrencySymbol>{this.props.symbol}</CurrencySymbol> <br />
            <ValueInUSD>
              {this.props.usd_value > -1 ? this.formatAsCurrency(this.props.usd_value) + ' USD' : ''}
              {this.props.interest_amount > -1 ? <InterestAmount>+{this.formatAsCurrency(this.props.interest_amount) + ' USD'}</InterestAmount>: ''}
            </ValueInUSD>
        </div>
    );
  }
}

export default Currency;
