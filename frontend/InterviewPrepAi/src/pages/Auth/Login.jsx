import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import {validateEmail} from '../../utils/helper';

const Login = ({setCurrentPage}) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }

    if(!password){
      setError("Password is required");
      return;
    }

    setError("");
    // login logic
    try{
      
    }
    catch(err){
      if(err.response || err.response.data.message){
        setError(err.response.data.message);
      }
      else{
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
    <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
    <p className='text-xs text-slate-700 mt-[5px] mb-6'>
      Please enter your details to log in
    </p>

    <form onSubmit={handleLogin}>
      <Input value={email}
      onChange={({target})=>setEmail(target.value)}
      label="Email Address"
      placeholder="john@example.com"
      type="text"
      />
      <Input value={password}
      onChange={({target})=>setPassword(target.value)}
      label="Password"
      placeholder="Min 8 characters"
      type="password"
      />


      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

      <button className='btn-primary' type='submit'>
        Login
      </button>

      <p className='text-[13px] text-slate-800 mt-3'>
        Don't have an account?{" "} 
        <button className='font-medium text-primary underline cursor-pointer' onClick={()=>setCurrentPage("signup")}>Sign Up</button>
      </p>
    </form>
  </div>
}

export default Login