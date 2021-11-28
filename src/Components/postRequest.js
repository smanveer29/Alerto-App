import axios from './axios'
const postRequest=(endUrl,param,onSuccess,onError) => 
{
    axios.post(endUrl,param)
    .then((res)=>{
        const status = res.data.status
        if(status) onSuccess && onSuccess(res.data)
        else onError && onError(res.data)
    })
    .catch((err)=>console.log(err))
    // .then(()=>setLoading && setLoading(false))
}
export default postRequest