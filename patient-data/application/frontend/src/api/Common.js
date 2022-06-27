import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL

const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'JWT fefege...'
  }
// var isLoading = false;
export const fetchReadDoctor = (id) => {
    // if(!isLoading){
    //     isLoading = true;
        axios
            .post(
                // "http://localhost:8080"
                backendUrl
                +"/read_doctor?id=" + id,{},{headers:headers})
            .then((res) => {
                console.log(res.data);
                // isLoading = false;
                // console.log(res);
                return res.data;
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
            .post(backendUrl+"/read_patient?id=" + id,{},{headers:headers})
            .then((res) => {
                console.log(res.data);
                // isLoading = false;
                // console.log(res);
                return res.data;
            })
            .catch((err) => {
                // isLoading = false;
                console.log(err);
                return [];
            });
        
    // }
}