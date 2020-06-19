import React from "react";
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";

import { Container } from 'react-bootstrap'

import BuiltNavBar from './pages/NavBar'

import Home from './pages/Home'
import UserEdit from './pages/users/Edit'
import NotificationEdit from './pages/notifications/Edit'
import OnboardingFrame from './pages/onboarding/Frame'
import NotificationAdd from './pages/notifications/Add'
import Loading from './pages/Loading'
import { setUser, setLoading } from './actions'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends React.Component {
    logout() {
        let { setLoading, setUser } = this.props;
        setLoading(true)
        setUser({ webhook: "" })
        localStorage.removeItem("token")
        setLoading(false)
    }
    render() {
        let { loading, user } = this.props
        return (
            <div>
                {loading ? <Loading></Loading> : null}
                <BuiltNavBar></BuiltNavBar>
                <Container>
                    {localStorage.getItem("token") && user.webhook ?
                        <Router>
                            <div>
                                <Switch>
                                    <Route path="/notifications/:id" render={({ history }) => (
                                        <Edit history={history} />
                                    )} />
                                    <Route path="/notifications" render={({ history }) => (
                                        <NotificationAdd history={history} />
                                    )} />
                                    <Route path="/user" render={({ history }) => (
                                        <UserEdit history={history} />
                                    )} />
                                    <Route path="/" render={({ history }) => (
                                        <Home history={history} />
                                    )} />
                                </Switch>
                            </div>
                        </Router> : <OnboardingFrame />
                    }
                </Container>
            </div >
        );
    }
}

function Edit({ history }) {
    let { id } = useParams();
    console.log(id);
    return <NotificationEdit history={history} id={id} />
}
const mapStateToProps = state => ({
    loading: state.state.loading,
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
    setLoading: loading => dispatch(setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
