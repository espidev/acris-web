import React from "react";
import {Breadcrumb, BreadcrumbItem} from "@patternfly/react-core";
import {withRouter} from "react-router-dom";
import './BreadcrumbComponent.css'
import {store} from "../../redux/store";
import {switchCollection} from "../../redux/slices/playerSlice";

// Quick utility to render breadcrumbs
// Input: Array of elements (as prop element)
// Each element: {link, display, isActive, onClick}

class BreadcrumbComponent extends React.Component {

    render() {
        return (
            <Breadcrumb>
                {this.props.elements.map((element, index) => {
                    if (element.isActive) {
                        return <BreadcrumbItem key={index} isActive>{element.display}</BreadcrumbItem>;
                    } else {
                        return <BreadcrumbItem key={index} onClick={() => {
                                if (element.onClick)
                                    element.onClick();
                                this.props.history.push(element.link);
                            }}>
                                <a href={element.link} className='breadcrumbItem' onClick={e => e.preventDefault()}>{element.display}</a>
                            </BreadcrumbItem>;
                    }
                })}
            </Breadcrumb>
        )
    }
}

export const collectionBreadcrumb = {
    link: '/',
    display: 'Collections',
    isActive: false,
    // onClick: () => {store.dispatch(switchCollection(null))},
}

export default withRouter(BreadcrumbComponent);

