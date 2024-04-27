import React, { createContext, useContext } from 'react'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { JobsContainer, SearchContainer } from '../components'


export const loader=async({request})=>{
  console.log('hey there');
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const { data } = await customFetch.get('/jobs', {
      params,
    });

    return {
      data,
      searchValues: { ...params },
    };
  } catch (error) {
     toast.error(error?.response?.data?.msg);
    return error;
  }
}

const AllJobsContext=createContext()
const AllJobs = () => {
  const{data,searchValues}=useLoaderData()


  return (
    <AllJobsContext.Provider  value={{ data,searchValues}}>
    <SearchContainer/>
    <JobsContainer/>
    
    </AllJobsContext.Provider>
  )
}


export const useAllJobsContext=()=>useContext(AllJobsContext)

export default AllJobs