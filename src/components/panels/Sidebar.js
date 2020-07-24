import React from 'react';

import {
    Nav,
    NavItem,
    NavList, PageSidebar,
} from '@patternfly/react-core'
import {withRouter} from "react-router-dom";

class Sidebar extends React.Component {

    render() {
        const PageNav = (
            <Nav theme="light">
                <NavList>
                    <NavItem>Tracks</NavItem>
                    <NavItem>Albums</NavItem>
                    <NavItem>Artists</NavItem>
                    <NavItem>Genres</NavItem>
                    <NavItem preventDefault onClick={() => this.props.history.push('/playlists')}>Playlists</NavItem>
                </NavList>
            </Nav>
        );

        return <PageSidebar nav={PageNav} theme="light"/>
    }
}

export default withRouter(Sidebar)