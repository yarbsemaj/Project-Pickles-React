import React from "react";
import { Button, Form, Card } from 'react-bootstrap'
import FilterForm from "./FilterForm"


class NotificationForm extends React.Component {

    componentWillMount() {
        let { notification } = this.props;
        this.setState({ notification: notification })
    }
    addFilter() {
        let { notification } = this.state;
        notification.filters.push({})
        this.setState({ notification: notification })
    }
    setName(name) {
        let { notification } = this.state;
        notification.name = name
        this.setState({ notification: notification })
    }
    removeFilter(index) {
        let { notification } = this.state;
        notification.filters.splice(index, 1)
        this.setState({ notification: notification })
    }
    setFilter(index, field, value) {
        let { notification } = this.state;
        console.log("Set field")
        if (field === "field") {
            notification.filters[index] = {}
        }
        notification.filters[index][field] = value
        this.setState({ notification: notification })
    }

    render() {
        let { notification } = this.state;

        return (
            <Form>
                <Form.Control
                    className="name-field"
                    placeholder="Name"
                    value={notification.name}
                    onChange={(e) => { this.setName( e.target.value) }}
                />
                <Card>
                    <Card.Body>
                        {notification.filters.length ? notification.filters.map((prop, key) => {
                            return (
                                <FilterForm filter={prop} key={key} remove={(e) => {
                                    e.preventDefault();
                                    this.removeFilter(key)
                                }}
                                    onChange={(e, field) => { this.setFilter(key, field, e.target.value) }} />
                            );
                        }) : <div>No filters</div>}
                    </Card.Body>
                    <Card.Footer>
                        <Button block={true} onClick={() => { this.addFilter() }} variant="success">Add</Button>
                    </Card.Footer>
                </Card>
            </Form>)
    }
}

export default NotificationForm