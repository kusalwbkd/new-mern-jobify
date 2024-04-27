import React from 'react'
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import styled from 'styled-components';
import { StatItem } from '../components';
export const loader=async()=>{
  try {
    const response = await customFetch.get('/users/admin/app-stats');
    return response.data;

  } catch (error) {
    toast.error('You are not authorized to view this page');
    return redirect('/dashboard');
  }
}
const Admin = () => {
  const {jobs,users}=useLoaderData()
 
  return (
    <Wrapper>
 <StatItem
        title='current users'
        count={users}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={jobs}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />


    </Wrapper>
  )
}
const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default Admin