import React from 'react';
import { Link } from "react-router-dom";

class App extends React.Component {
    render() {
        return(
            <div>
                <h1>Polyquerier</h1>
                <Link to="/upload/">Upload File</Link>
                <Link to="/query/">Query</Link>
            </div>
        );
    }
}

export default App;
