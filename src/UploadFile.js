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
        this.handleChange = this.handleChange.bind(this);
        this.fileInput = React.createRef();
        this.schemaFileInput = React.createRef();
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        var files = this.fileInput.current.files;
        for(var i = 0; i < files.length; i++) {
            data.append('files[]', files[i]);
        }
        data.append('schema_file', this.schemaFileInput.current.files[0]);
        data.append('table_name', this.state.tableName);
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
    handleChange(event) {
        this.setState({tableName: event.target.value});
    }
    render() {
        return(
            <div>
                <h1>Upload File Component</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Enter Table Name" value={this.state.tableName} onChange={this.handleChange} />
                    <br />
                    <label>
                        Upload Files:
                        <input type="file" ref={this.fileInput} multiple />
                    </label>
                    <br />
                    <label>
                        Upload Schema File:
                        <input type="file" ref={this.schemaFileInput} />
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
