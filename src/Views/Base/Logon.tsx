import { useState } from "react";
import axios from "axios";
import {useLocation,useNavigate} from 'react-router-dom'
import { checkEmail,checkEmties } from "../../helper_funtions/FilterInputs";
import useAuth from "../../hooks/useAuth";
function Logon() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setAuth } = useAuth()
  const location = useLocation();
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/home'
  const LOGIN_URL:string = 'http://localhost:5002/api/user/login'
  interface user{
    email:string,
    password:string,
  }
  const getEmail =(e: React.ChangeEvent<HTMLInputElement>) =>{
    setError("")
    setEmail(checkEmail(e.target.value) ? e.target.value :'');
  }


  const getPassword =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setError("")
    setPassword(checkEmties(e.target.value) ? e.target.value :'');
  }
 const  handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
    if(!checkEmail(email)){
      setError("Email is required")
    }
    if(!checkEmties(password)){
      setError("Password is required")
    }
    if(!checkEmail(email) && !checkEmties(password)){
      setError("Email and Password are required")
    }
    else if(email.length !== 0 && password !== ""){
      const data:user = {
        email:email,
        password:password,
      }

      await axios.post(LOGIN_URL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
        .then((res: { status: number; data: any }) => {

          if (res.status === 200 && res.data.response==="User Logged In") {
           setAuth({
             user:{
               email:res.data.user.email,
               username:res.data.user.username,
               id:res.data.user.id,
               isAuthorized:res.data.user.isAuthorized
             }
            })
            navigate(from,{replace:true})
          }
        })
        .catch((err: any) => {
          console.log(err.headers);
          setError('Email or Password is incorrect');
        });

    }
  }
  return (
    <form>
    <div className="fs-5 mb-2">Login</div>
    <span className="text-danger">{error}</span>
     <div className="form-outline mb-2">
       <input required={true} onChange={(e)=>{getEmail(e)}} type="email" id="form3Example3" className="form-control mb-1" />
       <label className="form-label" htmlFor="form3Example3">Email address</label>
     </div>

     
     <div className="form-outline mb-2">
       <input required={true} onChange={(e)=>{getPassword(e)}} type="password" id="form3Example4" className="form-control" />
       <label className="form-label" htmlFor="form3Example4">Password</label>
     </div>
     
     <button 
     onClick={(e)=>{handleSubmit(e)}}
     type="submit" className="btn btn-primary btn-block mb-4">
       Login
     </button>
   </form>
  )
}

export default Logon