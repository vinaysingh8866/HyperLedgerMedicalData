import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL
// var isLoading = false;
export const fetchReadDoctor = (id) => {
    // if(!isLoading){
    //     isLoading = true;
        axios
            .get(backendUrl+"/read_doctor/" + id)
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