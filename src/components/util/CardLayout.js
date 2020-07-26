import React from "react";

export default class CardLayout extends React.Component {
    render() {
        return (
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {this.props.children}
            </div>
        )
    }
}