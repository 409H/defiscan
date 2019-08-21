import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import Header from './components/header';
import AddressSearch from './components/AddressSearch';

import { web3, getWeb3Footer } from './components/protocols/web3' 

const AppContainer = styled.div`
  padding: 1em;
`
const SearchArea = styled.div`
  display: block;
  margin: 0 auto;
  padding-bottom: 5em;
`

class App extends Component {

  componentDidMount()
  {
    
  }

  render() {
    return (
      <AppContainer>
          <Header />
          <SearchArea>
            <AddressSearch />
          </SearchArea>
          {getWeb3Footer(web3)}
      </AppContainer>
    );
  }
}

export default App;
