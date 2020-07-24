import React from 'react';

import "@patternfly/react-core/dist/styles/base.css";

import {loginUser} from "../redux/actions/auth";
import {Button, Form, FormGroup, Text, TextContent, TextVariants} from "@patternfly/react-core";
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
            <div>
                <TextContent>
                    <Text component={TextVariants.h1}>Login</Text>
                </TextContent>

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup label="Username" fieldId="form-username" isRequired>
                        <input type='text' id="form-username" className='pf-c-form-control' onChange={this.handleUsernameChange}/>
                    </FormGroup>
                    <FormGroup label="Password" fieldId="form-password" isRequired>
                        <input type='password' id='form-password' className='pf-c-form-control' onChange={this.handlePasswordChange}/>
                    </FormGroup>
                    <Button variant='primary' type='submit'>Login</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(LoginPage);