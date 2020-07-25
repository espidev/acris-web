import React from 'react';

import {
    Divider,
    Nav,
    NavItem,
    NavList, PageSidebar,
} from '@patternfly/react-core'

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import './Sidebar.css';

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class Sidebar extends React.Component {

    navClick(path) {
        return () => {
            if (this.props.collection !== null) {
                this.props.history.push('/collection/' + this.props.collection.id + '/' + path);
            }
        }
    }

    disabledStyle() {
        if (this.props.collection === null) {
            return {color: "#9e9e9e"};
        } else {
            return {cursor: "pointer"};
        }
    }

    render() {
        const CustomNavItem = (props) => (
            <NavItem className="navItem" preventDefault onClick={this.navClick(props.link)}>
                <span style={this.disabledStyle()}>{props.text}</span>
            </NavItem>
        );

        const PageNav = (
            <Nav theme="light">
                <NavList>
                    <CustomNavItem link="tracks" text="Tracks"/>
                    <CustomNavItem link="albums" text="Albums"/>
                    <CustomNavItem link="artists" text="Artists"/>
                    <CustomNavItem link="genres" text="Genres"/>
                    <CustomNavItem link="playlists" text="Playlists"/>
                    <Divider/>
                    <CustomNavItem link="upload" text="Upload"/>
                </NavList>
            </Nav>
        );

        return <PageSidebar className="sidebar" nav={PageNav} theme="light"/>
    }
}

export default withRouter(connect(mapStateToProps)(Sidebar));