import React from "react";
import { connect } from 'react-redux'
import { setUser, setLoading } from '../../actions'
import makeRequest from "../../modules/backendRequest"
import { FormGroup, Button, Form } from 'react-bootstrap'


class Login extends React.Component {

    componentWillMount(){
        this.setState({ webhook: "" });  
    }

    webhookChange(webhook) {
        console.log(webhook)
        this.setState({ webhook: webhook });
    }

    saveWebhook() {
        let { setUser, setLoading } = this.props;
        let { webhook } = this.state;

        setLoading(true);
        let body = {webhook:webhook}
        makeRequest('user', 'PUT', true, body)
            .then((body) => { setUser(body) })
            .then(()=>setLoading(false))
            .catch(()=>setLoading(false))
    }
    render() {
        let { user } = this.props;
        let { webhook } = this.state;
        return (
            <div>
                <h2>Step 2</h2>
                <h3>Hello {user.given_name}!</h3>
                <p>Setup for IFTTT Webhook id</p>
                <Form.Control placeholder="Webhook ID" onChange={(webhook) => this.webhookChange(webhook.target.value)}/>
                <br/>
                <Button block={true} disabled={webhook == ""} onClick={()=>this.saveWebhook()}>Save</Button>
            </div>);
    }
}


const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
    setLoading: loading=>dispatch(setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)