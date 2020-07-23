import React from 'react';
import {
    TextContent,
    Text,
    TextVariants
} from '@patternfly/react-core';

export default class LandingPage extends React.Component {

    render() {
        return <TextContent>
            <Text component={TextVariants.h1}>Acris</Text>
        </TextContent>
    }
}