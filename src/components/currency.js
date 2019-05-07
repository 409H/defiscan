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

class Currency extends Component {

  constructor(props)
  {
    super(props);
  }

  render() {
    return (
        <div>
            {this.props.value} <CurrencySymbol>{this.props.symbol}</CurrencySymbol> <br />
            <ValueInUSD>{this.props.usd_value ? (this.props.usd_value*parseFloat(this.props.value)).toLocaleString('en-US',{style:'currency',currency:'USD'}) + ' USD' : ''}</ValueInUSD>
        </div>
    );
  }
}

export default Currency;
