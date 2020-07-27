import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {Icon} from '@fluentui/react/lib/Icon';

import './PlayerPanel.css'
import {store} from "../../redux/store";
import {play, pause, nextTrack, prevTrack, unshuffleQueue, shuffleQueue} from "../../redux/slices/playerSlice"

import {baseURL} from "../../api/axiosApi";
import {Text} from "@patternfly/react-core";

const mapStateToProps = (state, ownProps) => {
    let newState = {
        playing: state.player.playing,
        isShuffled: state.player.isShuffled,
        track: state.player.track,
        trackName: state.player.track == null ? '' : (state.player.track.name === '' ? decodeURIComponent(state.player.track.file_name) : decodeURIComponent(state.player.track.name)),
    };
    newState.changePlayingState = ownProps.playing !== state.player.playing || ownProps.trackName !== newState.trackName;
    return (newState);
}

class PlayerPanel extends React.Component {
    constructor(props) {
        // props: audioPlayer (audio ref)
        super(props);
        this.state = {
            currentElapsed: 0,
            trackLength: 0,
        }

        this.audioPlayer = React.createRef();
        this.handleSliderChange = event => {
            this.audioPlayer.currentTime = event.target.value;
        };
    }

    componentDidMount() {
        // update slider bar
        setInterval(() => {
            if (this.audioPlayer !== null)
                this.setState({
                    currentElapsed: this.audioPlayer.currentTime,
                    trackLength: this.audioPlayer.duration,
                });
        }, 500);
    }

    componentDidUpdate() {
        if (this.props.changePlayingState) {
            if (this.props.playing) {
                this.audioPlayer.play();
            } else {
                this.audioPlayer.pause();
            }
        }
    }

    render() {

        const formatTime = (secs) => {
            if (isNaN(secs)) return '0:00';
            return (secs / 60) + ':' + (secs - Math.floor(secs / 60) * 60);
        }

        return (
            <nav className="audio-player-panel">

                <div className="left-component">
                    <img className="track-image" alt="Track Image" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9e4066b1-0e52-42c5-8b03-c80b53dc64c8/de1tjzh-713cea00-f11f-400c-92cc-c3f4ea8527b9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOWU0MDY2YjEtMGU1Mi00MmM1LThiMDMtYzgwYjUzZGM2NGM4XC9kZTF0anpoLTcxM2NlYTAwLWYxMWYtNDAwYy05MmNjLWMzZjRlYTg1MjdiOS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.vk2UoBUZZbyZ2aTSlwsvAMVemoWWgfMmiNvDJcQyqJo"/>
                    <ul className="track-info">
                        <li className="track-title">{this.props.trackName}</li>
                        <li className="track-artist">Kenoi</li>
                    </ul>
                </div>

                <audio src={this.props.track == null ? "" : baseURL + "track/" + this.props.track.id + "/stream"}
                    ref={(element) => {this.audioPlayer = element}}/>

                <span className="duration-text">{formatTime(this.props.currentElapsed)}</span>
                <input type="range" min="0" max={this.state.trackLength} value={this.state.currentElapsed} className="duration-slider" onChange={this.handleSliderChange}/>
                <span className="duration-text">{formatTime(this.props.trackLength)}</span>

                <ul className="right-component">
                    <li className="media-clickable" onClick={() => store.dispatch(prevTrack())}><Icon iconName="Previous"/></li>
                    <li className="media-clickable" onClick={() => this.props.playing ? store.dispatch(pause()) : store.dispatch(play())}>
                        {this.props.playing ? <Icon iconName="Pause"/> : <Icon iconName="Play"/>}
                    </li>
                    <li className="media-clickable" onClick={() => store.dispatch(nextTrack())}><Icon iconName="Next"/></li>
                    <li className="media-clickable"><Icon iconName="Volume2"/></li>
                    <li className="media-clickable"><Icon iconName="RepeatAll"/></li>
                    <li className="media-clickable" onClick={() => this.props.isShuffled ? store.dispatch(unshuffleQueue()) : store.dispatch(shuffleQueue())}>
                        {this.props.isShuffled ? <Icon iconName="ScatterChart"/> : <Icon iconName="Switch"/>}
                    </li>
                </ul>
            </nav>
        );
    }
}

export default withRouter(connect(mapStateToProps)(PlayerPanel))