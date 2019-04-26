import React, { Component } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
    border-left: 5px solid ${props => props.bool ? "#33dc59" : "#ff9898"};
    background: ${props => props.bool ? "#A6FFCC" : "#FFF1F1"};
    width: 100%;
    padding: 1em;
    margin: 1em 0;
`;

class HasProfile extends Component {

  constructor(props)
  {
    super(props);
  }

  render() {
    return (
        <ProfileContainer bool={this.props.bool}>
            The address {this.props.bool ? "has" : "does not have"} an active {this.props.profile} profile
        </ProfileContainer>
    );
  }
}

export default HasProfile;
