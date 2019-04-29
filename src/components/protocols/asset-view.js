import React, { Component } from 'react';
import ImageIcon from '../ImageIcon';

import { StackedCard, Address, Tooltip, Icon, Identicon, Copyable } from '@mycrypto/ui';
import styled, { ThemeProvider } from 'styled-components';

import LogoLoading from '../../images/ajax-loader.gif'

import ReactSvgPieChart from "react-svg-piechart";

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

    renderPieChart(data)
    {
        return(<ReactSvgPieChart
            data={data}
            expandOnHover={true}
            expandSize={1}
            shrinkOnTouchEnd={true}
            viewBoxSize={10}
            strokeWidth={0.1}
        />);
    }

    renderView()
    {
        if(this.props.fetched) {
            if(this.props.pieChart) {
                this.props.rows.push([this.props.pieChart.title, this.renderPieChart(this.props.pieChart.data)])
            }
            return(<StackedCard key={0} heading={this.props.heading} icons={[<ImageIcon src={this.props.icon} />]} entries={this.props.rows} />)
        } else {
            
            if(this.props.pieChart) {
                return(<StackedCard key={0} heading={this.props.heading} icons={[<ImageIcon src={this.props.icon} />]} entries={[
                    [this.props.pieChart.title, <img src={LogoLoading} />]
                 ]} />)
            } else {
                this.props.rows.map(e => {
                    return e[1] = <img src={LogoLoading} />
                })

                return(<StackedCard key={0} heading={<img src={LogoLoading} />} icons={[<img src={LogoLoading} />]} entries={this.props.rows} />)
            }
        }
    }

    render()
    {
        return(
            <AssetContainer>
                {this.renderView()}
            </AssetContainer>
        );
    }

}


export default AssetView;