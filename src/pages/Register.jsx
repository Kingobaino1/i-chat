import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import * as routes from '../utils/APIRoutes';


const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

const toastOptions = {
  position: 'bottom-right',
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark'
}
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword){
      toast.error(
        'password and confirm password did not match',
        toastOptions
      )
      return false
    } else if (username.length < 3){
      toast.error(
        'Username must be more than 3 characters',
        toastOptions
      )
      return false
    } else if (email === ''){
      toast.error(
        'Emails is required',
        toastOptions
      )
      return false
    }
    if (password.length < 3){
      toast.error(
        'Password is too short',
        toastOptions
      )
      return false
    }
    return true;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(routes.RegisterRoute, {
        username,
        email,
        password,
      })
      if(data.status === false){
        toast.error(data.message, toastOptions)
      }
      if(data.status === true) {
        localStorage.setItem('i-chat-user', JSON.stringify(data.data));
        navigate('/');
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value, 
    }))
  };

  useEffect(() => {
    if(localStorage.getItem('i-chat-user')){
      navigate('/')
    }
  }, []);

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="Logo"/>
            <h1>i-Chat</h1>
          </div>
          <input type="text"
                 placeholder='Username'
                 name='username'
                 onChange={(e) => handleChange(e)}
          />
          <input type="email"
                 placeholder='Email'
                 name='email'
                 onChange={(e) => handleChange(e)}
          />
          <input type="password"
                 placeholder='Password'
                 name='password'
                 onChange={(e) => handleChange(e)}
          />
          <input type="password"
                 placeholder='Confirm Password'
                 name='confirmPassword'
                 onChange={(e) => handleChange(e)}
          />
          <button type='submit'>Create Account</button>
          <span>
            Already have an account? <Link to='/login'>Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .brand {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      border: .1rem solid #4e0eff;
      padding: 1rem;
      border-radius: .4rem;
      color: white;
      font-size: 1rem;
      width: 100%;
      &:focus {
        border: .1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      border-radius: .4rem;
      cursor: pointer;
      font-size: 1rem;
      text-transform: uppercase;
      transition: .5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
        
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`

export default Register;
