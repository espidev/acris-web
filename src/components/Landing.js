import React from 'react';
import {withRouter} from "react-router-dom";

import CollectionSelect from "./collection/CollectionSelect";
import {store} from "../redux/store";
import {switchCollection} from "../redux/slices/playerSlice";

class LandingPage extends React.Component {

    constructor(props) {
        super(props);

        // switch out of collection
        store.dispatch(switchCollection(null));
    }

    render() {
        return <CollectionSelect/>
    }
}

export default withRouter(LandingPage);
