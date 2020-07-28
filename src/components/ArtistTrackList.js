import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getUniqueId, PageSection, Text, TextContent, TextVariants} from "@patternfly/react-core";
import LoadingComponent from "./util/LoadingComponent";
import {getArtist, getArtistTracks} from "../api/collection";
import BreadcrumbComponent, {collectionBreadcrumb} from "./util/BreadcrumbComponent";
import AlertComponent, {addAlert} from "./util/AlertComponent";
import TrackTableComponent from "./util/TrackTableComponent";

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class ArtistTrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tracks: [],
            alerts: [],
            artist: null,
        }

        this.fetchTracks = this.fetchTracks.bind(this);
    }

    fetchTracks() {
        getArtistTracks(this.state.artist.id)
            .then(response => {
                if (this.componentMounted) {
                    console.log(response.data);
                    // change track object into table row
                    this.setState({
                        tracks: response.data,
                        loading: false,
                    });
                }
            })
            .catch(err => {
                if (this.componentMounted) {
                    console.log("Fetch error: " + err);
                    this.setState({alerts: addAlert(this.state.alerts, 'Error fetching tracks.', 'danger', getUniqueId())})
                }
            });
    }

    componentDidMount() {
        this.componentMounted = true;
        getArtist(this.props.match.params.artistId)
            .then(response => {
                if (this.componentMounted) {
                    this.setState({artist: response.data});
                    this.fetchTracks();
                }
            })
            .catch(err => {
                if (this.componentMounted) {
                    console.log("Fetch error: " + err);
                    this.setState({alerts: addAlert(this.state.alerts, 'Error fetching artist.', 'danger', getUniqueId())});
                }
            });
    }

    componentWillUnmount() {
        this.componentMounted = false;
    }

    render() {
        const breadcrumbElements = [
            collectionBreadcrumb,
            {
                link: '/collection/' + this.props.collection.id,
                display: this.props.collection.name,
                isActive: false,
            },
            {
                link: '/collection/' + this.props.collection.id + '/artists',
                display: 'Artists',
                isActive: false,
            },
            {
                link: '',
                display: this.state.artist === null ? '' : this.state.artist.name,
                isActive: true,
            }
        ];

        const PageHeader = () => (
            <React.Fragment>
                <AlertComponent obj={this}/>
                <PageSection>
                    <BreadcrumbComponent elements={breadcrumbElements}/>
                </PageSection>
                <PageSection>
                    <TextContent>
                        <Text component={TextVariants.h1}>{this.state.artist === null ? '' : this.state.artist.name}</Text>
                    </TextContent>
                </PageSection>
            </React.Fragment>
        );

        if (this.state.loading) {
            return (
                <React.Fragment>
                    <PageHeader/>
                    <LoadingComponent/>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <PageHeader/>
                    <PageSection>
                        <TrackTableComponent onTracksChanged={this.fetchTracks} tracks={this.state.tracks}/>
                    </PageSection>
                    <div style={{height: "50px"}}/>
                </React.Fragment>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps)(ArtistTrackList))