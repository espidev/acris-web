import React from "react";
import {
    ActionGroup, Button,
    Form,
    FormGroup, getUniqueId,
    PageSection,
    Switch,
    Text,
    TextContent,
    TextInput,
    TextVariants
} from "@patternfly/react-core";
import {withRouter} from "react-router-dom";
import BreadcrumbComponent from "../util/BreadcrumbComponent";
import AlertComponent, {addAlert, removeAlert} from "../util/AlertComponent";
import {createCollection} from "../../api/collection";
import {connect} from 'react-redux';

const mapStateToProps = state => ({user: state.auth.user});

class NewCollectionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isPublic: false,
            alerts: [],
        }

        this.handleNameChange = name => this.setState({name: name});
        this.handleIsPublicChange = isChecked => this.setState({isPublic: isChecked});
        this.handleFormSubmit = e => {
            e.preventDefault();

            createCollection(this.state.name, this.props.user.id, this.state.isPublic)
                .then(res => {
                    this.setState({alerts: addAlert(this.state.alerts, 'Created collection ' + res.data.name, 'success', getUniqueId())});
                    this.props.history.push('/collection/' + res.data.id);
                })
                .catch(err => {
                    console.log("Issue creating new collection: " + err);
                    this.setState({alerts: addAlert(this.state.alerts, 'Could not create new collection.', 'danger', getUniqueId())});
                });
        }
    }


    render() {
        const breadcrumbElements = [
            {
                link: '/',
                display: 'Collections',
                isActive: false,
            },
            {
                link: '',
                display: 'New Collection',
                isActive: true,
            }
        ];

        return (
            <React.Fragment>
                <AlertComponent obj={this}/>
                <PageSection>
                    <BreadcrumbComponent elements={breadcrumbElements}/>
                </PageSection>

                <PageSection>
                    <TextContent>
                        <Text component={TextVariants.h1}>New Collection</Text>
                        <Text component={TextVariants.p}>Creating a new collection of music.</Text>
                    </TextContent>
                </PageSection>
                <PageSection style={{"maxWidth": "50rem"}}>
                    <Form onSubmit={this.handleFormSubmit}>
                        <FormGroup label="Name" fieldId="name" isRequired>
                            <TextInput isRequired type="text" id="name" name="name" onChange={this.handleNameChange}/>
                        </FormGroup>
                        <FormGroup fieldId="isPublic">
                            <Switch
                                id="isPublic"
                                label="Public for everyone to view"
                                labelOff="Viewable only by invitation"
                                isChecked={this.state.isPublic}
                                onChange={this.handleIsPublicChange}
                            />
                        </FormGroup>
                        <ActionGroup>
                            <Button variant='primary' type='submit'>Submit</Button>
                        </ActionGroup>
                    </Form>
                </PageSection>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps)(NewCollectionForm));