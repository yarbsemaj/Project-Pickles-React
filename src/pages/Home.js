import React from "react";
import { connect } from 'react-redux'



import NotificationList from './notifications/List'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {history } = this.props;
            return <NotificationList history={history}></NotificationList>;
    }
}

export default Home