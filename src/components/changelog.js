import React, { Component } from 'react'
import styled from 'styled-components'
import { Icon } from '@mycrypto/ui'
import ExitIcon from '../images/exit.svg'
import changeLogFile from '../CHANGELOG.json'
import Parser from 'html-react-parser'

const ChangelogContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    padding: 1em;
    font-size: 12pt;
    margin-left: 0.5em;
`;

const ClosedDrawer = styled.div`
    &:hover {
        cursor: pointer;
    }
`

const Drawer = styled.div`
    width: 23.475em;
    box-shadow: rgba(0, 0, 0, 0.1) -2px 0px 6px 0px;
    height: 100vh;
    position: fixed;
    right: 0px;
    top: 0px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease 0s;
    overflow: auto;
    background: #fff;
    z-index: 2;

    @media (max-width: 500px) {
        width: 100%;
    }

    > section {
        text-align: left;
        padding: 1em;
    }
`

const CloseDrawer = styled.div`
    margin-right: 1.125em;
    cursor: pointer;
    line-height: 0;
    background: none;
    padding: 0px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;

    > img {
        position: absolute;
        right: 1em;
        top: 1em;
    }
`

const changeLogTemplate = (data) => `
    <section>
        <h3>${data.title}</h3>
        <small>${data.date}</small>
        <p>${data.description}</p>
    </section>
`

class Changelog extends Component {

  constructor(props)
  {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);

    this.state = {
        expanded: false
    }
  }

  toggleDrawer()
  {
      const blNewState = !this.state.expanded;
      this.setState({"expanded": blNewState})
  }

  getChangelog()
  {
    let arrSortedChangelog = changeLogFile.sort( (a, b) => {
        if(new Date(a.date) > new Date(b.date)) {
            return -1;
        }
        else if(new Date(a.date) < new Date(b.date)) {
            return 1;
        }
        else {
            return 0;
        }
    })

    let arrChangelogHtml = [];
    arrSortedChangelog.forEach(c => {
        let objChangeLogEntry = [];
        let strIcon;
        switch(c.type.toLowerCase()) {
            case 'feature' :
                strIcon = "🎉";
                break;
            case 'fix' :
                strIcon = "🔨";
                break;
            case 'vanity' :
                strIcon = "💅";
                break;
            default :
                strIcon = "";
                break;
        }
        let strTitle = `${strIcon} ${c.title}`
        let strDate = `${c.date.split("T")[0]}`
        let strContent = `${c.description}`

        objChangeLogEntry = {
            title: strTitle,
            date: strDate,
            description: strContent
        }

        arrChangelogHtml.push(
            changeLogTemplate(objChangeLogEntry)
        )
    })

    return arrChangelogHtml.join("");

  }

  render() {
    return (
        <ChangelogContainer>
            { this.state.expanded
                ?
                    <Drawer>
                        <CloseDrawer onClick={this.toggleDrawer}>
                            <img src={ExitIcon} alt="Close"/>
                        </CloseDrawer>
                        {Parser(this.getChangelog())}
                    </Drawer>
                :
                    <ClosedDrawer onClick={this.toggleDrawer}>
                        <Icon icon="announcement" alt="Updates"/> Updates
                    </ClosedDrawer>
            }
        </ChangelogContainer>
    );
  }
}

export default Changelog;
