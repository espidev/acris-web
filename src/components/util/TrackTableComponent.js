import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {EmptyState, EmptyStateBody, EmptyStateIcon, Title} from "@patternfly/react-core";
import {Icon} from "@fluentui/react";
import "./TrackTableComponent.css"
import {store} from "../../redux/store";
import {changeTrack} from "../../redux/slices/playerSlice";

const mapStateToProps = state => ({
    currentTrack: state.player.track,
});

class TrackTableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: props.tracks,
            columns: ['', 'Name', 'Artist', 'Album', 'Year', 'Genre', 'Length'],
            rows: props.tracks.map(this.mapTrackToRow),
        }

        this.handleRowClick = e => {
            let trackIndex = e.target.parentElement.rowIndex;
            if (trackIndex !== undefined) {
                trackIndex--;

                store.dispatch(changeTrack({
                    track: this.state.tracks[trackIndex],
                    trackQueue: this.state.tracks,
                    queueIndex: trackIndex,
                }));
            }
        };
    }

    mapTrackToRow(track) {
        // TODO
        let thumbnail = (
            <React.Fragment>
                <img className="trackImage" alt="Track Image" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9e4066b1-0e52-42c5-8b03-c80b53dc64c8/de1tjzh-713cea00-f11f-400c-92cc-c3f4ea8527b9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOWU0MDY2YjEtMGU1Mi00MmM1LThiMDMtYzgwYjUzZGM2NGM4XC9kZTF0anpoLTcxM2NlYTAwLWYxMWYtNDAwYy05MmNjLWMzZjRlYTg1MjdiOS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.vk2UoBUZZbyZ2aTSlwsvAMVemoWWgfMmiNvDJcQyqJo"/>
            </React.Fragment>
            ),
            name = track.name === '' ? decodeURIComponent(track.file_name) : decodeURIComponent(track.name),
            artist = track.artists,
            album = track.album,
            year = track.year,
            genre = track.genres,
            length = track.length;

        return [thumbnail, name, artist, album, year, genre, length];
    }

    render() {
         const TrackTable = () => (
             <table className="trackTable">
                <thead>
                <tr>
                    <th className="trackListPictureCell"/>
                    <th className="trackListNameCell">Name</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Year</th>
                    <th>Genre</th>
                    <th>Length</th>
                </tr>
                </thead>
                 <tbody onClick={this.handleRowClick}>
                    {this.state.rows.map((row, index) => (
                            <tr key={index}>
                                <td className="trackListPictureCell">{row[0]}</td>
                                <td className="trackListNameCell">{row[1]}</td>
                                <td>{row[2]}</td>
                                <td>{row[3]}</td>
                                <td>{row[4]}</td>
                                <td>{row[5]}</td>
                                <td>{row[6]}</td>
                            </tr>
                        )
                    )}
                 </tbody>
             </table>
         );

        if (this.props.tracks.length !== -+-+-+-+-+-+-+0) {
            return <TrackTable/>;
        } else {
            return (
                <React.Fragment>
                    <EmptyState>
                        <EmptyStateIcon icon={() => <Icon style={{fontSize: "4em"}} iconName="MusicInCollection"/>}/>
                        <Title headingLevel="h2" size="lg">No tracks available</Title>
                        <EmptyStateBody>
                            No tracks were found.
                        </EmptyStateBody>
                    </EmptyState>
                </React.Fragment>
            );
        }
    }

}

export default withRouter(connect(mapStateToProps)(TrackTableComponent));