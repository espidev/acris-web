import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import LoadingComponent from "./util/LoadingComponent";
import AlertComponent, {addAlert} from "./util/AlertComponent";
import {
    Avatar,
    CardBody,
    CardHeader, EmptyState, EmptyStateBody,
    EmptyStateIcon,
    getUniqueId,
    PageSection,
    Text,
    TextContent,
    TextVariants, Title
} from "@patternfly/react-core";
import BreadcrumbComponent, {collectionBreadcrumb} from "./util/BreadcrumbComponent";
import CardLayout from "./util/CardLayout";
import CardComponent from "./util/CardComponent";
import {Icon} from "@fluentui/react";
import {getPlaylists} from "../api/collection";

const mapStateToProps = state => ({collection: state.player.collection});

class PlaylistList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            playlists: [],
            alerts: [],
        };
    }

    componentDidMount() {
        this.componentMounted = true;
        getPlaylists(this.props.collection.id)
            .then(res => {
                if (this.componentMounted) {
                    this.setState({loading: false, playlists: res.data});
                }
            })
            .catch(err => {
                if (this.componentMounted) {
                    this.setState({
                        loading: false,
                        alerts: addAlert(this.state.alerts, 'Issue fetching playlist list.', 'danger', getUniqueId()),
                    });
                    console.log("Issue fetching playlist list: " + err);
                }
            });
    }

    componentWillUnmount() {
        this.componentMounted = false;
    }

    render() {
        const breadcrumbElements = [
            collectionBreadcrumb,
            {
                link: '/collection/' + this.props.collection.id,
                display: this.props.collection.name,
                isActive: false,
            },
            {
                link: '',
                display: 'Playlists',
                isActive: true,
            }
        ];

        const PageHeader = () => (
            <React.Fragment>
                <AlertComponent obj={this}/>
                <PageSection>
                    <BreadcrumbComponent elements={breadcrumbElements}/>
                </PageSection>
                <PageSection>
                    <TextContent>
                        <Text component={TextVariants.h1}>Playlists</Text>
                    </TextContent>
                </PageSection>
            </React.Fragment>
        );

        if (this.state.loading === true) {
            return (
                <React.Fragment>
                    <PageHeader/>
                    <LoadingComponent/>
                </React.Fragment>
            );
        } else if (this.state.playlists.length === 0) {
            return (
                <React.Fragment>
                    <PageHeader/>
                    <PageSection>
                        <EmptyState>
                            <EmptyStateIcon icon={() => <Icon style={{fontSize: "4em"}} iconName="MusicInCollection"/>}/>
                            <Title headingLevel="h2" size="lg">No playlists</Title>
                            <EmptyStateBody>
                                Create a playlist!
                            </EmptyStateBody>
                        </EmptyState>
                    </PageSection>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <PageHeader/>
                    <PageSection>
                        <CardLayout>
                            {this.state.playlists.map((playlist, key) => {
                                return (
                                    <CardComponent width="15em" key={key} url={'/collection/' + this.props.collection.id + '/playlist/' + playlist.id}>
                                        <CardBody style={{textAlign: 'center'}}>
                                            <Avatar alt="avatar" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9e4066b1-0e52-42c5-8b03-c80b53dc64c8/de1tjzh-713cea00-f11f-400c-92cc-c3f4ea8527b9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOWU0MDY2YjEtMGU1Mi00MmM1LThiMDMtYzgwYjUzZGM2NGM4XC9kZTF0anpoLTcxM2NlYTAwLWYxMWYtNDAwYy05MmNjLWMzZjRlYTg1MjdiOS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.vk2UoBUZZbyZ2aTSlwsvAMVemoWWgfMmiNvDJcQyqJo"/>
                                        </CardBody>
                                        <CardHeader style={{textAlign: 'center'}}>{playlist.name}</CardHeader>
                                    </CardComponent>
                                );
                            })}
                        </CardLayout>
                    </PageSection>
                    <div style={{height: "50px"}}/>
                </React.Fragment>
            )
        }
    }
}

export default withRouter(connect(mapStateToProps)(PlaylistList))