import React from "react";
import {withRouter} from "react-router-dom";
import {Card} from "@patternfly/react-core";

import './CardComponent.css'

// props:
// url - url to go to
// width - width of card

class CardComponent extends React.Component {
    render() {
        return (
            <a href={this.props.url} style={{width: this.props.width}} onClick={e => e.preventDefault()} className="cardLink">
                <Card isHoverable className="collectionActionCard" onClick={() => this.props.history.push(this.props.url)}>
                    {this.props.children}
                    <p className="collectionActionCardFiller"/>
                </Card>
            </a>
        );
    }
}

export default withRouter(CardComponent);