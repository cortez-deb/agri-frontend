import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { checkEmail,checkEmties,checkPassword,checkConfirmPassword} from '../../helper_funtions/FilterInputs';
import { useState } from 'react';
import axios from '../../Apis/axios';

function SignUp() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const REGISTER_URL:string = '/api/user/register'
interface user{
  email:string,
  password:string,
  username:string
}
  function getEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setError("")
    setEmail(checkEmail(e.target.value) ? e.target.value :'');
  }

  function getPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setError("")
    setPassword(checkPassword(e.target.value) ? e.target.value :'');
  }

  function getConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setError("")
    setConfirmPassword(checkPassword(e.target.value) ? e.target.value :'');
  }

  async function handleSubmit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault();
      if(!checkEmties(email)){
        setError("Email is required")
      }
      if(!checkEmties(password)){
        setError("Password is required at least 8 characters")
      }
      if(!checkEmties(confirmPassword)){
        setError("Confirm Password is required and least 8 characters")
      }
      if(!checkConfirmPassword(password,confirmPassword)){
        setError("Password and Confirm Password must be same")
      }
      if(!checkEmties(email) && !checkEmties(password) && !checkEmties(confirmPassword)){
        setError("Email, Password and Confirm Password are required")
      }
      else if(email.length !== 0 && password !== "" && password === confirmPassword){
        const userName = email.split('@')[0]
        const data:user = {
          email:email,
          password:password,
          username:userName
        }
       console.log(data)
     await axios.post(REGISTER_URL,
      data,
      {
        headers:{'Content-Type':'application/json'},
        withCredentials: true,
    }
    ).then((responce)=>{
        if(responce.data.response==="User Already Exists"){
          setError("User Already Exists")
          setSuccess("")
        }
        if(responce.data.response==="User Created"){
          setSuccess("Account Created Successfully proceed to login")
          setError("")
        }
      }
      ).catch((err)=>{
        console.log(err)
      })
      }
  
      
     
  }
  return (
    <form>
      <div className="fs-5 mb-2">Sign Up</div>
      {error && <div className='text-danger'>{error}</div>}
      {success && <div className='text-success'>{success}</div>}
      <div className="form-outline mb-2">
        <input
          type="email"
          id="form3Example3"
          className="form-control mb-1"
          onChange={(e) => { getEmail(e) }}
        />
        <label className="form-label" htmlFor="form3Example3">Email address</label>
      </div>
      <div className="form-outline mb-2">
        <input
          type="password"
          id="form3Example4"
          onChange={(e) => { getPassword(e) }}
          className="form-control" />
        <label className="form-label" htmlFor="form3Example4">Password</label>
      </div>

      <div className="form-outline mb-2">
        <input
          type="password"
          id="form3Example4"
          onChange={(e) => { getConfirmPassword(e) }}
          className="form-control" />
        <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
      </div>
      <button
       type="submit"
       onClick={(e)=>{handleSubmit(e)}}
        className="btn btn-primary btn-block mb-4" >
        Submit
      </button>


      <div className="text-center">
        <p>or sign up with</p>
        <button type="button" className="btn btn-link btn-floating mx-1">
          <span>
            <FacebookIcon />
          </span>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <span><GoogleIcon /></span>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <span><TwitterIcon /></span>
        </button>

        <button type="button" className="btn btn-link btn-floating mx-1">
          <span><GitHubIcon /></span>
        </button>
      </div>
    </form>
  )
}

export default SignUp