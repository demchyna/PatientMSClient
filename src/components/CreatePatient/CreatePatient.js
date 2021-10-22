import React from "react";
import './CreatePatient.css';

class CreatePatient extends React.Component {

    constructor(props) {
        super(props);

        this.patient = {
            firstName: null,
            lastName: null,
            birthday: null,
            gender: null,
            country: null,
            state: null,
            address: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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

        const data = JSON.stringify(this.patient);

        fetch("https://patient-webapi.herokuapp.com/patients/", {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(
                (result) => {
                    this.props.history.push('/comment/patient/' + result.id);
                }
            );
    }

    render() {
        return (
            <div id="create-container">
                <div id="cp-patient">
                    <span>Unknown Patient </span>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="first-name">First Name:</label>
                    <input id="first-name" name="first-name" type="text" required /><br/>

                    <label htmlFor="last-name">Last Name:</label>
                    <input id="last-name" name="last-name" type="text" required /><br/>

                    <label htmlFor="birthdate">Date of Birth:</label>
                    <input id="birthdate" name="birthdate" type="date" required /><br/>

                    <label htmlFor="gender">Sex:</label>
                    <select name="gender" id="gender" defaultValue="MALE">
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select><br/>

                    <label htmlFor="country">Country:</label>
                    <input id="country" name="country" type="text" required /><br/>

                    <label htmlFor="state">State:</label>
                    <input id="state" name="state" type="text" required /><br/>

                    <label htmlFor="address">Address:</label>
                    <input id="address" name="address" type="text" required /><br/>

                    <div id="cp-toolbar">
                        <input type="submit" value="Save" />
                        <input type="reset" value="Clear"/>
                    </div>
                </form>
            </div>
        )
    }
}

CreatePatient.propTypes = {};

CreatePatient.defaultProps = {};

export default CreatePatient;