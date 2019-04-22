import React, { Component } from 'react';
import ImageIcon from '../../ImageIcon';

import { StackedCard, Address, Tooltip, Icon } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

import LogoLoading from '../../../images/ajax-loader.gif'

class AssetView extends Component {

    render()
    {
        return(
            this.props.fetched 
                ?
                    <StackedCard key={0} heading={this.props.heading} icons={[<ImageIcon src={this.props.icon} />]} entries={[
                        ['Staked',this.props.staked],
                        ['Interest Gained', this.props.interest],
                        ['Borrowed',this.props.borrowed]]
                    } />
                :
                    <img src={LogoLoading} />
        )
    }

}


export default AssetView;