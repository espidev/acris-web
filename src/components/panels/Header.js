import React from 'react';

import {
    Avatar,
    Button, ButtonVariant,
    PageHeader,
    PageHeaderTools,
    PageHeaderToolsGroup,
    PageHeaderToolsItem
} from "@patternfly/react-core";

import { CogIcon, HelpIcon } from "@patternfly/react-icons";
import HeaderProfileDropdown from "./HeaderProfileDropdown";
import {Link} from "react-router-dom";

export default class Header extends React.Component {

    render() {
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
                    <HeaderProfileDropdown/>
                </PageHeaderToolsGroup>
                <Avatar src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9e4066b1-0e52-42c5-8b03-c80b53dc64c8/de1tjzh-713cea00-f11f-400c-92cc-c3f4ea8527b9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOWU0MDY2YjEtMGU1Mi00MmM1LThiMDMtYzgwYjUzZGM2NGM4XC9kZTF0anpoLTcxM2NlYTAwLWYxMWYtNDAwYy05MmNjLWMzZjRlYTg1MjdiOS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.vk2UoBUZZbyZ2aTSlwsvAMVemoWWgfMmiNvDJcQyqJo" alt="Avatar image" />
            </PageHeaderTools>
        );

        return <PageHeader logo={<Link to={"/"}><h1>Acris</h1></Link>} headerTools={headerTools}/>;
    }
}