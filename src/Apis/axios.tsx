import axios from "axios";
//import { removeCookie,destroyCookie } from '../helper_funtions/cookies'
//import { useNavigate } from 'react-router-dom'

axios.interceptors.response.use(async response=>{
   // const navigate = useNavigate()
    if (response.status===403){
        console.log('error in response interceptor')
    //  if(removeCookie('token')){
    //  await destroyCookie()?navigate('/login'):console.log('error in destroying cookie Forcefly')
    //  }
    
     }
     return response
 });
 
const Axios_instance = axios.create({
    baseURL:'http://localhost:5002',
    withCredentials: true,
    
})

export default Axios_instance;
