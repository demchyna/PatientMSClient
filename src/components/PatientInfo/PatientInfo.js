import React from "react";
import './PatientInfo.css';
import CommentList from "../CommentList/CommentList";
import {Route} from "react-router-dom";


class PatientInfo extends React.Component {

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
            patient: null
        };

        this.handleEditPatient = this.handleEditPatient.bind(this);
        this.handleDeletePatient = this.handleDeletePatient.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.number !== prevProps.match.params.number ) {
            fetch("https://patient-webapi.herokuapp.com/patients/" + this.props.match.params.number)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            patient: result
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
        fetch("https://patient-webapi.herokuapp.com/patients/" + this.props.match.params.number)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        patient: result
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

    getYearsOld(birthday) {
        let ageDiffInMs = Date.now() - new Date(birthday);
        let ageDate = new Date(ageDiffInMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    render() {
        const { error, isLoaded, patient } = this.state;
        if (!error) {
            if (patient) {
                this.patient = patient;
            }
            return (
                <div id="patient-info">
                    <div id="pi-toolbar">
                        <span>{this.patient.firstName} {this.patient.lastName}</span>
                        <span>{this.getYearsOld(this.patient.birthday)} years old</span>
                        <div>
                            <button onClick={() => this.handleEditPatient(this.patient.id)}>Edit</button>
                            <button onClick={() => this.handleDeletePatient(this.patient.id)}>Delete</button>
                        </div>
                    </div>
                    <div id="pi-main">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Date of Birth:</td>
                                    <td>{ new Date(this.patient.birthday).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) }</td>
                                </tr>
                                <tr>
                                    <td>Sex:</td>
                                    <td>{ this.patient.gender }</td>
                                </tr>
                                <tr>
                                    <td>Country:</td>
                                    <td>{ this.patient.country }</td>
                                </tr>
                                <tr>
                                    <td>State:</td>
                                    <td>{ this.patient.state }</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>{ this.patient.address }</td>
                                </tr>
                            </tbody>
                        </table>
                        <Route exact path='/comment/patient/:number' component={ CommentList } />
                    </div>
                </div>
            );
        } else if (!isLoaded) {
            return <div>Loading Data...</div>;
        } else {
            return <div>Error: {error.message}</div>;
        }
    }

    handleEditPatient(patientId) {
        this.props.history.push('/patient/update/' + patientId);
    }

    handleDeletePatient(patientId) {
        fetch("https://patient-webapi.herokuapp.com/patients/" + patientId, {
            method: 'DELETE'
        }).then(response => {
            this.props.history.push('/');
            window.location.reload();
        });
    }
}

PatientInfo.propTypes = {};

PatientInfo.defaultProps = {};

export default PatientInfo;