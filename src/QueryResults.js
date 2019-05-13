import React from 'react';

class QueryResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 1,
        }
        this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
    }
    componentDidMount() {
        this.interval = setInterval(this.handleStatusUpdate, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    handleStatusUpdate() {
        if(this.props.queryExecutionId === '') return (null);
        var st = this.state.status;
        this.setState({status: st+1});
    }
    render() {
        if(this.props.queryExecutionId === '') return (null);
        return(
            <div>
                <h1>Query Results</h1>
                <h1>{this.props.queryExecutionId}</h1>
                <h1>{this.state.status}</h1>
            </div>
        );
    }
}

export default QueryResults;
