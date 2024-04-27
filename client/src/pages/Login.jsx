import React from 'react'
import { Form, Link, redirect, useNavigate, useNavigation } from 'react-router-dom'
import { FormRow, Logo } from '../components'
import styled from 'styled-components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action=async({request})=>{

  const formData=await request.formData()

  const data=Object.fromEntries(formData)

  try {
    await customFetch.post('/auth/login',data)
    toast.success('You are logged in!')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  return error
  }
}
const Login = () => {
  const navigation=useNavigation()
  const isSubmitting=navigation.state==='submitting'
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };
    try {
      await customFetch.post('/auth/login', data);
      toast.success('take a test drive');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form className="form" method='post'>
       <Logo/>

       <h4>login</h4>
       <FormRow type={'email'} name={'email'}/>
       <FormRow type={'password'} name={'password'}/>
       <button type="submit" className='btn btn-block' disabled={isSubmitting}>{isSubmitting?'submitting...':'Login'}</button>
       <button  className='btn btn-block ' onClick={()=>loginDemoUser()}>Explore the App</button>
       
       <p>
          Don't have an account?
          <Link to={'/register'} className='member-btn'>
            Register
          </Link>
        </p>
        <p>
    email = admin@admin.com,
  password = secret123
        </p>
      </Form>
    </Wrapper>
  )
}

const Wrapper=styled.section`

min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`

export default Login