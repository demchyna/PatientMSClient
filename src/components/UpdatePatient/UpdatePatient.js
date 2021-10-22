import React from "react";
import './UpdatePatient.css';

class UpdatePatient extends React.Component {

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
            patient: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();

        this.patient.firstName = event.target[0].value;
        this.patient.lastName = event.target[1].value;
        this.patient.birthday = event.target[2].value;
        this.patient.gender = event.target[3].value;
        this.patient.country = event.target[4].value;
        this.patient.state = event.target[5].value;
        this.patient.address = event.target[6].value;
        this.patient.id = event.target[7].value;

        const data = JSON.stringify(this.patient);

        fetch("https://patient-webapi.herokuapp.com/patients/", {
            method: 'PUT',
            body: data,
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(
                (result) => {
                    this.props.history.push('/comment/patient/' + result.id);
                    window.location.reload();
                }
            );
    }

    render() {

        const { error, isLoaded, patient } = this.state;
        if (!error) {
            if (patient) {
                this.patient = patient;
            }
            return (
                <div id="update-container">
                    <div id="up-patient">
                        <span>{this.patient.firstName} {this.patient.lastName}</span>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="first-name">First Name:</label>
                        <input id="first-name" name="first-name" type="text" defaultValue={this.patient.firstName} required /><br/>

                        <label htmlFor="last-name">Last Name:</label>
                        <input id="last-name" name="last-name" type="text" defaultValue={this.patient.lastName} required /><br/>

                        <label htmlFor="birthdate">Date of Birth:</label>
                        <input id="birthdate" name="birthdate" type="date" defaultValue={this.patient.birthday} required /><br/>

                        <label htmlFor="gender">Sex:</label>
                        <select name="gender" id="gender" defaultValue={this.patient.gender}>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select><br/>

                        <label htmlFor="country">Country:</label>
                        <input id="country" name="country" type="text" defaultValue={this.patient.country} required  /><br/>

                        <label htmlFor="state">State:</label>
                        <input id="state" name="state" type="text" defaultValue={this.patient.state} required /><br/>

                        <label htmlFor="address">Address:</label>
                        <input id="address" name="address" type="text" defaultValue={this.patient.address} required /><br/>

                        <input name="id" type="hidden" value={this.patient.id}/>

                        <div id="up-toolbar">
                            <input type="submit" value="Update" />
                            <input type="reset" value="Clear"/>
                        </div>
                    </form>
                </div>
            );
        } else if (!isLoaded) {
            return <div>Loading Data...</div>;
        } else {
            return <div>Error: {error.message}</div>;
        }
    }
}

UpdatePatient.propTypes = {};

UpdatePatient.defaultProps = {};

export default UpdatePatient;