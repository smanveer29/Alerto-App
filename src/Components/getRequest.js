import axios from "./axios";
export default getRequest=(endUrl,onSuccess,onError,setLoading)=>
{
    axios.get(endUrl)
    .then((res)=>{
        const status = res.data.status
        if(status) onSuccess && onSuccess(res)
        else onError && onError(res.data.error)
    })
    .catch((err)=>console.log(err))
    .then(()=>setLoading && setLoading(false))
}