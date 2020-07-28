import React from 'react';

import {
    Divider,
    Nav,
    NavItem,
    NavList, PageSidebar,
} from '@patternfly/react-core'
import {Icon} from "@fluentui/react/lib/Icon";

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
            return {color: "#9e9e9e", verticalAlign: "center"};
        } else {
            return {cursor: "pointer", verticalAlign: "center"};
        }
    }

    render() {
        const CustomNavItem = (props) => (
            <a href={this.props.collection === null ? '#' : '/collection/' + this.props.collection.id + '/' + props.link} style={{textDecoration: 'none'}}>
                <NavItem className="navItem" preventDefault onClick={this.navClick(props.link)}>
                    <span style={this.disabledStyle()}><Icon iconName={props.icon} style={{marginRight: "1em"}}/> {props.text}</span>
                </NavItem>
            </a>
        );

        const PageNav = (
            <Nav theme="light">
                <NavList>
                    <CustomNavItem link="tracks" text="Tracks" icon="MusicInCollection"/>
                    <CustomNavItem link="albums" text="Albums" icon="Album"/>
                    <CustomNavItem link="artists" text="Artists" icon="Contact"/>
                    <CustomNavItem link="genres" text="Genres" icon="AssessmentGroup"/>
                    <CustomNavItem link="playlists" text="Playlists" icon="BulletedListMirrored"/>
                    <Divider/>
                    <CustomNavItem link="upload" text="Upload" icon="Upload"/>
                </NavList>
            </Nav>
        );

        return <PageSidebar className="sidebar" nav={PageNav} theme="light"/>
    }
}

export default withRouter(connect(mapStateToProps)(Sidebar));