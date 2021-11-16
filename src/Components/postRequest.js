import axios from './axios'
const postRequest=(endUrl,param,onSuccess,onError) => 
{
    axios.post(endUrl,param)
    .then((res) =>{
        let status = res.data.status
        if(status)
        {
            onSuccess
        }
        else{
            onError
        }
    }).catch((err) =>console.log(err))
}
export default postRequest