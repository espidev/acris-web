import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getUniqueId, PageSection, Text, TextContent, TextVariants} from "@patternfly/react-core";
import LoadingComponent from "./util/LoadingComponent";
import {getTracks} from "../api/collection";
import BreadcrumbComponent, {collectionBreadcrumb} from "./util/BreadcrumbComponent";
import AlertComponent, {addAlert} from "./util/AlertComponent";
import TrackTableComponent from "./util/TrackTableComponent";

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tracks: [],
            alerts: [],
        }

        this.fetchTracks = this.fetchTracks.bind(this);
    }

    fetchTracks() {
        getTracks(this.props.collection.id)
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
        this.fetchTracks()
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
                link: '',
                display: 'Tracks',
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
                        <Text component={TextVariants.h1}>Tracks</Text>
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

export default withRouter(connect(mapStateToProps)(TrackList))