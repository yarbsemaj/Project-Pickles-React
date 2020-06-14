import React from "react";
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";

import { Container, Navbar, Nav } from 'react-bootstrap'

import Home from './pages/Home'
import NotificationEdit from './pages/notifications/Edit'
import OnboardingFrame from './pages/onboarding/Frame'
import NotificationAdd from './pages/notifications/Add'
import Loading from './pages/Loading'
import { setUser, setLoading } from './actions'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.jpeg'


class App extends React.Component {
    logout(){
        let {setLoading, setUser} = this.props;
        setLoading(true)
        setUser({webhook: ""})
        localStorage.removeItem("token")
        setLoading(false)
    }
    render() {
        let { loading, user } = this.props
        return (
            <div>
                {loading ? <Loading></Loading> : null}
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/"> <img src={logo} width="30" height="30" class="rounded d-inline-block align-top" alt=""/> Project Pickles</Navbar.Brand>
                    <Nav className="navbar-right">
                        {user.name?
                            <Nav.Link onClick={() => { this.logout() }}>
                                {user.name} <img src={user.picture} width="30" height="30" class="rounded d-inline-block align-top" alt=""/>
                                </Nav.Link>:null
                        }
                    </Nav>
                </Navbar>
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
    setLoading: loading=>dispatch(setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
