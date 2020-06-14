import React from "react";
import { connect } from 'react-redux'
import { setUser, setLoading } from '../../actions'
import { GoogleLogin } from 'react-google-login';
import makeRequest from "../../modules/backendRequest"

class Login extends React.Component {
    login(body) {
        let { setUser, setLoading } = this.props;
        setLoading(true);
        makeRequest('user', 'POST', false, body)
            .then((body) => { localStorage.setItem("token", body.token) })
            .then(() => makeRequest('user', 'GET', true))
            .then((body) => { setUser(body) })
            .then(()=>setLoading(false))
    }

    render() {
        return (
            <div>
                <h2>Step 1</h2>
                <p>Login with Google</p>
                <GoogleLogin
                    clientId="37343845618-1hdmmg7dghtfhttbf9j7g8clhidoeu7c.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={(responseGoogle) => { this.login(responseGoogle) }}
                    onFailure={(responseGoogle) => { console.log(responseGoogle) }}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
    }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
    setLoading: loading=>dispatch(setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)