import React, { useState } from 'react';

function Doctor() {

    var [dAppointmentlist, setAppointmentlist] = useState('');
    var [dPreferredappointment, setPreferredAppointment] = useState('');
    var [dAcceptAppointment, setAppointmentTime1] = useState('');
    var [dRejectAppointment, setAppointmentTime2] = useState('');
    // var generateKeys = function(){
    //     return (Date.now().toString(36) + Math.random().toString(36).substring(2));    
    // }
    const handleAppointmentConfirmationSubmit = (event) => {
        //setAppointment(event.target.value);
    }

    const handleAppointmentList = (event) => {
        setAppointmentlist(event.target.value);

    const handlePreferredAppointment = (event) => {
            setPreferredAppointment(event.target.value);
    }

    const handleAppointmentTime1 = (event) => {
        setAppointmentTime1(event.target.value);
}

    const handleAppointmentTime2 = (event) => {
        setAppointmentTime2(event.target.value);
}
    //     //TO-DO verify if the id matches name and dob and get public key from backend.
    //     alert('Patient id submitted ' + pid + ' keys generated: ' + generateKeys());
   // };

    // const handleIDChange = (event) =>{
    //     setPid(event.target.value);
    // }

    // const handlePnameChange = (event) =>{
    //     setPname(event.target.value);
    // }

    // const handlePasswordChange = (event) =>{
    //     setPassword(event.target.value);
    // }

    // var [pid, setPid]  = useState('');
    // var [pName, setPname]  = useState('');
    // var [password, setPassword]  = useState('');
    // // var [dName, setDname]  = useState('');

    return (
        <>
        <p>Get Patient</p>
        <p>Update Data</p>
        <p>Appointment Confirmation</p>
        <form onSubmit={handleAppointmentConfirmationSubmit}>
        <div>
            <label>
                Appointments:
                <select id="appointment-list" name="appointmentlist" value={dAppointmentlist} onChange={handleAppointmentList} />
            </label>
        </div>
        <div>
            <label>  
                Preferred Date and Time:
                <input type="datetime-local" value={dPreferredappointment} onChange={handlePreferredAppointment}></input>
            </label>
        </div>
        <div>
            <label>
                <input type="radio" id="appointmentConfirmation" name="btnaccept" value={dAcceptAppointment} onChange={handleAppointmentTime1}/>
                    <label for="appointmentConfirmation">Accept</label> 
                <input type="radio" id="appointmentConfirmation2" name="btnaccept2" value={dRejectAppointment} onChange={handleAppointmentTime2}/>
                    <label for="appointmentConfirmation2">Reject</label> 
            </label>
        </div>
        <div>
            <label>
            <input type="submit" value="Appointment Confirmation" />
            </label>
        </div>

    

        </form>
        <p>Search Patient</p>
            {/* <p>First Time Login</p>
            <form onSubmit={handleFirstTimeSubmit}>
                <div>
                <label>
                    Id:
                    <input type="text" value={pid} onChange={handleIDChange} />
                </label>
                </div>
                <div>
                <label>
                    Name:
                    <input type="text" value={pName} onChange={handlePnameChange} />
                </label>
                </div>
                <div>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                </div>
                <div>
                <input type="submit" value="Submit" />
                </div>
            </form> */}
        </>);
};


export default Doctor;