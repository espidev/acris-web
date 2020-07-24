import React from 'react';

import {
    Avatar,
    Button, ButtonVariant,
    Dropdown, DropdownItem, KebabToggle,
    PageHeader,
    PageHeaderTools,
    PageHeaderToolsGroup,
    PageHeaderToolsItem
} from "@patternfly/react-core";

import { CogIcon, HelpIcon } from "@patternfly/react-icons";
import HeaderProfileDropdown from "./HeaderProfileDropdown";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isKebabDropdownOpen: false,
        };

        this.onKebabDropdownToggle = isKebabDropdownOpen => this.setState({isKebabDropdownOpen});
        this.onKebabDropdownSelect = event => this.setState({isKebabDropdownOpen: !this.state.isKebabDropdownOpen});
    }

    render() {
        const kebabDropdownItems = [
            <DropdownItem>
                <CogIcon /> Settings
            </DropdownItem>,
            <DropdownItem>
                <HelpIcon /> Help
            </DropdownItem>
        ];

        const headerTools = (
            <PageHeaderTools>
                <PageHeaderToolsGroup visibility={{default: 'hidden', lg: 'visible'}}>
                    <PageHeaderToolsItem>
                        <Button aria-label="Settings actions" variant={ButtonVariant.plain}>
                            <CogIcon />
                        </Button>
                    </PageHeaderToolsItem>
                    <PageHeaderToolsItem>
                        <Button aria-label="Help actions" variant={ButtonVariant.plain}>
                            <HelpIcon />
                        </Button>
                    </PageHeaderToolsItem>
                </PageHeaderToolsGroup>
                <PageHeaderToolsGroup>
                    <PageHeaderToolsItem visibility={{lg: 'hidden'}}>
                        <Dropdown
                            isPlain
                            position="right"
                            onSelect={this.state.onKebabDropdownSelect}
                            toggle={<KebabToggle onToggle={this.onKebabDropdownToggle} />}
                            isOpen={this.state.isKebabDropdownOpen}
                            dropdownItems={kebabDropdownItems}
                        />
                    </PageHeaderToolsItem>
                    <HeaderProfileDropdown/>
                </PageHeaderToolsGroup>
                <Avatar src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9e4066b1-0e52-42c5-8b03-c80b53dc64c8/de1tjzh-713cea00-f11f-400c-92cc-c3f4ea8527b9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOWU0MDY2YjEtMGU1Mi00MmM1LThiMDMtYzgwYjUzZGM2NGM4XC9kZTF0anpoLTcxM2NlYTAwLWYxMWYtNDAwYy05MmNjLWMzZjRlYTg1MjdiOS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.vk2UoBUZZbyZ2aTSlwsvAMVemoWWgfMmiNvDJcQyqJo" alt="Avatar image" />
            </PageHeaderTools>
        );

        return <PageHeader logo="Acris" headerTools={headerTools}/>;
    }
}