import React from "react";
import {
    ActionGroup, Breadcrumb, BreadcrumbItem,
    Button,
    Form,
    FormGroup,
    PageSection,
    Switch,
    Text,
    TextContent,
    TextInput,
    TextVariants
} from "@patternfly/react-core";
import {withRouter} from "react-router-dom";
import BreadcrumbComponent from "../util/BreadcrumbComponent";

class NewCollectionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isPublic: false,
        }

        this.handleNameChange = name => this.setState({name: name});
        this.handleIsPublicChange = isChecked => this.setState({isPublic: isChecked});
        this.handleFormSubmit = () => {

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

export default withRouter(NewCollectionForm);