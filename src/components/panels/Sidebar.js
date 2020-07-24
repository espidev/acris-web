import React from 'react';

import {
    Nav,
    NavItem,
    NavList, PageSidebar,
} from '@patternfly/react-core'

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class Sidebar extends React.Component {

    navClick(path) {
        return () => {
            if (this.props.collection !== null) {
                this.props.history.push('/collection/' + this.props.collection.name + '/' + path);
            }
        }
    }

    render() {
        const PageNav = (
            <Nav theme="light">
                <NavList>
                    <NavItem preventDefault onClick={this.navClick('tracks')}>Tracks</NavItem>
                    <NavItem preventDefault onClick={this.navClick('albums')}>Albums</NavItem>
                    <NavItem preventDefault onClick={this.navClick('artists')}>Artists</NavItem>
                    <NavItem preventDefault onClick={this.navClick('genres')}>Genres</NavItem>
                    <NavItem preventDefault onClick={this.navClick('playlists')}>Playlists</NavItem>
                    <NavItem preventDefault onClick={this.navClick('upload')}>Upload</NavItem>
                </NavList>
            </Nav>
        );

        return <PageSidebar nav={PageNav} theme="light"/>
    }
}

export default withRouter(connect(mapStateToProps)(Sidebar));