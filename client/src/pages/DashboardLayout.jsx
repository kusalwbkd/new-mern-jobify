import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';


export const loader=async()=>{
  try {
    const{data}=await customFetch('/users/current-user')
    return data
  } catch (error) {
    return redirect('/login')
  }
}

const DashboardContext=createContext()

const checkDefaultTheme=()=>{
  const isDarkTheme=localStorage.getItem('darkTheme')==='true'
  document.body.classList.toggle('dark-theme',isDarkTheme)
  return isDarkTheme
}

const DashboardLayout = () => {
  const {user}=useLoaderData()

const navigate=useNavigate()
const[showSidebar,setShowSidebar]=useState(false)
const[isDarkTheme,setIsDarkTheme]=useState(checkDefaultTheme())

const toggleDarkTheme=()=>{
  const newDarkTheme=!isDarkTheme
  setIsDarkTheme(newDarkTheme)
 document.body.classList.toggle('dark-theme',newDarkTheme)
 localStorage.setItem('darkTheme',newDarkTheme)
}

const toggleSidebar=()=>{
  setShowSidebar(!showSidebar)
}


const logoutUser=async()=>{
 
navigate('/')
await customFetch.get('/auth/logout')
toast.success('You logged out!')

}
  return (

    <DashboardContext.Provider value={{user,showSidebar,isDarkTheme,toggleDarkTheme,toggleSidebar,logoutUser}}>
  <Wrapper>

<main className="dashboard">
  <SmallSidebar/>
  <BigSidebar/>
  <div>
    <Navbar/>
    <div className="dashboard-page">
    <Outlet context={{user}}/>
    </div>
  </div>
</main>

</Wrapper>
    </DashboardContext.Provider>
  
  )


}


export const useDashboardContext=()=>useContext(DashboardContext)
const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
   
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
   
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;
export default DashboardLayout