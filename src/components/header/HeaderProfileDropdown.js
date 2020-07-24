import * as React from "react";

import {Dropdown, DropdownGroup, DropdownItem, DropdownToggle, PageHeaderToolsItem} from "@patternfly/react-core";

import {logoutUser} from "../../redux/actions/auth";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';

const mapStateToProps = state => ({
        user: state.auth.user
    });

class HeaderProfileDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdownOpen: false,

        }

        this.onDropdownToggle = isDropdownOpen => this.setState({isDropdownOpen});
        this.onDropdownSelect = event => this.setState({isDropdownOpen: !this.state.isDropdownOpen});
        this.onLogout = () => {
            logoutUser();
            this.props.history.push('/login');
        }
    }

    render() {
        const userDropdownItems = [
            <DropdownGroup key="group 2">
                <DropdownItem key="group 2 profile">My profile</DropdownItem>
                <DropdownItem key="group 2 user" component="button">
                    User management
                </DropdownItem>
                <DropdownItem key="group 2 logout" onClick={this.onLogout}>Logout</DropdownItem>
            </DropdownGroup>
        ];

        if (this.props.user == null) {
            return (
                <PageHeaderToolsItem>
                    <a href='#' onClick={() => this.props.history.push('/login')}>Login</a>
                </PageHeaderToolsItem>
            );
        } else {
            return (
                <PageHeaderToolsItem visibility={{ default: 'hidden', md: 'visible' }}>
                    <Dropdown
                        isPlain
                        position="right"
                        onSelect={this.onDropdownSelect}
                        isOpen={this.state.isDropdownOpen}
                        toggle={<DropdownToggle onToggle={this.onDropdownToggle}>{this.props.user.username}</DropdownToggle>}
                        dropdownItems={userDropdownItems}
                    />
                </PageHeaderToolsItem>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps)(HeaderProfileDropdown));