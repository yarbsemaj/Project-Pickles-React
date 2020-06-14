import React from "react";
import { Jumbotron } from 'react-bootstrap'
import SetWebhook from './Webhook'
import Login from './Login'



class OnboardingFrame extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const token = localStorage.getItem('token');

        return <Jumbotron>
            <h1>Welcome to Project Pickles!</h1>
            {token?<SetWebhook/>:<Login/>}
        </Jumbotron>;
    }
}

export default OnboardingFrame