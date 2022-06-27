
import React, { useState } from 'react';

/**  @Property()
    public ID: string;

    @Property()
    public EyeColor: string;

    @Property()
    public Name: string;

    @Property()
    public BloodGroup: string;

    @Property()
    public InsulinData?: Insulin[];

    @Property()
    public docType?: string; 
    
    
    --doctor---

     @Property()
    public ID: string;

    @Property()
    public Speciality: string[];

    @Property()
    public Name: string;

    @Property()
    public Patients?: Patient[];

    @Property()
    public docType?: string;


    --insulin--

    interface InsulinData {
    id: string;
    date:string;
    data: object;
}

@Object()
export class Insulin {

    @Property()
    public ID: string;

    @Property()
    public data: InsulinData[];
    
    */

function Hospital() {

    var generateID = function () {
        return (Date.now().toString(36) + Math.random().toString(36).substring(2));
    }
    const handlePatientSubmit = (event) => {
        event.preventDefault();
        alert('Patient name submitted ' + pName + ' ID is : ' + generateID());
    };

    const handleDoctorSubmit = (event) => {
        event.preventDefault();
        alert('Doctor name submitted: ' + dName + ' ID is : ' + generateID());
    };

    const handlePatientChange = (event) => {
        setPname(event.target.value);
    }

    const handleDoctorChange = (event) => {
        setDname(event.target.value);
    }

    var [pName, setPname] = useState('');
    var [dName, setDname] = useState('');

    return (
        <>
            <p>Register Patient</p>
            <form onSubmit={handlePatientSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={pName} onChange={handlePatientChange} />
                    </label>
                </div>
                {/* <div>
                    <label>
                        Name:
                        <input type="text" value={pName} onChange={handlePatientChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Name:
                        <input type="text" value={pName} onChange={handlePatientChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Name:
                        <input type="text" value={pName} onChange={handlePatientChange} />
                    </label>
                </div> */}
                <input type="submit" value="Submit" />
            </form>
            <p>Register Doctor</p>
            <form onSubmit={handleDoctorSubmit}>
                <label>
                    Name:
                    <input type="text" value={dName} onChange={handleDoctorChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>);
}

export default Hospital;