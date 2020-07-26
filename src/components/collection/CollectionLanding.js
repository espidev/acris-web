import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {
    CardBody,
    CardTitle,
    PageSection,
    Text,
    TextContent,
    TextVariants
} from "@patternfly/react-core";
import LoadingComponent from "../util/LoadingComponent";
import {Icon} from "@fluentui/react/lib/Icon";
import './CollectionLanding.css'
import BreadcrumbComponent, {collectionBreadcrumb} from "../util/BreadcrumbComponent";
import CardComponent from "../util/CardComponent";
import CardLayout from "../util/CardLayout";

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class CollectionLanding extends React.Component {

    render() {
        if (this.props.collection !== null) {

            const SelectCard = props => (
                <CardComponent width="10em" url={props.url}>
                    <CardBody style={{textAlign: "center"}}>
                        <Icon className="cardIcon" iconName={props.icon}/>
                    </CardBody>
                    <CardTitle style={{textAlign: "center"}}>{props.title}</CardTitle>
                </CardComponent>
            );

            const breadcrumbElements = [
                collectionBreadcrumb,
                {
                    link: '/collection/' + this.props.collection.id,
                    display: this.props.collection.name,
                    isActive: true,
                },
            ];

            return (
                <React.Fragment>
                    <PageSection>
                        <BreadcrumbComponent elements={breadcrumbElements}/>
                    </PageSection>
                    <PageSection>
                        <TextContent>
                            <Text component={TextVariants.h1}>Collection {this.props.collection.name}</Text>
                            <Text component={TextVariants.p}>You are currently viewing
                                your <b>{this.props.collection.name}</b> collection.</Text>
                            <Text component={TextVariants.p}>Click on the collections link above to switch music collections.</Text>
                        </TextContent>
                    </PageSection>
                    <PageSection>
                        <CardLayout>
                            <SelectCard url={'/collection/' + this.props.collection.id + '/tracks'} title='Tracks' icon='MusicInCollection'/>
                            <SelectCard url={'/collection/' + this.props.collection.id + '/albums'} title='Albums' icon='Album'/>
                            <SelectCard url={'/collection/' + this.props.collection.id + '/artists'} title='Artists' icon='Contact'/>
                            <SelectCard url={'/collection/' + this.props.collection.id + '/genres'} title='Genres' icon='AssessmentGroup'/>
                            <SelectCard url={'/collection/' + this.props.collection.id + '/playlists'} title='Playlists' icon='BulletedListMirrored'/>
                            <SelectCard url={'/collection/' + this.props.collection.id + '/upload'} title='Upload' icon='Upload'/>
                        </CardLayout>
                    </PageSection>
                </React.Fragment>
            );
        } else {
            return <LoadingComponent/>
        }
    }
}

export default withRouter(connect(mapStateToProps)(CollectionLanding))