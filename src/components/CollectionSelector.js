import * as React from "react";
import {withRouter} from "react-router-dom";

import {ContextSelector, ContextSelectorItem} from "@patternfly/react-core";

import {getCollectionsList} from "../redux/actions/collection";

import {connect} from "react-redux";
import {store} from "../redux/store";
import {switchCollection} from "../redux/slices/playerSlice";

const mapStateToProps = state => (
    {
        selectedCollection: state.player.collection,
    }
);

// unused

class CollectionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
            selected: this.props.selectedCollection,
            collections: [],
            filteredCollections: [],
            searchValue: '',
        }

        this.onToggle = (event, isMenuOpen) => this.setState({isMenuOpen})
        this.onSelect = (event, value) => {
            this.setState({
                selected: value,
                isMenuOpen: !this.state.isMenuOpen,
            })
            store.dispatch(switchCollection(value));
        };
        this.onSearchInputChange = value => this.setState({searchValue: value,});
        this.onSearchButtonClick = event => {
            const filtered = this.state.searchValue === '' ? this.state.collections :
                this.state.collections.filter(col => col.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1);
            this.setState({filteredCollections: filtered || []});
        }
    }

    componentDidMount() {
        getCollectionsList().then(c => this.setState({collections: c}));
    }


    render() {
        const {isMenuOpen, selected, filteredCollections, searchValue} = this.state;

        return (
            <ContextSelector
                toggleText={selected}
                onSearchInputChange={this.onSearchInputChange}
                isOpen={isMenuOpen}
                searchInputValue={searchValue}
                onToggle={this.onToggle}
                onSelect={this.onSelect}
                onSearchButtonClick={this.onSearchButtonClick}
                screenReaderLabel="Selected collection:"
            >
                {filteredCollections.map((item, index) => (
                    <ContextSelectorItem key={index}>{item.name}</ContextSelectorItem>
                ))}
            </ContextSelector>
        );
    }
}

export default withRouter(connect(mapStateToProps)(CollectionSelector));