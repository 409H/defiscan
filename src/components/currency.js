import React, { Component } from 'react';
import styled from 'styled-components';

const CurrencySymbol = styled.div`
    display: inline-block;
    font-size: 10pt;
    margin-left: 0.5em;
`;

class Currency extends Component {

  constructor(props)
  {
    super(props);
  }

  render() {
    return (
        <div>
            {this.props.value} <CurrencySymbol>{this.props.symbol}</CurrencySymbol>
        </div>
    );
  }
}

export default Currency;
