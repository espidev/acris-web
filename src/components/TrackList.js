import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {PageSection, Text, TextContent, TextVariants} from "@patternfly/react-core";
import LoadingComponent from "./util/LoadingComponent";
import {Table, TableBody, TableHeader} from "@patternfly/react-table";
import {getTracks} from "../api/collection";
import BreadcrumbComponent from "./util/BreadcrumbComponent";
import './TrackList.css';

const mapStateToProps = state => (
    {
        collection: state.player.collection,
    }
);

class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            columns: ['Name', 'Artist', 'Album', 'Year', 'Genre', 'Length'],
            rows: [],
        }
    }

    createRow(track) {
        let name = track.name == '' ? track.file_name : track.name,
            artist = '',
            album = '',
            year = track.year,
            genre = track.genre,
            length = track.length;

        track.artists.forEach(artist => {})
        return {cells: [name, artist, album, year, genre, length]}
    }

    componentDidMount() {
        this.componentMounted = true;
        getTracks(this.props.collection.id)
            .then(response => {
                if (this.componentMounted) {
                    console.log(response.data);
                    // change track object into table row
                    this.setState({
                        rows: response.data.map(track => this.createRow(track)),
                        loading: false,
                    });

                }
            })
            .catch(err => {
                console.log("Fetch error: " + err);
            });
    }

    componentWillUnmount() {
        this.componentMounted = false;
    }

    render() {
        if (this.state.loading) {
            return <LoadingComponent/>
        } else {

            const breadcrumbElements = [
                {
                    link: '/',
                    display: 'Collections',
                    isActive: false,
                },
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

            return (
                <React.Fragment>
                    <PageSection>
                        <BreadcrumbComponent elements={breadcrumbElements}/>
                    </PageSection>
                    <PageSection>
                        <TextContent>
                            <Text component={TextVariants.h1}>Tracks</Text>
                        </TextContent>
                    </PageSection>
                    <PageSection>
                        <Table aria-label="Tracks Table" cells={this.state.columns} rows={this.state.rows} className="tracksTable">
                            <TableHeader/>
                            <TableBody/>
                        </Table>
                    </PageSection>
            </React.Fragment>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps)(TrackList))