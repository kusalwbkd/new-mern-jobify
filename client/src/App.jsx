import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AddJob, Admin, AllJobs, DashboardLayout, EditJob, Error, HomeLayout, Landing, Login, Profile, Register, Stats } from './pages';

//actions
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as addJobAction } from './pages/AddJob';
import { action as editJobAction } from './pages/EditJob';
import  { action as updateProfileAction } from './pages/Profile';
//loaders
import{loader as dashboardLoader} from './pages/DashboardLayout'
import{loader as allJobsLoader} from './pages/AllJobs'
import{loader as editJobLoader} from './pages/EditJob'
import{loader as adminLoader} from './pages/Admin'
import{loader as statsLoader} from './pages/Stats'
const router=createBrowserRouter([

  {
    path:'/',
    element:<HomeLayout/>,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Landing/>
      },
      {
        path:'register',
        element:<Register/>,
        action:registerAction
      },
      {
        path:'login',
        element:<Login/>,
        action:loginAction
      },
      {
        path:'dashboard',
        element:<DashboardLayout/>,
        loader:dashboardLoader,
        children:[
          {
            index:true,
            element:<AddJob/>,
            action:addJobAction,
          },
          {
            path:'stats',
            element:<Stats/>,
            loader:statsLoader,
          },
          {
            path:'all-jobs',
            element:<AllJobs/>,
            loader:allJobsLoader
          

          },{
            path:'profile',
            element:<Profile/>,
            action:updateProfileAction
          },
          {
            path:'admin',
            element:<Admin/>,
            loader:adminLoader
          },
          {
            path:'edit-job/:id',
            element:<EditJob/>,
            loader:editJobLoader,
            action:editJobAction
          },
         
            
         
        ]
      }
    ],
   

  },
  
  

])


const App = () => {
  return <RouterProvider router={router}/>
}

export default App