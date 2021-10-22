import React from 'react';
import './CommentList.css';

class CommentList extends React.Component {

    constructor(props) {
        super(props);

        this.comment = {
            id: 0,
            text: null,
            createdAt: null,
            patientId: 0
        };

        this.state = {
            error: null,
            isLoaded: false,
            comments: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();

        const comment = {
            text: event.target[0].value,
            createdAt: event.target[2].value,
            patientId: event.target[3].value
        }

        const data = JSON.stringify(comment);

        fetch("https://patient-webapi.herokuapp.com/comments/", {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(
                (result) => {
                    this.props.history.push('/comment/patient/' + result.patient.id);
                    this.setState({
                        isLoaded: false
                    })
                }
            );
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.number !== prevProps.match.params.number
            || this.state.isLoaded === false) {
            fetch("https://patient-webapi.herokuapp.com/comments/patients/" + this.props.match.params.number)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            comments: result
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error: error
                        });
                    }
                );
        }
    }

    componentDidMount() {
        fetch("https://patient-webapi.herokuapp.com/comments/patients/" + this.props.match.params.number)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        comments: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            );
    }

    render() {
        const { error, isLoaded, comments } = this.state;
        if (!error) {
            return (
                <div id="comment-list">
                    <h3>Comments:</h3>
                    <ul>
                        {
                            comments.map(comment => {
                                this.comment = comment;
                                return (
                                    <li key={ this.comment.id } >
                                        <time>{ new Date(this.comment.createdAt).toLocaleDateString("en-US", {hour12: false, year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</time>
                                        <p>{ this.comment.text }</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div id="comment-toolbar">
                        <form onSubmit={this.handleSubmit}>
                            <textarea name="text" wrap="soft" />
                            <button>
                                <i className="fa fa-plus fa-2x" aria-hidden="true" />
                            </button>
                            <input name="createdAt" type="hidden" value={new Date().toISOString()} />
                            <input name="patientId" type="hidden" value={this.props.match.params.number} />
                        </form>
                    </div>
                </div>

            );
        } else if (!isLoaded) {
            return <div>Loading Data...</div>;
        } else {
            return <div>Error: {error.message}</div>;
        }
    }
}

CommentList.propTypes = {};

CommentList.defaultProps = {};

export default CommentList;
