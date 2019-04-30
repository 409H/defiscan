import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Panel, light } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

import Header from './components/header';
import AddressSearch from './components/AddressSearch';

const AppContainer = styled.div`
  padding: 1em;
`
const SearchArea = styled.div`
  display: block;
  margin: 0 auto;
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
      </AppContainer>
    );
  }
}

export default App;
