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
        <div className='flex' style={divStyle}>
            <Nav />
            <Profile/>
            <SuggestedUsers/>
        </div>
      )
}

export default ProfilePage