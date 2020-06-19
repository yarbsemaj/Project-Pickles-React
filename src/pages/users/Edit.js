import React from "react";
import { connect } from 'react-redux'
import { setUser, setLoading } from '../../actions'
import makeRequest from "../../modules/backendRequest"
import { Button, Form, Card } from 'react-bootstrap'


class UserEdit extends React.Component {

    componentWillMount() {
        let { user } = this.props;
        this.setState({ webhook: user.webhook });
    }

    webhookChange(webhook) {
        this.setState({ webhook: webhook });
    }

    saveWebhook() {
        let { setUser, setLoading } = this.props;
        let { webhook } = this.state;

        setLoading(true);
        let body = { webhook: webhook }
        makeRequest('user', 'PUT', true, body)
            .then((body) => { setUser(body) })
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }
    render() {
        let { user } = this.props;
        let { webhook } = this.state;
        return (
            <Card>
                <Card.Body>
                    <h3>Hello {user.given_name}!</h3>
                    <p>Setup for IFTTT Webhook id</p>
                    <Form.Control placeholder="Webhook ID" value={webhook} onChange={(webhook) => this.webhookChange(webhook.target.value)} />
                </Card.Body>
                <Card.Header>
                    <Button block={true} disabled={webhook === ""} onClick={() => this.saveWebhook()}>Save</Button>
                </Card.Header>
            </Card>);
    }
}


const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
    setLoading: loading => dispatch(setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)