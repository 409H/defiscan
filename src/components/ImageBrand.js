import React, { Component } from 'react';
import styled from 'styled-components';

const Image = styled.img`
    height: 55px;
    width: 200px;
`;

class ImageIcon extends Component {
  render() {
    return (
        <Image src={this.props.src} />
    );
  }
}

export default ImageIcon;
