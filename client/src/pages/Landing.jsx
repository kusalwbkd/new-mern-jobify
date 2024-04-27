import React from 'react'
import styled from 'styled-components'
import main from '../assets/images/main.svg'

import { Link } from 'react-router-dom'
import { Logo } from '../components'


const Landing = () => {
  return (
    <Wrapper>
      <nav>
      <Logo/>
      </nav>

      <div className="container page">

        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam iste quos, repellendus reprehenderit at temporibus quidem placeat dolores quam omnis accusantium quo, praesentium cumque nam officiis mollitia iure quasi. A sequi ad voluptate ea, ut voluptatibus fuga ipsum, consequatur illo minima, similique deserunt pariatur dolorem maiores rem voluptates alias magnam.</p>
         <Link to={'/register'} className='btn register-link'>
            Register
         </Link>

         <Link to={'/login'} className='btn'>
            Login/Demo user
         </Link>
        </div>  

        <img src={main} alt="main" className='img main-img'/>
      </div>

    </Wrapper>
  )
}

const Wrapper = styled.section`
nav {
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  
}
.page {
  min-height: calc(100vh - var(--nav-height));
  display: grid;
  align-items: center;
  margin-top: 3rem;
}
h1 {
  font-weight: 700;
  span {
    color: var(--primary-500);
  }
  margin-bottom: 1.5rem;
}
p {
  line-height: 2;
  color: var(--text-secondary-color);
  margin-bottom: 1.5rem;
  max-width: 35em;
}
.register-link {
  margin-right: 1rem;
}
.main-img {
  display: none;
}
.btn {
  padding: 0.75rem 1rem;
}

@media (min-width: 992px) {
  .page {
    grid-template-columns: 1fr 400px;
    column-gap: 3rem;
  }
  .main-img {
    display: block;
  }
}
`
export default Landing