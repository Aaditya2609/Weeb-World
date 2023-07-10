import React from 'react'
import Nav from '../components/Nav'
import ShowUsers from '../components/ShowUsers'
import homebackground from "../assets/homebackground.jpg"

function Users() {
    const divStyle = {
        backgroundImage: `url(${homebackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment:"fixed",
        backgroundPosition: 'center',
        height:"100%",
        margin:"0"
    
      };
  return (
    <div className='flex flex-col-reverse md:flex-row' style={divStyle}>
    <Nav />
    <ShowUsers/>
    </div>
  )
}

export default Users