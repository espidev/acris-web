import React from 'react';
import {
    TextContent,
    Text,
    TextVariants,
    Form,
    FormGroup,
    Button,
} from '@patternfly/react-core'
import {loginUser} from "../../redux/actions/auth";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        await loginUser(this.state.username, this.state.password);
        history.push('/');
    }

    render() {
        return (
            <div>
                <TextContent>
                    <Text component={TextVariants.h1}>Login</Text>
                </TextContent>

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup label="Username" fieldId="form-username" isRequired>
                        <input type='text' value={this.state.username} id="form-username" className='pf-c-form-control' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup label="Password" fieldId="form-password" isRequired>
                        <input type='password' value={this.state.password} id='form-password' className='pf-c-form-control' onChange={this.handleChange}/>
                    </FormGroup>
                    <Button variant='primary'>Login</Button>
                </Form>
            </div>
        );
    }
}