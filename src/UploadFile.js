import React from 'react';
import axios from 'axios';
import { backendUrl } from './GlobalVariables';
import './UploadFile.css';

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
            <div className="upload-container">
                <form className="form-upload" onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Upload a Table</h1>
                    <input type="text" className="form-control" placeholder="Enter Table Name" 
                        value={this.state.tableName} onChange={this.handleChange} required autoFocus>
                    </input>
                    <br />
                    <div className="form-group">
                        <label htmlFor="data-files-input-id">Upload Data Files:</label>
                        <input type="file" className="form-control-file" id="data-files-input-id"
                        ref={this.fileInput} multiple />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="schema-file-input-id">Upload Schema File:</label>
                        <input type="file" className="form-control-file" id="schema-file-input-id"
                        ref={this.schemaFileInput} />
                    </div>
                    <br />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">
                        Create Table
                    </button>
                </form>
                <h2>{this.state.status}</h2>
            </div>
        );
    }
}

export default UploadFile;
