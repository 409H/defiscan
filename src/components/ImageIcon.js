import React, { Component } from 'react';
import styled from 'styled-components';

const Image = styled.img`
    height: 35px;
    width: 35px;
`;

class ImageIcon extends Component {
  render() {
    return (
        <Image src={this.props.src} />
    );
  }
}

export default ImageIcon;
