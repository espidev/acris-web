import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
    Button,
    PageSection,
    Text,
    TextContent,
    TextVariants,
    ToolbarItem
} from "@patternfly/react-core";
import {store} from "../../redux/store";
import {switchCollection} from "../../redux/slices/playerSlice";

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class CollectionLanding extends React.Component {
    constructor(props) {
        super(props);

        this.onSwitchPressed = () => {
            store.dispatch(switchCollection(null));
        }
    }

    render() {
        return (
            <React.Fragment>
                <PageSection>
                    <TextContent>
                        <Text component={TextVariants.h1}>Collection {this.props.collection.name}</Text>
                        <Text component={TextVariants.p}>You are currently viewing your <b>{this.props.collection.name}</b> collection.</Text>
                        <Text component={TextVariants.p}>Click on an item on the sidebar to view your collection.</Text>
                    </TextContent>
                </PageSection>
                <PageSection>
                    <ToolbarItem spacer={{default: 'spacerMd'}} onClick={this.onSwitchPressed}>
                        <Button>Switch Collection</Button>
                    </ToolbarItem>
                </PageSection>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps)(CollectionLanding))