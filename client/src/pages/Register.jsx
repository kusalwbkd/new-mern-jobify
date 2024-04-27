import React from 'react'
import { Form, Link, redirect, useNavigation } from 'react-router-dom'
import { FormRow, Logo } from '../components'
import styled from 'styled-components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
export const action=async({request})=>{
  const formData=await request.formData()

  const data=Object.fromEntries(formData)
try {
  await customFetch.post('/auth/register',data)
  toast.success('Registration successful');
  return redirect('/login')
} catch (error) {
  console.log(error);
  toast.error(error?.response?.data?.msg);
  return error
}
 
}

const Register = () => {
  const navigation=useNavigation()

  const isSubmitting=navigation.state==='submitting'
  return (
    <Wrapper>
      <Form className="form" method='post'>
        <Logo/>
        <h4>Register</h4>
      <FormRow name={'name'} type={'text'}/>
     <FormRow name={'lastName'} type={'text'} labelText={'last name'}/>
     <FormRow name={'location'} type={'text'}/>
     <FormRow  name={'email'} type={'email'}/>
     <FormRow      name={'password'} type={'password'}/>
        <button type="submit" className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting?'Submitting...':'Submit'}
        </button>
        <p>
          Already a member?
          <Link to={'/login'} className='member-btn'>
            Login
          </Link>
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
export default Register