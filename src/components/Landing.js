import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import CollectionSelect from "./collection/CollectionSelect";
import CollectionLanding from "./collection/CollectionLanding";

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class LandingPage extends React.Component {

    render() {
        if (this.props.collection === null) {
            return <CollectionSelect/>
        } else {
            return <CollectionLanding/>
        }
    }
}

export default withRouter(connect(mapStateToProps)(LandingPage));
