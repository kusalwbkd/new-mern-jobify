import React from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom'
import { FormRow, FormSelect } from '../components'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'


export const loader=async({params})=>{
try {
  const{data}=await customFetch.get(`/jobs/${params.id}`)
  return data
} catch (error) {
  toast.error(error?.response?.data?.msg)
  return redirect('/dashboard/all-jobs')
}
}

export const action=async({request,params})=>{
  const formData=await request.formData()
  const data=Object.fromEntries(formData)

  try {
    await customFetch.patch(`/jobs/${params.id}`,data);
    toast.success('Job edited successfully');
    return redirect('/dashboard/all-jobs');
    
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
}
const EditJob = () => {
  const navigation=useNavigation()

  const isSubmitting=navigation.state=='submitting'
  const{job}=useLoaderData()
  console.log(job);
  return (
    <>
    <Form method='post' className='form'>
<h4 className="form-title">edit job</h4>

<div className="form-center">
<FormRow type={'text'} name={'position'} defaultValue={job.position}/>
  <FormRow type={'text'} name={'company'} defaultValue={job.company}/>
  <FormRow type={'text'} name={'jobLocation'} labelText={'Job Location'}  defaultValue={job.jobLocation} />

<FormSelect labelText={'job status'} name={'jobStatus'} defaultValue={job.jobStatus} list={Object.values(JOB_STATUS)}/>
<FormSelect labelText={'Job type'} name={'jobType'} defaultValue={job.jobType} list={Object.values(JOB_TYPE)}/>
<button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
</div>
    </Form>
    
    </>
  )
}

export default EditJob