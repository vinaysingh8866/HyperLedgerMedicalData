import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL
// var isLoading = false;
export const fetchReadDoctor = (id) => {
    // if(!isLoading){
    //     isLoading = true;
        axios
            .post(backendUrl+"/read_doctor/id=" + id)
            .then((res) => {
                console.log(res);
                // isLoading = false;
                console.log(res);
                return res;
            })
            .catch((err) => {
                // isLoading = false;
                console.log(err);
                return [];
            });
        
    // }
}

export const fetchReadPatient = (id) => {
    // if(!isLoading){
    //     isLoading = true;
        axios
            .post(backendUrl+"/read_patient/id=" + id)
            .then((res) => {
                console.log(res);
                // isLoading = false;
                // console.log(res);
                return res;
            })
            .catch((err) => {
                // isLoading = false;
                console.log(err);
                return [];
            });
        
    // }
}