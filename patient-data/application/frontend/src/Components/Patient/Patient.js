import React, { useState } from 'react';
// import {RSA, RSAKeychain} from 'react-native-rsa-native'
import { generateRSAKey, publicKeyString } from 'cryptico';




// The length of the RSA key, in bits.



function Patient() {

    var [pid, setPid] = useState('');
    var [pName, setPname] = useState('');
    var [password, setPassword] = useState('');
    var [pDob, setDOB] = useState('');
    var [pDoctor, setDoctor] = useState('');
    var [pAppointment, setAppointmentdate] = useState('');
    // var [dName, setDname]  = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    var generateKeys = function () {
        // return (Date.now().toString(36) + Math.random().toString(36).substring(2));    
        // RSA.generateKeys(4096).then(keys => {

        // })
        // return pubkey;
        // RSAKeychain.generate(password).then(keys => {
        //     console.log(keys);
        // })
        //return PublicKeyString;

    }
    const handleFirstTimeSubmit = (event) => {
        event.preventDefault();
        const Bits = 1024;
        if (password.length >= 0) {
            const RSAkey = generateRSAKey(password, Bits);

            const PublicKeyString = publicKeyString(RSAkey);

            alert('Patient id submitted ' + pid +
                ' DOB : ' + pDob + ' Name: ' + pName +
                ' keys generated: ' + PublicKeyString);
        }

    };

    const handleIDChange = (event) => {
        setPid(event.target.value);
    }

    const handlePnameChange = (event) => {
        setPname(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleDOBChange = (event) => {
        setDOB(event.target.value);
    }
    const handleAppointmentSubmit = (event) => {
        //setAppointment(event.target.value);
    }

    const handleDoctorChange = (event) => {
        setDoctor(event.target.value);
    }

    const getCurrentUser = async function () {
        // const currentUser = await Parse.User.current();
        // // Update state variable holding current user
        // setCurrentUser(currentUser);
        // return currentUser;
    };

    const handleAppointmentDate = (event) => {
        setAppointmentdate(event.target.value);
    }





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
            <form onSubmit={handleAppointmentSubmit}>
                <div>
                    <label>
                        Current User:
                        <input type="text" value={currentUser} onChange={getCurrentUser} />
                    </label>
                    <div>
                        <label>
                            Doctor:
                            <select id="doctor-list" name="doctorlist" value={pDoctor} onChange={handleDoctorChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Preferred Date and Time:
                            <input type="datetime-local" value={pAppointment} onChange={handleAppointmentDate}></input>
                        </label>
                    </div>
                    <div>
                        <input type="submit" value="Appointment Request" />
                    </div>

                </div>
            </form>
        </>);
}

export default Patient;