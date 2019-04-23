import React, { Component } from 'react';
import ImageIcon from '../../ImageIcon';

import { StackedCard, Address, Tooltip, Icon } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

import LogoLoading from '../../../images/ajax-loader.gif'

class AssetView extends Component {

    render()
    {
        return(
            <div style={{width: '400px', display: 'inline-block', border: '1px solid #000', margin: '0.5em', borderRadius: '5px'}}>
            {this.props.fetched 
                ?
                    <StackedCard key={0} heading={this.props.heading} icons={[<ImageIcon src={this.props.icon} />]} entries={[
                            ['Staked',this.props.staked],
                            ['ETH', this.props.eth],
                            ['Total Supply',"SOON"],  //this.props.totalSupply]
                            ['Your Share', "SOON%"]]
                        } />
                :
                    <StackedCard key={0} heading={<img src={LogoLoading} />} icons={[<img src={LogoLoading} />]} entries={[
                        ['Staked', <img src={LogoLoading} />],
                        ['Interest Gained', <img src={LogoLoading} />],
                        ['Total Supply', <img src={LogoLoading} />],
                        ['Your Share', <img src={LogoLoading} />]]
                    } />
            }
            </div>
        )
    }

}


export default AssetView;