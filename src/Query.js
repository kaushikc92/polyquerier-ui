import React from 'react';
import axios from 'axios';
import { backendUrl } from './GlobalVariables';
import QueryResults from './QueryResults';

class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            queryExecutionId: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        data.append('query', this.state.query);
        const request = axios({
            method: 'POST',
            url: `${backendUrl}run-query/`,
            data: data
        });
        request.then(
            response => {
                this.setState({queryExecutionId: response.data.queryExecutionId});
            },
        );
    }
    handleChange(event) {
        this.setState({query: event.target.value});
    }
    render() {
        return(
            <div>
                <h1>Query Component</h1>
                <form onSubmit={this.handleSubmit} >
                    <input type="text" placeholder="Enter SQL Query" value={this.state.query} onChange={this.handleChange} />
                    <button type="submit">Submit</button>
                </form>
                <QueryResults queryExecutionId={this.state.queryExecutionId} />
            </div>
        );
    }
}

export default Query;
