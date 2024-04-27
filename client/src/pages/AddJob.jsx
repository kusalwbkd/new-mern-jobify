import React from 'react'
import { Form, useNavigation, useOutletContext } from 'react-router-dom'
import styled from 'styled-components';
import { FormRow, FormSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action=async({request})=>{
  const formData=await request.formData()
  const data=Object.fromEntries(formData)
  try {
    await customFetch.post('/jobs',data)
    toast.success('Job added sucessfully!')
    return null
  } catch (error) {
    toast.error(error?.respose?.data?.msg)
    return error
    
  }
}


const AddJob = () => {



  const{user}=useOutletContext()
  const navigation=useNavigation()
  const isSubmitting=navigation.state==='submitting'
  return (
    <Wrapper>
   <Form method='post' className='form'>

<h4 className="form-title">Add Job</h4>
<div className="form-center">
  <FormRow type={'text'} name={'position'}/>
  <FormRow type={'text'} name={'company'}/>
  <FormRow type={'text'} name={'jobLocation'} labelText={'Job Location'}  defaultValue={user.location} />

<FormSelect labelText={'job status'} name={'jobStatus'} defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)}/>
<FormSelect labelText={'Joby type'} name={'jobType'} defaultValue={JOB_TYPE.FULL_TIME} list={Object.values(JOB_TYPE)}/>


  <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>{isSubmitting ?'submitting....':'submit'}</button>
</div>
   </Form>

    </Wrapper>
  )/*  */
}
const Wrapper = styled.section`

border-radius: var(--border-radius);
width: 100%;
background: var(--background-secondary-color);
padding: 3rem 2rem 4rem;
.form-title {
  margin-bottom: 2rem;
}
.form {
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  max-width: 100%;
  width: 100%;
}
.form-row {
  margin-bottom: 0;
}
.form-center {
  display: grid;
  row-gap: 1rem;
}
.form-btn {
  align-self: end;
  margin-top: 1rem;
  display: grid;
  place-items: center;
}
@media (min-width: 992px) {
  .form-center {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    column-gap: 1rem;
  }
}
@media (min-width: 1120px) {
  .form-center {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

`
export default AddJob