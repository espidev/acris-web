import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {Icon} from '@fluentui/react/lib/Icon';

import ReactAudioPlayer from 'react-audio-player';
import './PlayerPanel.css'
import {store} from "../../redux/store";
import {play, pause, nextTrack, prevTrack, unshuffleQueue, shuffleQueue} from "../../redux/slices/playerSlice"

import {baseURL} from "../../api/axiosApi";

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
        this.state = {}

        this.audioPlayer = React.createRef();
        this.handleSliderChange = event => {};
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
                    ref={(element) => {this.audioPlayer = element}} controls/>

                <input type="range" min="0" max="100" value="50" className="duration-slider" onChange={this.handleSliderChange}/>
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