import React, { useState } from 'react';


function Patient() {
    var generateKeys = function(){
        return (Date.now().toString(36) + Math.random().toString(36).substring(2));    
    }
    const handleFirstTimeSubmit = (event) =>{
        event.preventDefault();
        //TO-DO verify if the id matches name and dob and get public key from backend.
        alert('Patient id submitted ' + pid + 
        ' DOB : ' + pDob + ' Name: ' + pName + 
        ' keys generated: ' + generateKeys());
    };

    const handleIDChange = (event) =>{
        setPid(event.target.value);
    }

    const handlePnameChange = (event) =>{
        setPname(event.target.value);
    }

    const handlePasswordChange = (event) =>{
        setPassword(event.target.value);
    }

    const handleDOBChange = (event) =>{
        setDOB(event.target.value);
    }

    var [pid, setPid]  = useState('');
    var [pName, setPname]  = useState('');
    var [password, setPassword]  = useState('');
    var [pDob, setDOB]  = useState('');
    // var [dName, setDname]  = useState('');

    return (
        <>
            <p>First Time Login</p>
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
                <label>
                    DOB:
                    <input type="date" value={pDob} onChange={handleDOBChange} />
                </label>
                <div>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                </div>
                <div>
                <input type="submit" value="Submit" />
                </div>
            </form>
            <p>Allow Access</p>
            <p>Revoke Access</p>
            <p>Appointment Create</p>
        </>);
}

export default Patient;