import React from "react";
import { connect } from 'react-redux'
import { ListGroup, Button, Card } from 'react-bootstrap'
import { setNotifications, setLoading } from '../../actions'
import Description from './Description'
import makeRequest from "../../modules/backendRequest"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

class NotificationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentWillMount() {
        let { setLoading } = this.props
        setLoading(true);
        makeRequest('notification', 'GET', true)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                    });
                    setLoading(false)
                    this.props.setNotifications(result)

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    setLoading(false);
                }
            )
    }

    removeNotification(id) {
        let { setLoading } = this.props
        setLoading(true);
        makeRequest('notification/' + id, 'DELETE', true)
            .then(() => { this.componentWillMount() })
    }
    toggelActive(notification) {
        let { setLoading } = this.props
        console.log(notification)
        setLoading(true);
        notification.active = !notification.active;
        makeRequest('notification/' + notification.id, 'PUT', true, notification)
            .then(() => { this.componentWillMount() })
    }
    render() {
        const { error, isLoaded } = this.state;
        const { notifications, history } = this.props;
        if (error) {
            return <Card><Card.Body>Error</Card.Body></Card>;
        } else if (!isLoaded || !notifications.notifications) {
            return <Card><Card.Body>Loading ...</Card.Body></Card>;
        } else {
            return (
                <Card>
                    <Card.Body>
                        {notifications.notifications.length ? <ListGroup>
                            {notifications.notifications.map(item => (
                                <ListGroup.Item key={item.id}>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <div>{item.name}</div>
                                            <Description filters={item.filters} />
                                            <Button className="action-button"
                                                variant="info"
                                                onClick={() => { history.push("/notifications/" + item.id) }}>
                                                Edit <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                            <Button className="action-button"
                                                variant="danger"
                                                onClick={() => { this.removeNotification(item.id) }}>
                                                Remove <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </div>
                                        <div>
                                            <BootstrapSwitchButton
                                                checked={item.active}
                                                onlabel='On'
                                                offlabel='Off'
                                                width="70"
                                                onstyle="success" offstyle="warning"
                                                onChange={() => {
                                                    this.toggelActive(item)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup> : <Card><Card.Body>No Notifications</Card.Body></Card>}
                    </Card.Body>
                    <Card.Footer>
                        <Button block={true} onClick={() => { history.push("/notifications") }} variant="success">Add</Button>
                    </Card.Footer>
                </Card>
            );
        }
    }
}

const mapStateToProps = state => ({
    notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
    setNotifications: notifactions => dispatch(setNotifications(notifactions)),
    setLoading: loading => dispatch(setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList)