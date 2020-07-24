import React from 'react';
import {
    TextContent,
    Text,
    TextVariants, PageSection, PageSectionVariants, Gallery
} from '@patternfly/react-core';

export default class LandingPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <PageSection variant={PageSectionVariants.light}>
                    <TextContent>
                        <Text component={TextVariants.h1}>Music collections</Text>
                        <Text component="p">Select a music collection, or create a new one.</Text>
                    </TextContent>
                </PageSection>
                <PageSection>
                    <Gallery hasGutter>

                    </Gallery>
                </PageSection>
            </React.Fragment>
        )
    }
}

