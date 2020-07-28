import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {Icon} from '@fluentui/react/lib/Icon';

import './PlayerPanel.css'
import {store} from "../../redux/store";
import {play, pause, nextTrack, prevTrack, unshuffleQueue, shuffleQueue} from "../../redux/slices/playerSlice"

import {baseURL} from "../../api/axiosApi";

import AudioPlayer from 'react-h5-audio-player';
import parseTrack from "../../api/trackParser";

const mapStateToProps = (state, ownProps) => {
    let newState = {
        playing: state.player.playing,
        isShuffled: state.player.isShuffled,
        track: state.player.track,
        parsedTrack: parseTrack(state.player.track, 'track-image')
    };
    newState.changePlayingState = ownProps.playing !== state.player.playing || ownProps.parsedTrack.name !== newState.parsedTrack.name;
    return (newState);
}

class PlayerPanel extends React.Component {
    constructor(props) {
        // props: audioPlayer (audio ref)
        super(props);

        this.audioPlayer = React.createRef();
    }

    componentDidUpdate() {
        if (this.props.changePlayingState) {
            if (this.props.playing) {
                this.audioPlayer.current.audio.current.play();
            } else {
                this.audioPlayer.current.audio.current.pause();
            }
        }
    }

    render() {

        const PreviousButton = (
            <li className="media-clickable" onClick={() => store.dispatch(prevTrack())}><Icon iconName="Previous"/></li>
        );

        const PlayPauseButton = (
            <li className="media-clickable" onClick={() => this.props.playing ? store.dispatch(pause()) : store.dispatch(play())}>
                {this.props.playing ? <Icon iconName="Pause"/> : <Icon iconName="Play"/>}
            </li>
        );

        const NextButton = (
            <li className="media-clickable" onClick={() => store.dispatch(nextTrack())}><Icon iconName="Next"/></li>
        );
        const VolumeButton = (
            <li className="media-clickable"><Icon iconName="Volume2"/></li>
        );
        const RepeatButton = (
            <li className="media-clickable"><Icon iconName="RepeatAll"/></li>
        );
        const ShuffleButton = (
            <li className="media-clickable" onClick={() => this.props.isShuffled ? store.dispatch(unshuffleQueue()) : store.dispatch(shuffleQueue())}>
                {this.props.isShuffled ? <Icon iconName="ScatterChart"/> : <Icon iconName="Switch"/>}
            </li>
        );

        return (
            <nav className="audio-player-panel">

                <div className="left-component">
                    {this.props.parsedTrack.thumbnail}
                    <ul className="track-info">
                        <li className="track-title">{this.props.parsedTrack.name}</li>
                        <li className="track-artist">{this.props.parsedTrack.artist}</li>
                    </ul>
                </div>

                {/* Heavily customized and stylized - did not import original css */}
                <AudioPlayer
                    src={this.props.track == null ? "" : baseURL + "track/" + this.props.track.id + "/stream"}
                    ref={this.audioPlayer}
                    layout="horizontal"
                    onPlay={() => store.dispatch(play())}
                    onPause={() => store.dispatch(pause())}
                    customControlsSection={[PreviousButton, PlayPauseButton, NextButton, VolumeButton, RepeatButton, ShuffleButton]}
                />
            </nav>
        );
    }
}

export default withRouter(connect(mapStateToProps)(PlayerPanel))