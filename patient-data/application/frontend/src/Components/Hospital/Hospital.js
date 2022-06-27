
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
        <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Register Patient</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        component="form"
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        onSubmit={handlePatientSubmit}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="pName"
                                label="Name"
                                variant="standard"
                                value={pName}
                                onChange={handlePatientChange}
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                        </div>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Doctor's Registeration</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        component="form"
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        onSubmit={handleDoctorSubmit}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="dName"
                                label="Name"
                                variant="standard"
                                value={dName}
                                onChange={handleDoctorChange}
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                        </div>
                    </Box>
                </AccordionDetails>
            </Accordion>
            {/* <p>Register Patient</p>
            <form onSubmit={handlePatientSubmit}>
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
                </div>
                <input type="submit" value="Submit" />
            </form>
            <p>Register Doctor</p>
            <form onSubmit={handleDoctorSubmit}>
                <label>
                    Name:
                    <input type="text" value={dName} onChange={handleDoctorChange} />
                </label>
                <input type="submit" value="Submit" />
            </form> */}
        </>);
}

export default Hospital;