import React from "react";
import {Route, Switch, useParams, withRouter} from "react-router-dom";

import {connect} from "react-redux";
import {store} from "../../redux/store";

import {Spinner} from "@patternfly/react-core";

import {getCollection} from "../../api/collection";
import UploadComponent from "../UploadComponent";
import {switchCollection} from "../../redux/slices/playerSlice";
import LoadingComponent from "../util/LoadingComponent";
import CollectionLanding from "./CollectionLanding";

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class CollectionRouteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.collection == null,
        }
    }

    componentDidMount() {
        // update collection if the url collectionId has changed
        let {collectionId} = this.props.match.params;
        this.unlisten = this.props.history.listen((location, action) => {
            if (typeof collectionId === 'undefined') {
                store.dispatch(switchCollection(null));
            } else if ('' + this.props.collection.id !== ''+collectionId) {
                console.log("History url change to " + collectionId);
                getCollection(collectionId).then(col => {

                    if (col == null) {
                        // TODO 404
                        console.log('404, collection not found');
                    } else {
                        this.setState({loading: false});
                        store.dispatch(switchCollection(col));
                    }

                });
            }
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        if (this.state.loading) {
            return (
                <LoadingComponent/>
            )
        } else {
            return (
                <Switch>
                    <Route exact path="/collection/:collectionId"><CollectionLanding/></Route>
                    <Route exact path="/collection/:collectionId/tracks"/>
                    <Route exact path="/collection/:collectionId/albums"/>
                    <Route exact path="/collection/:collectionId/artists"/>
                    <Route exact path="/collection/:collectionId/genres"/>
                    <Route exact path="/collection/:collectionId/playlists"/>
                    <Route exact path="/collection/:collectionId/upload"><UploadComponent/></Route>
                </Switch>
            )
        }
    }
}

export default withRouter(connect(mapStateToProps)(CollectionRouteContainer));