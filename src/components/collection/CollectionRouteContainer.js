import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";

import {connect} from "react-redux";
import {store} from "../../redux/store";

import {getCollection} from "../../api/collection";
import UploadComponent from "../UploadComponent";
import {switchCollection} from "../../redux/slices/playerSlice";
import LoadingComponent from "../util/LoadingComponent";
import CollectionLanding from "./CollectionLanding";
import RouteTransition from "../util/RouteTransition";
import TrackList from "../TrackList";
import AlertComponent, {addAlert} from "../util/AlertComponent";
import {getUniqueId} from "@patternfly/react-core";
import ArtistList from "../ArtistList";

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class CollectionRouteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.collection == null,
            alerts: [],
        }
    }

    checkUpdateCollection(newCollectionId) {
        if (typeof newCollectionId === 'undefined') {
            store.dispatch(switchCollection(null));
        } else if (this.props.collection == null || ('' + this.props.collection.id !== '' + newCollectionId)) {
            console.log("History url change to " + newCollectionId);
            getCollection(newCollectionId)
                .then(res => {
                    if (this.componentMounted) {
                        this.setState({loading: false});
                        store.dispatch(switchCollection(res.data));
                        console.log(this.props.collection);
                    }
                })
                .catch(err => {
                    console.log("Could not fetch collection: " + err);
                    this.setState({alerts: addAlert(this.state.alerts, "Error fetching collection. Perhaps it doesn't exist?", "danger", getUniqueId())})
                });
        }
    }

    componentDidMount() {
        this.componentMounted = true;
        // update collection if the url collectionId has changed
        let {collectionId} = this.props.match.params;
        this.checkUpdateCollection(collectionId);
        this.unlisten = this.props.history.listen(() => this.checkUpdateCollection(collectionId));
    }

    componentWillUnmount() {
        this.unlisten();
        this.componentMounted = false;
    }

    render() {
        if (this.state.loading) {
            return (
                <React.Fragment>
                    <AlertComponent obj={this}/>
                    <LoadingComponent/>
                </React.Fragment>
            )
        } else {
            return (
                <Switch>
                    <Route exact path="/collection/:collectionId" component={RouteTransition(CollectionLanding)}/>
                    <Route exact path="/collection/:collectionId/tracks" component={RouteTransition(TrackList)}/>
                    <Route exact path="/collection/:collectionId/albums"/>
                    <Route exact path="/collection/:collectionId/artists" component={RouteTransition(ArtistList)}/>
                    <Route exact path="/collection/:collectionId/genres"/>
                    <Route exact path="/collection/:collectionId/playlists"/>
                    <Route exact path="/collection/:collectionId/upload" component={RouteTransition(UploadComponent)}/>
                </Switch>
            )
        }
    }
}

export default withRouter(connect(mapStateToProps)(CollectionRouteContainer));