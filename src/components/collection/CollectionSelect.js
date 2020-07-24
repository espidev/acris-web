import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {store} from "../../redux/store";
import {switchCollection} from "../../redux/slices/playerSlice";
import {getCollectionsList} from "../../redux/actions/collection";

import './CollectionSwitch.css';

import {
    TextContent,
    Text,
    TextVariants,
    PageSection,
    PageSectionVariants,
    Gallery,
    Card,
    CardBody,
    CardTitle, Spinner
} from '@patternfly/react-core';
import {Icon} from '@fluentui/react/lib/Icon';

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class CollectionSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collections: [],
            loading: true,
        }
    }

    componentDidMount() {
        getCollectionsList().then(c => {
            this.setState({
                collections: c,
                loading: false,
            })
        });
    }

    render() {
        if (this.state.loading) {
            return <Spinner/>
        } else {
            return (
                <React.Fragment>
                    <PageSection>
                        <TextContent>
                            <Text component={TextVariants.h1}>Music collections</Text>
                            <Text component="p">Select a music collection, or create a new one.</Text>
                        </TextContent>
                    </PageSection>
                    <PageSection>
                        <Gallery hasGutter>

                            {this.state.collections.map((col, key) => (
                                <Card isHoverable key={key} className="collection-card" onClick={() => store.dispatch(switchCollection(col))}>
                                    <CardTitle>{col.name}</CardTitle>
                                    <CardBody>
                                        Owners: {JSON.stringify(col.owners)}
                                        <br/>
                                        Viewers: {JSON.stringify(col.viewers)}
                                    </CardBody>
                                </Card>
                            ))}

                            <Card isHoverable key="Card-New" className="collection-card">
                                <CardTitle>New Collection</CardTitle>
                                <CardBody>
                                    <Icon iconName="Add"/>
                                </CardBody>
                            </Card>

                        </Gallery>
                    </PageSection>
                </React.Fragment>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps)(CollectionSelect));
