import React from "react";
import Form from "./Form"
import { connect } from 'react-redux'
import validate from "../../validator/notification"
import makeRequest from "../../modules/backendRequest"
import { Alert, Button, Card } from 'react-bootstrap'
import { setLoading } from '../../actions'

class NotificationAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: {
                name: "",
                active: true,
                filters: []
            }
        };
    }

    addNotification(notification) {
        console.log(notification)
        let {history, setLoading } = this.props
        let validateResponse = validate(notification)
        if (validateResponse === true) {
            setLoading(true)
            makeRequest('notification', 'POST', true, notification)
                .then(() => {
                    history.push("/")
                    setLoading(false)
                })
        } else {
            this.setState({ error: validateResponse })
        }
    }

    render() {
        const { notification, error } = this.state;
        const { history } = this.props;
        return (
            <div>
                {error ? <Alert variant="danger">
                    {error}
                </Alert> : ""}
                <Card>
                    <Card.Body>
                        <Form notification={notification} />
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="outline-success" onClick={() => { this.addNotification(notification) }} style={{ marginRight: "10px" }}>Add</Button>
                        <Button variant="outline-danger" onClick={() => { history.push("/") }}>Cancel</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    setLoading: loading => dispatch(setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationAdd)