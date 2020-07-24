import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Spinner} from "@patternfly/react-core";

const mapStateToProps = state => ({
    user: state.auth.user,
    collection: state.player.collection,
});

class UploadComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Spinner/>;
    }
}

export default withRouter(connect(mapStateToProps)(UploadComponent));