import React from 'react';

import {
    Nav,
    NavItem,
    NavList, PageSidebar,
} from '@patternfly/react-core'

export default class Sidebar extends React.Component {

    render() {
        const PageNav = (
            <Nav>
                <NavList>
                    <NavItem>Tracks</NavItem>
                    <NavItem>Albums</NavItem>
                    <NavItem>Artists</NavItem>
                    <NavItem>Genres</NavItem>
                    <NavItem>Playlists</NavItem>
                    <NavItem to="/login">Login</NavItem>
                </NavList>
            </Nav>
        );

        return <PageSidebar nav={PageNav}/>
    }
}