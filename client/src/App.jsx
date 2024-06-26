import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AddJob, Admin, AllJobs, DashboardLayout, EditJob, Error, HomeLayout, Landing, Login, Profile, Register, Stats } from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
import ErrorElement from './components/ErrorElement';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
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
        action:loginAction(queryClient)
      },
      {
        path:'dashboard',
        element:<DashboardLayout
        queryClient={queryClient}
        />,
       
        loader:dashboardLoader(queryClient),
        children:[
          {
            index:true,
            element:<AddJob/>,
            action:addJobAction,
            errorElement:<ErrorElement/>
          },
          {
            path:'stats',
            element:<Stats/>,
            loader:statsLoader(queryClient),
            errorElement:<ErrorElement/>
          },
          {
            path:'all-jobs',
            element:<AllJobs/>,
            loader:allJobsLoader,
            errorElement:<ErrorElement/>
          

          },{
            path:'profile',
            element:<Profile/>,
            action:updateProfileAction(queryClient),
            errorElement:<ErrorElement/>
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      
    </QueryClientProvider>
  );
}

export default App