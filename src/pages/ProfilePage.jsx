import React from 'react'
import Nav from '../components/Nav'
import SuggestedUsers from '../components/SuggestedUsers'
import homebackground from "../assets/homebackground.jpg"
import Profile from '../components/Profile';

function ProfilePage() {
    const divStyle = {
        backgroundImage: `url(${homebackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment:"fixed",
        backgroundPosition: 'center',
        minHeight:'100vh'
    
      };
      return (
        <div className='flex flex-col-reverse md:flex-row' style={divStyle}>
            <Nav />
            <Profile className="justify-self-start"/>
            <SuggestedUsers/>
        </div>
      )
}

export default ProfilePage