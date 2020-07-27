import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    Dropdown,
    DropdownItem,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon, getUniqueId,
    KebabToggle,
    Title
} from "@patternfly/react-core";
import {Icon} from "@fluentui/react";
import "./TrackTableComponent.css"
import {store} from "../../redux/store";
import {changeTrack} from "../../redux/slices/playerSlice";
import AlertComponent from "./AlertComponent";
import {addAlert} from "./AlertComponent";
import {deleteTrack} from "../../api/collection";

const mapStateToProps = state => ({
    currentTrack: state.player.track,
});

// props:
// tracks - list of tracks
// onTracksChanged - callback if there is an edit to the tracks list

class TrackTableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            tracks: props.tracks,
            columns: ['', 'Name', 'Artist', 'Album', 'Year', 'Genre', 'Length'],
            rows: props.tracks.map(this.mapTrackToRow),

            onTracksChanged: props.onTracksChanged,

            isDropdownOpen: [],
            selectedRow: 0,
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

        this.onDropdownToggle = (isOpen, index) => {
            let newList = [...this.state.isDropdownOpen];
            newList[index] = isOpen;
            this.setState({isDropdownOpen: newList, selectedRow: index});
        }

        this.onDropdownSelect = index => {
            let newList = [...this.state.isDropdownOpen];
            newList[index] = !newList[index];
            this.setState({isDropdownOpen: newList, selectedRow: index});
        }

        this.onDeleteClick = async () => {
            try {
                let res = await deleteTrack(this.state.tracks[this.state.selectedRow].id);
                console.log(res);

                this.state.isDropdownOpen[this.state.selectedRow] = false;

                // trigger track list update
                this.state.onTracksChanged();
            } catch (e) {
                console.log("Could not delete: " + e);
                this.setState({alerts: addAlert(this.state.alerts, 'Error deleting track.', 'danger', getUniqueId())})
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            tracks: nextProps.tracks,
            rows: nextProps.tracks.map(this.mapTrackToRow),
        });
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

        const dropdownItems = [
            <DropdownItem key="delete" onClick={this.onDeleteClick}>Delete</DropdownItem>
        ]

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
                                <td>
                                    <div>
                                        <Dropdown
                                            onSelect={this.onDropdownSelect}
                                            toggle={<KebabToggle onToggle={isOpen => this.onDropdownToggle(isOpen, index)}/>}
                                            isOpen={this.state.isDropdownOpen[index]}
                                            isPlain
                                            dropdownItems={dropdownItems}
                                        />
                                    </div>
                                </td>
                            </tr>
                        )
                    )}
                 </tbody>
             </table>
         );

        if (this.props.tracks.length !== -+-+-+-+-+-+-+0) {
            return (
                <React.Fragment>
                    <AlertComponent obj={this}/>
                    <TrackTable/>
                </React.Fragment>
            );
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