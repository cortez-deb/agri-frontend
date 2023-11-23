import {useLocation,Navigate,Outlet} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import axios from '../../Apis/axios';
import { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom'
import { getCookie } from '../../helper_funtions/cookies';
import { GlobalAuthenticator } from '../../context/AuthProvider';


const RequireAuth =(Auth:GlobalAuthenticator)=>{

  const { setAuth } = useAuth()
  const [gotUser, setGotUser] = useState<boolean>()
  const navigate = useNavigate()
  const location= useLocation();
  const GET_CURRENT_USER='/api/user/get/user'
  const to = location.state?.to?.pathname
console.log(Auth?.Auth)
  useEffect(  ()=>{

    const token = getCookie('Token');
    if(token){ 
    setAuth(
     { user:{
        username: JSON.parse(token).username,
        email: JSON.parse(token).email,
        id:JSON.parse(token).id,
        isAuthorized:JSON.parse(token).isAuthorized
      }}
      )
  
    }
    if(token===undefined){
       
            try{
              console.log('getting user')
             axios.get(GET_CURRENT_USER)
             .then((responce)=>{
              if(responce.status===200){
                console.log('error in getting user')
              }
              if(responce?.data?.user){
                console.log(responce?.data?.user)
                setAuth(()=>{
                  return({
                   user:{
                      username:  responce?.data?.user.username,
                      email:  responce?.data?.user.email,
                      id: responce?.data?.user.id,
                      isAuthorized: responce?.data?.user.isAuthorized
                    }
                  })
                })
               if(responce?.data?.user){   
                console.log('got user')  
                setGotUser(true)
               
              }else{    
                setGotUser(false)
              }
            }
            else if(responce?.data?.isAuthorized===false){
              setGotUser(false)
            }
        
             }).catch(err=>{
              if(err?.request.message==="Request aborted"){
               navigate('/auth/login')
              }
             if(err.status===400){
              navigate('/auth/login')
             }
              setGotUser(false)
             })
             
          }catch(err){
            setGotUser(false)
            console.log(err)
              navigate('/auth/login',{replace:true})
            }
           
          
    }    
  },[to,navigate,setAuth])


    return(
        Auth?
        (<Outlet/>)
        :
        gotUser? (<Navigate to={to} state={{from:location}} replace/>) 
        :(<Navigate to='/login' state={{from:location}} replace/>)
    )
}
export default RequireAuth