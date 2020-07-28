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
import parseTrack from "../../api/trackParser";
import {LazyLoadComponent, LazyLoadImage, trackWindowScroll} from "react-lazy-load-image-component";

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

                let newList = [...this.state.isDropdownOpen];
                newList[this.state.selectedRow] = false;
                this.setState({isDropdownOpen: newList});

                // trigger track list update
                this.state.onTracksChanged();
            } catch (e) {
                console.log("Could not delete: " + e);
                this.setState({alerts: addAlert(this.state.alerts, 'Error deleting track.', 'danger', getUniqueId())})
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // update tracks if list is updated
        this.setState({
            tracks: nextProps.tracks,
            rows: nextProps.tracks.map(this.mapTrackToRow),
        });
    }

    mapTrackToRow(track) {
        let parsed = parseTrack(track);
        return [parsed.thumbnail, parsed.name, parsed.artist, parsed.album, parsed.year, parsed.genre, parsed.length];
    }

    render() {

        const dropdownItems = [
            <DropdownItem key="delete" onClick={this.onDeleteClick}>Delete</DropdownItem>
        ]

        const TrackTableRows = ({scrollPosition}) => (

            this.state.rows.map((row, index) => (
                <tr key={index}>
                    <td className="trackListPictureCell">
                        <LazyLoadImage
                            className="trackImage"
                            scrollPosition={scrollPosition}
                            effect="opacity"
                            alt="Track Image"
                            src={row[0]}/>
                    </td>
                    <td className="trackListNameCell">{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
                    <td>{row[5]}</td>
                    <td>{row[6]}</td>
                    <td>
                        <div>
                            <Dropdown
                                onSelect={() => this.onDropdownSelect(index)}
                                toggle={<KebabToggle onToggle={isOpen => this.onDropdownToggle(isOpen, index)}/>}
                                isOpen={this.state.isDropdownOpen[index]}
                                isPlain
                                dropdownItems={dropdownItems}
                            />
                        </div>
                    </td>
                </tr>
            ))

        );

        const WrappedTrackTableRows = trackWindowScroll(TrackTableRows);

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
                    <WrappedTrackTableRows/>
                </tbody>
            </table>
        );

        if (this.props.tracks.length !== 0) {
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