import React from "react";
import NotificationList from './notifications/List'

class Home extends React.Component {
    render() {
        const { history } = this.props;
        return <NotificationList history={history}></NotificationList>;
    }
}

export default Home