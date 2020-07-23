import React from 'react';

import "@patternfly/react-core/dist/styles/base.css";

import {
    LoginForm,
} from '@patternfly/react-core'
import { useHistory } from 'react-router-dom';
import {loginUser} from "../../redux/actions/auth";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.handleUsernameChange = this.handleUsernameChange().bind(this);
        this.handlePasswordChange = this.handlePasswordChange().bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        await loginUser(this.state.username, this.state.password);
        useHistory().push('/');
    }

    render() {

        const helperText = (
            <React.Fragment>
                <ExclamationCircleIcon />
                &nbsp;Invalid login credentials.
            </React.Fragment>
        );

        return (
        <LoginPage
        footerListVariants="inline"
        loginTitle="Log in to your account"
        >
            <LoginForm
                showHelperText={this.state.showHelperText}
                helperText={helperText}
                helperTextIcon={<ExclamationCircleIcon/>}
                usernameLabel="Username"
                usernameValue={this.state.usernameValue}
                onChangeUsername={this.handleUsernameChange}
                passwordLabel="Password"
                passwordValue={this.state.passwordValue}
                onChangePassword={this.handlePasswordChange}
                isValidPassword={this.state.isValidPassword}
                onLoginButtonClick={this.handleSubmit}
            />
        </LoginPage>
        );

        // return (
        //     <div>
        //         <TextContent>
        //             <Text component={TextVariants.h1}>Login</Text>
        //         </TextContent>
        //
        //         <Form onSubmit={this.handleSubmit}>
        //             <FormGroup label="Username" fieldId="form-username" isRequired>
        //                 <input type='text' value={this.state.username} id="form-username" className='pf-c-form-control' onChange={this.handleUsernameChange}/>
        //             </FormGroup>
        //             <FormGroup label="Password" fieldId="form-password" isRequired>
        //                 <input type='password' value={this.state.password} id='form-password' className='pf-c-form-control' onChange={this.handlePasswordChange}/>
        //             </FormGroup>
        //             <Button variant='primary'>Login</Button>
        //         </Form>
        //     </div>
        // );
    }
}