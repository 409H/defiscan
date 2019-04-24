import React, { Component } from 'react';
import ImageIcon from '../ImageIcon';

import { StackedCard, Address, Tooltip, Icon, Identicon, Copyable } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

import LogoLoading from '../../images/ajax-loader.gif'

const AssetContainer = styled.div`
    width: 400px;
    display: inline-block;
    border: 1px solid #000;
    margin: 0.5em;
    border-radius: 5px;
    
    @media (max-width: 799px) {
        width: 100%;
        display: block;    
        margin-left: auto;
        margin-right: auto;
    }
`;

class AssetView extends Component {

    render()
    {
        return(
            <AssetContainer>
            {this.props.fetched 
                ?
                    <StackedCard key={0} heading={this.props.heading} icons={[<ImageIcon src={this.props.icon} />]} entries={this.props.rows} />
                :
                    <StackedCard key={0} heading={<img src={LogoLoading} />} icons={[<img src={LogoLoading} />]} entries={[
                        ['Staked', <img src={LogoLoading} />],
                        ['Booty Base', <img src={LogoLoading} />],
                        ['Delegate Key', <img src={LogoLoading} />]]
                    } />
            }
            </AssetContainer>
        )
    }

}


export default AssetView;