import axios from "./axios";

export default getRequest=(endUrl,onSuccess,onError)=>{
    axios.get(endUrl)
    .then((res)=>{
        let status = res.data.status
        if(status){
            onSuccess
        }
        else{
            onError
        }
    })
    .catch((err)=>console.log(err))
}