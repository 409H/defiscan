import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
    width: 100%;
`;
const Segment = styled.div`
    margin: 0.1em;
    width: 10%;
    height: 15px;
    border: 1px solid ${props => props.bg};
    display: inline-block;
    background: #${props => props.bg}
`

class AddressSegments extends Component {

  constructor(props)
  {
    super(props);
  }

  getHexColors()
  {
      let arrExtracted = this.props.address.match(/(?:0x)(\w{6})(\w{6})(\w{6})(\w{6})(\w{6})(\w{6})(\w{4})/);
      arrExtracted.shift();
      let strLast = arrExtracted[arrExtracted.length - 1];
      arrExtracted.pop();
      arrExtracted.push(`0${strLast}0`);
      return arrExtracted;
  }

  render() {
    return (
        <Container>
            {
                this.getHexColors().map((e,k) => <Segment key={k} bg={e}></Segment>)
            }
        </Container>
    );
  }
}

export default AddressSegments;
