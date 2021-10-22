import React from 'react';
import './PatientList.css';
import {Link} from "react-router-dom";

class PatientList extends React.Component {

    constructor(props) {
        super(props);

        this.patient = {
            id: 0,
            firstName: null,
            lastName: null,
            birthday: null,
            gender: null,
            country: null,
            state: null,
            address: null
        };

        this.state = {
            error: null,
            isLoaded: false,
            patients: [],
            searchValue: ''
        };

        this.handleNewPatient = this.handleNewPatient.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.number !== prevProps.match.params.number
            || this.state.isLoaded === false) {

            fetch("https://patient-webapi.herokuapp.com/patients/")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            patients: result
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
        fetch("https://patient-webapi.herokuapp.com/patients/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        patients: result
                    });
                    if (this.props.history.location.pathname === "/") {
                        this.props.history.push('/comment/patient/' + result[0].id);
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            );
    }

    onChangeHandler(event){
        this.setState({
            searchValue: event.target.value,
        });
    }

    render() {
        const { error, isLoaded, patients } = this.state;
        if (!error) {
            const patientsList = patients
                .filter(patient => this.state.searchValue === ''
                    || patient.firstName.includes(this.state.searchValue)
                    || patient.lastName.includes(this.state.searchValue))
                .map(patient => (
                    <li key={ patient.id }>
                        <Link to={`/comment/patient/${patient.id}`} >
                            <span>
                                { patient.firstName } { patient.lastName }
                            </span>
                            <span>
                                { new Date(patient.birthday).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <span>
                                <i className={`fa fa-${patient.gender.toLowerCase()} fa-2x`} aria-hidden="true" />
                            </span>
                        </Link>
                    </li>
                ));
            return (
                <div id="patient-list">
                    <div id="pl-toolbar">
                        <input type="search" value={this.state.searchValue} onChange={this.onChangeHandler.bind(this)}  placeholder="Search..." />
                        <button onClick={ this.handleNewPatient }>New Patient</button>
                    </div>
                    <ul id="pl-main">
                        { patientsList }
                    </ul>
                </div>
            );
        } else if (!isLoaded) {
            return <div>Loading Data...</div>;
        } else {
            return <div>Error: {error.message}</div>;
        }
    }

    handleNewPatient() {
        this.props.history.push('/patient/create');
    }
}

PatientList.propTypes = {};

PatientList.defaultProps = {};

export default PatientList;
