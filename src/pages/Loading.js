import React from "react";
import { ReactComponent as Spinner } from './spinner.svg';
import './Loader.css';

class Loading extends React.Component {
    render() {
        return <div className="loading-screen">
            <div className="loading-center">
                <Spinner />
                Loading...
            </div>
        </div>
    }
}

export default (Loading)