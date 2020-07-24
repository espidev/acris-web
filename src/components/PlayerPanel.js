import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {Icon} from '@fluentui/react/lib/Icon';

import './PlayerPanel.css'

const mapStateToProps = state => ({playing: state.player.playing});

class PlayerPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.handleSliderChange = event => {};
    }

    render() {
        return (
            <nav className="audio-player-panel">
                <div className="left-component">
                    <img className="track-image" alt="Track Image" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9e4066b1-0e52-42c5-8b03-c80b53dc64c8/de1tjzh-713cea00-f11f-400c-92cc-c3f4ea8527b9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOWU0MDY2YjEtMGU1Mi00MmM1LThiMDMtYzgwYjUzZGM2NGM4XC9kZTF0anpoLTcxM2NlYTAwLWYxMWYtNDAwYy05MmNjLWMzZjRlYTg1MjdiOS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.vk2UoBUZZbyZ2aTSlwsvAMVemoWWgfMmiNvDJcQyqJo"/>
                    <ul className="track-info">
                        <li className="track-title">Derek bad</li>
                        <li className="track-artist">Kenoi</li>
                    </ul>
                </div>

                <input type="range" min="0" max="100" value="50" className="duration-slider" onChange={this.handleSliderChange}/>
                <ul className="right-component">
                    <li className="media-clickable"><a><Icon iconName="Previous"/></a></li>
                    <li className="media-clickable"><a>{this.props.playing ? <Icon iconName="Pause"/> : <Icon iconName="Play"/>}</a></li>
                    <li className="media-clickable"><a><Icon iconName="Next"/></a></li>
                    <li className="media-clickable"><a><Icon iconName="Volume2"/></a></li>
                    <li className="media-clickable"><a><Icon iconName="RepeatAll"/></a></li>
                    <li className="media-clickable"><a><Icon iconName="Switch"/></a></li>
                </ul>
            </nav>
        );
    }
}

export default withRouter(connect(mapStateToProps)(PlayerPanel))