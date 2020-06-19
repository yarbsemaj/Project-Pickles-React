import React from "react";
import Form from "./Form"
import { connect } from 'react-redux'
import validate from "../../validator/notification"
import makeRequest from "../../modules/backendRequest"
import { Alert, Button, Card } from 'react-bootstrap'
import { setLoading } from '../../actions'

class NotificationEdit extends React.Component {
    editNotification(notification) {
        let { history, setLoading } = this.props
        let validateResponse = validate(notification)
        if (validateResponse === true) {
            setLoading(true)
            makeRequest('notification/'+notification.id, 'PUT', true, notification)
                .then(() => {
                    setLoading(false)
                    history.push("/")
                })
        } else {
            this.setState({ error: validateResponse })
        }
    }

    componentWillMount() {
        let { notifications, id } = this.props
        console.log(this.props)
        console.log(notifications)
        notifications.notifications.forEach(notification => {
            if (notification.id === id) {
                this.setState({ notification: notification })
            }
        });
    }

    render() {
        const { notification, error } = this.state;
        const { history } = this.props;
        console.log(notification)
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
                        <Button variant="outline-success" onClick={() => { this.editNotification(notification) }} style={{ marginRight: "10px" }}>Save</Button>
                        <Button variant="outline-danger" onClick={() => { history.push("/") }}>Cancel</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    notifications: state.notifications
});

const mapDispatchToProps = dispatch => ({
    setLoading: loading => dispatch(setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationEdit)