import React from 'react';
import axios from 'axios';
import { backendUrl } from './GlobalVariables';

class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        var files = this.fileInput.current.files;
        for(var i = 0; i < files.length; i++) {
            data.append('files[]', files[i]);
        }
        const request = axios({
            method: 'POST',
            url: `${backendUrl}upload/`,
            data: data
        });
        request.then(
            response => {
                this.setState({
                    status: 'Uploaded File',
                });
            },
        );
    }
    render() {
        return(
            <div>
                <h1>Upload File Component</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Upload file:
                        <input type="file" ref={this.fileInput} multiple />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
                <h2>{this.state.status}</h2>
            </div>
        );
    }
}

export default UploadFile;
