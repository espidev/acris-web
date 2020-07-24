import React from 'react';
import {connect} from "react-redux";
import {store} from "../../redux/store";
import {switchCollection} from "../../redux/slices/playerSlice";
import {getCollectionsList} from "../../redux/actions/collection";

import './CollectionSelect.css';

import {
    TextContent,
    Text,
    TextVariants,
    PageSection,
    Gallery,
    Card,
    CardBody,
    CardTitle,
    EmptyStateIcon,
    EmptyState,
    Title,
    EmptyStateBody,
    Button
} from '@patternfly/react-core';
import {Icon} from '@fluentui/react/lib/Icon';
import LoadingComponent from "../util/LoadingComponent";
import {withRouter} from "react-router-dom";

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
            // still loading
            return <LoadingComponent/>
        } else if (this.state.collections.length === 0) {
            // no collection
            return (
                <EmptyState>
                    <EmptyStateIcon icon={<Icon iconName=""/>}/>
                    <Title headingLevel="h4" size="lg">No Music Collections</Title>
                    <EmptyStateBody>
                        Create a new music collection, or ask another user to be invited to view their music collections.
                    </EmptyStateBody>
                    <Button variant="primary" onClick={() => this.props.history.push('/new-collection')}>Create Collection</Button>
                </EmptyState>
            );
        } else {
            // collections
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

                            <Card isHoverable key="Card-New" className="collection-card" onClick={() => this.props.history.push('/new-collection')}>
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
