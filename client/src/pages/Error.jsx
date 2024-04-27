import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import styled from 'styled-components';
const Error = () => {

 const error=useRouteError()

 if(error.status === 404){
 return (
  <Wrapper>
    <div>
    <img src={img} alt='error'/>
    <h3>ohh! page not found</h3>
    <p>we can't seem to find the page that you are looking for...</p>
    <Link to={'/dashboard'}>back home</Link>
    </div>
    
  </Wrapper>
 )
 }

  return (
    <Wrapper>
     <div>
      <h3>Something went wrong.......</h3>
     </div>
    </Wrapper>
  )
}

const Wrapper=styled.main`

min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  

  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: 3rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
  }
  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }
`

export default Error