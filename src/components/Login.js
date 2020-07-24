import React from 'react';

import "@patternfly/react-core/dist/styles/base.css";
import "./Login.css"

import {loginUser} from "../redux/actions/auth";
import {
    Button, Card, CardBody, CardHeader,
    Form,
    FormGroup,
    PageSection,
    PageSectionVariants,
    TextContent,
    Title,
} from "@patternfly/react-core";
import {withRouter} from "react-router-dom";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }

        this.handleUsernameChange = event => this.setState({username: event.target.value});
        this.handlePasswordChange = event => this.setState({password: event.target.value});
        this.handleSubmit = async event => {
            event.preventDefault();
            await loginUser(this.state.username, this.state.password);
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <PageSection>
                <Card className='login-box'>
                    <CardHeader>
                        <Title headingLevel="h1" size="3xl">Login</Title>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup label="Username" fieldId="form-username" isRequired>
                                <input type='text' id="form-username" className='pf-c-form-control' onChange={this.handleUsernameChange}/>
                            </FormGroup>
                            <FormGroup label="Password" fieldId="form-password" isRequired>
                                <input type='password' id='form-password' className='pf-c-form-control' onChange={this.handlePasswordChange}/>
                            </FormGroup>
                            <Button variant='primary' type='submit'>Login</Button>
                        </Form>
                    </CardBody>
                </Card>
            </PageSection>
        );
    }
}

export default withRouter(LoginPage);