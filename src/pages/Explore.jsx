import React from 'react'
import homebackground from "../assets/homebackground.jpg"
import Nav from '../components/Nav';
import Feed from '../components/Feed';
import SuggestedUsers from '../components/SuggestedUsers';

function Explore() {
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
            <Feed/>
            <SuggestedUsers/>
        </div>
      )
}

export default Explore